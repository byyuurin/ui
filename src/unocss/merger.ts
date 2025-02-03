import type { CRRule } from '@byyuurin/ui-kit'
import type { CSSObject } from '@unocss/core'
import { mergeDeep, toArray } from '@unocss/core'
import type { Theme } from '@unocss/preset-mini'
import { theme as miniTheme } from '@unocss/preset-mini'
import { directionMap, directionSize, globalKeywords, h, isCSSMathFn, parseColor, resolveBreakpoints, splitShorthand } from '@unocss/preset-mini/utils'
import { cssVarsAll, cssVarsPrefix } from './constants'
import { theme as uiTheme } from './theme'

export function createMergeRules(): CRRule[] {
  const theme = mergeDeep(miniTheme, uiTheme)

  const directionSpacing = (type: 'padding' | 'margin', direction = '', size = '') => {
    if (directionSize(type)(['', direction, size], { theme } as any))
      return directionMap[direction]?.map((v) => `${type}${v}`).join(',')

    return null
  }

  return [
    // _rules/align
    [
      /^(?:vertical|align|v)-([-\w]+%?)$/,
      () => 'vertical-align',
    ],
    [
      /^(?:text-align|text)-(.+)$/,
      ([value]) => ['center', 'left', 'right', 'justify', 'start', 'end'].includes(value) ? 'text-align' : null,
    ],
    // _rules/behaviors
    [
      /^outline-(?:width-|size-)?(.+)$/,
      ([value]) => {
        if (theme.lineWidth && value in theme.lineWidth)
          return 'outline-width'

        if (h.bracket.cssvar.global.px(value))
          return 'outline-width'

        return null
      },
    ],
    [
      /^outline-(?:color-)?(.+)$/,
      ([value]) => {
        if (isCSSMathFn(h.bracket(value)))
          return null

        const parsed = parseColor(value, theme)

        return parsed?.color ? 'outline-color' : null
      },
    ],
    [
      /^outline-offset-(.+)$/,
      ([value]) => {
        if (theme.lineWidth && value in theme.lineWidth)
          return 'outline-offset'

        if (h.bracket.cssvar.global.px(value))
          return 'outline-offset'

        return null
      },
    ],
    [
      /^outline(?:-(.+))$/,
      ([value]) => {
        if (!value)
          return 'outline-style'

        if (['auto', 'dashed', 'dotted', 'double', 'hidden', 'solid', 'groove', 'ridge', 'inset', 'outset', ...globalKeywords].includes(value))
          return 'outline-style'

        if (value === 'none')
          return 'outline,outline-offset'

        return null
      },
    ],
    // _rules/border
    [/^(?:border|b)(?:-(.+))?$/, ([value]) => {
      if (!value)
        return 'border-width'

      const borderStyles = new Set(['solid', 'dashed', 'dotted', 'double', 'hidden', 'none', 'groove', 'ridge', 'inset', 'outset', ...globalKeywords])

      if (borderStyles.has(value))
        return 'border-style'

      const matched = value && value.match(/^([xyrltbse]|block|inline|[bi][se])?(?:-(.+))?$/)

      if (matched) {
        const [_, d = '', value = '1'] = matched
        const parsed = parseColor(value, theme)
        const size = !!((theme.lineWidth && value in theme.lineWidth) || h.bracket.cssvar.global.px(value))
        const base = directionMap[d]?.map((v) => `border${v}`) ?? null

        if (!base)
          return `null`

        if (borderStyles.has(value))
          return base.map((v) => `${v}-style`).join(',')

        if (size)
          return base.map((v) => `${v}-width`).join(',')

        if (parsed?.color)
          return base.map((v) => `${v}-color`).join(',')
      }

      return null
    }],
    [/^(?:border-|b-)?(?:rounded|rd)(.+)$/, ([type]) => {
      let result = 'border-radius'

      ;[
        /^([xyrltbse]|block|inline|[bi][se])(?:-(.+))?$/,
      ].some((r) => {
        const matched = type.match(r)

        if (matched) {
          result = `border-radius-${matched[1]}`
          return true
        }

        return false
      })

      return result
    }],
    // _rules/color
    [/^op(?:acity)?-?(.+)$/, () => `opacity`],
    [/^bg-(.+)$/, ([type]) => {
      if (/^\[url\(.+\)\]$/.test(type))
        return 'image'

      if (/^\[image:.+\]$/.test(type))
        return 'image'

      if (/^\[(?:linear|conic|radial)-gradient\(.+\)\]$/.test(type))
        return 'image'

      if (/^\[(?:length|size):.+\]$/.test(type))
        return 'size'

      if (/^\[position:.+\]$/.test(type))
        return 'position'

      if (/^op(?:acity)?-?(.+)$/.test(type))
        return 'opacity'

      const parsed = parseColor(type, theme)

      return parsed?.color ? 'background-color' : null
    }],
    // _rules/container
    [/^@container(?:\/(\w+))?(?:-(normal))?$/, () => 'container'],
    // _rules/decoration
    // _rules/default
    // _rules/flex
    // _rules/gap
    [
      /^(?:flex-|grid-)?(?:gap-?()|gap-([xy]-?|col-?|row-?))(.+)$/,
      ([direction]) => {
        if (direction === 'y' || direction === 'row')
          return 'row-gap'

        if (direction === 'x' || direction === 'col')
          return 'column-gap'

        return 'gap'
      },
    ],
    // _rules/grid
    // _rules/layout
    // _rules/position
    [/^(?:position-|pos-)?(relative|absolute|fixed|sticky)$/, () => 'position'],
    [/^(?:position-|pos-)([-\w]+)$/, ([value]) => globalKeywords.includes(value) ? 'position' : null],
    [/^(?:position-|pos-)?(static)$/, () => 'position'],
    // _rules/question-mark
    // _rules/ring
    // _rules/shadow
    // _rules/size
    [
      /^size-(min-|max-)?(.+)$/,
      ([m, s]) => {
        return getSizeValue(m, 'w', theme, s)
          ? [getSizePropName(m, 'w'), getSizePropName(m, 'h')].join(',')
          : null
      },
    ],
    [
      /^(?:size-)?(min-|max-)?([wh])-?(.+)$/,
      ([m, w, s]) => {
        return getSizeValue(m, w, theme, s)
          ? getSizePropName(m, w)
          : null
      },
    ],
    [
      /^(?:size-)?(min-|max-)?(block|inline)-(.+)$/,
      ([m, w, s]) => {
        return getSizeValue(m, w, theme, s)
          ? getSizePropName(m, w)
          : null
      },
    ],
    [
      /^(?:size-)?(min-|max-)?(h)-screen-(.+)$/,
      ([m, h, p]) => getSizeBreakpointValue(theme, p, 'verticalBreakpoints') ? getSizePropName(m, h) : null,
    ],
    [
      /^(?:size-)?(min-|max-)?(w)-screen-(.+)$/,
      ([m, w, p]) => getSizeBreakpointValue(theme, p) ? getSizePropName(m, w) : null,
    ],
    [
      /^(?:size-)?aspect-(?:ratio-)?(?:\d+\/\d+|square|video)$/,
      () => 'aspect-ratio',
    ],
    // _rules/spacing
    [
      /^p-?([xyrltbse])?(?:-?(.+))?$/,
      ([direction, size]) => directionSpacing('padding', direction, size),
    ],
    [
      /^p-(block|inline)(?:-(.+))?$/,
      ([direction, size]) => directionSpacing('padding', direction, size),
    ],
    [
      /^p-?([bi][se])(?:-?(.+))?$/,
      ([direction, size]) => directionSpacing('padding', direction, size),
    ],
    [
      /^m-?([xyrltbse])?(?:-?(.+))?$/,
      ([direction, size]) => directionSpacing('margin', direction, size),
    ],
    [
      /^m-(block|inline)(?:-(.+))?$/,
      ([direction, size]) => directionSpacing('margin', direction, size),
    ],
    [
      /^m-?([bi][se])(?:-?(.+))?$/,
      ([direction, size]) => directionSpacing('margin', direction, size),
    ],
    // _rules/static
    [
      /^(?:display-(.+)|inline|block|inline-block|contents|flow-root|list-item|hidden)$/,
      ([value]) => {
        if (!value || globalKeywords.includes(value))
          return 'display'

        return null
      },
    ],
    [
      /^(?:visible|invisible|backface-(.+))$/,
      ([value]) => value ? 'backface-visibility' : 'visibility',
    ],
    [/^content-(.+)$/, () => 'content'],
    // _rules/svg
    // _rules/transform
    [
      /^(?:transform-)?(origin|perspect(?:ive)?(?:-origin)?|(?:translate|rotate|skew|scale)(?:-[xyz])?)-(.+)$/,
      ([type]) => type,
    ],
    [
      /^(?:transform-)?preserve-(?:3d|flat)$/,
      () => 'transform-style',
    ],
    [
      /^(?:transform)(?:-(.+))?$/,
      ([value]) => {
        if (!value || value === 'none' || globalKeywords.includes(value))
          return 'transform'

        return null
      },
    ],
    // _rules/transition
    [
      /^(?:transition-)?(?:(duration|delay|ease|property)-)(.+)$/,
      ([value]) => {
        const mapping: Record<string, string | null> = {
          duration: 'transition-duration',
          delay: 'transition-delay',
          ease: 'transition-timing-function',
          property: 'transition-property',
        }
        return mapping[value]
      },
    ],
    [
      /^transition(?:-(.+))$/,
      ([value]) => {
        if (!value)
          return 'transition-property,transition-timing-function,transition-duration'

        if (value === 'none' || globalKeywords.includes(value))
          return 'transition'

        if (/^discrete|normal$/.test(value))
          return 'transition-behavior'

        return null
      },
    ],
    // _rules/typography
    [
      /^text-(.+)$/,
      ([s = 'base']) => {
        const returnValue = 'font-size'
        const split = splitShorthand(s, 'length')

        if (!split)
          return null

        const [size] = split
        const sizePairs = toArray(theme.fontSize?.[size]) as [string, string | CSSObject, string?]

        if (sizePairs?.[0])
          return returnValue

        const fontSize = h.bracketOfLength.rem(size)

        if (fontSize)
          return returnValue

        return h.bracketOfLength.rem(s) ? returnValue : null
      },
    ],
    [
      /^(?:text|font)-size-(.+)$/,
      ([s]) => {
        const themed = toArray(theme.fontSize?.[s]) as [string, string | CSSObject]
        const size = themed?.[0] ?? h.bracket.cssvar.global.rem(s)
        return size == null ? null : 'font-size'
      },
    ],
    [
      /^text-(?:color-)?(.+)$/,
      ([colorOrSize]) => {
        if (isCSSMathFn(h.bracket(colorOrSize)))
          return 'font-size'

        const parsed = parseColor(colorOrSize, theme)
        return parsed?.color ? 'color' : null
      },
    ],
    [
      /^(?:color|c)-(.+)$/,
      ([color]) => {
        const parsed = parseColor(color, theme)
        return parsed?.color ? 'color' : null
      },
    ],
    // _rules/variables
    [
      /^\[(.*)\]$/,
      ([body]) => {
        if (!body.includes(':'))
          return null

        return body.split(':')[0]
      },
    ],
    // others
    [
      new RegExp(`^${cssVarsPrefix}-((?:${cssVarsAll.join('|')})-)?(.+)$`),
      ([prop, color]) => {
        const parsed = parseColor(color, theme)

        if (!parsed?.color)
          return null

        return prop ? `--ui-${prop}` : '--ui-fill,--ui-content'
      },
    ],
  ]
}

function getSizePropName(minmax: string, hw: string) {
  const sizeMapping: Record<string, string> = {
    h: 'height',
    w: 'width',
    inline: 'inline-size',
    block: 'block-size',
  }
  return `${minmax || ''}${sizeMapping[hw]}`
}

type SizeProps = 'width' | 'height' | 'maxWidth' | 'maxHeight' | 'minWidth' | 'minHeight' | 'inlineSize' | 'blockSize' | 'maxInlineSize' | 'maxBlockSize' | 'minInlineSize' | 'minBlockSize'

function getSizeValue(minmax: string, hw: string, theme: Theme, prop: string) {
  const str = getSizePropName(minmax, hw).replace(/-(\w)/g, (_, p) => p.toUpperCase()) as SizeProps
  const v = theme[str]?.[prop]

  if (v != null)
    return v

  switch (prop) {
    case 'fit':
    case 'max':
    case 'min':
      return `${prop}-content`
  }

  return h.bracket.cssvar.global.auto.fraction.rem(prop)
}

function getSizeBreakpointValue(theme: Theme, point: string, key: 'breakpoints' | 'verticalBreakpoints' = 'breakpoints') {
  const bp = resolveBreakpoints({ theme } as any, key)

  if (bp)
    return bp.find((i) => i.point === point)?.size
}
