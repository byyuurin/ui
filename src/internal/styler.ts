import type { ClassValue, CRRule, CVCompoundVariants, CVMeta, CVSlots, CVVariants } from '@byyuurin/ui-kit'
import { cv } from '@byyuurin/ui-kit'
import type { CSSObject } from '@unocss/core'
import { mergeConfigs, toArray } from '@unocss/core'
import { h, isCSSMathFn, parseColor, splitShorthand } from '@unocss/preset-mini/utils'
import { presetUno } from '@unocss/preset-uno'
import type { Styler } from '../types'
import presetUI, { cssVarsAll, cssVarsPrefix } from '../unocss-preset'

const theme = mergeConfigs([
  presetUno(),
  presetUI(),
]).theme!

export function createMergeRules(): CRRule[] {
  const GlobalKeywordsRE = /^inherit|initial|revert|revert-layer|unset$/
  return [
    // _rules/align
    [/^(?:vertical|align|v)-([-\w]+%?)$/, ([type]) => {
      const valid = [
        GlobalKeywordsRE,
        /^(mid(?:dle)?|base(?:line)?|btm|bottom|top|start|bottom|end|text-(?:top|bottom)|sub|super)$/,
      ].some((r) => r.test(type))

      return valid ? 'vertical-align' : null
    }],
    [/^text-?(?:align-?)?(.+)$/, ([type]) => {
      const valid = [
        GlobalKeywordsRE,
        /^center|left|right|justify|start|end$/,
      ].some((r) => r.test(type))

      return valid ? 'text-align' : null
    }],
    // _rules/behaviors
    // _rules/border
    [/^(?:border-|b-)(.+)$/, ([type]) => {
      let result = type

      ;[
        /^([xyrltbse]|block|inline|[bi][se])(?:-(.+))?$/,
      ].some((r) => {
        const matched = type.match(r)

        if (matched) {
          result = `border-${matched[1]}`
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

      return parsed?.color ? 'color' : null
    }, { scope: 'bg' }],
    // _rules/container
    [/^@container(?:\/(\w+))?(?:-(normal))?$/, () => 'container'],
    // _rules/decoration
    // _rules/default
    // _rules/flex
    // [/^$/, () => ''],
    // _rules/gap
    [
      /^(?:flex-|grid-)?(?:gap-?()|gap-([xy]-?|col-?|row-?))(.+)$/,
      ([direction]) => {
        if (direction === 'y' || direction === 'row')
          return 'gap-row'

        if (direction === 'x' || direction === 'col')
          return 'gap-column'

        return 'gap'
      },
    ],
    // _rules/grid
    // _rules/layout
    // _rules/position
    [/^(?:position-|pos-)?(relative|absolute|fixed|sticky)$/, () => 'position'],
    [/^(?:position-|pos-)([-\w]+)$/, ([type]) => GlobalKeywordsRE.test(type) ? 'position' : null],
    [/^(?:position-|pos-)?(static)$/, () => 'position'],
    // _rules/question-mark
    // _rules/ring
    // _rules/shadow
    // _rules/size
    // _rules/spacing
    [/^p-?([xy])(?:-?(.+))?$/, ([type]) => `padding-${type}`],
    [/^p-?([rltbse])(?:-?(.+))?$/, ([type]) => `padding-${type}`],
    [/^p-(block|inline)(?:-(.+))?$/, ([type]) => `padding-${type}`],
    [/^p-?([bi][se])(?:-?(.+))?$/, ([type]) => `padding-${type}`],
    // [/^pa?()-?(.+)$/, () => 'padding'],
    // [/^p-?xy()()$/, () => 'padding'],
    [/^m-?([xy])(?:-?(.+))?$/, ([type]) => `margin-${type}`],
    [/^m-?([rltbse])(?:-?(.+))?$/, ([type]) => `margin-${type}`],
    [/^m-(block|inline)(?:-(.+))?$/, ([type]) => `margin-${type}`],
    [/^m-?([bi][se])(?:-?(.+))?$/, ([type]) => `margin-${type}`],
    // [/^ma?()-?(.+)$/, () => 'margin'],
    // [/^m-?xy()()$/, () => 'margin'],
    // _rules/static
    [
      /^(?:display-(.+)|inline|block|inline-block|contents|flow-root|list-item|hidden)$/,
      ([type]) => {
        if (!type || GlobalKeywordsRE.test(type))
          return 'display'

        return null
      },
    ],
    [
      /^(?:visible|invisible|backface-(.+))$/,
      ([type]) => {
        if (!type || GlobalKeywordsRE.test(type) || /^(?:visible|hidden)$/.test(type))
          return 'visibility'

        return null
      },
    ],
    // _rules/svg
    // _rules/transform
    [
      /^(?:transform-)?(origin|perspect(?:ive)?(?:-origin)?|(?:translate|rotate|skew|scale)(?:-[xyz])?)-(.+)$/,
      ([type]) => type,
    ],
    [
      /^(?:transform-)?preserve-(?:3d|flat)$/,
      () => 'preserve',
    ],
    [
      /^(?:transform)(?:-(.+))?$/,
      ([type]) => {
        if (!type || type === 'none' || GlobalKeywordsRE.test(type))
          return 'transform'

        return null
      },
    ],
    // _rules/transition
    [/^(?:transition-)?(?:(duration|delay|ease|property)-)(.+)$/, ([type]) => type],
    [/^transition(?:-(.+))$/, ([type]) => {
      if (!type || type === 'none' || GlobalKeywordsRE.test(type))
        return 'transition'

      if (/^discrete|normal$/.test(type))
        return 'transition-behavior'

      return null
    }],
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

        const [prop] = body.split(':')
        return prop
      },
      { scope: 'variables' },
    ],
    // others
    [
      new RegExp(`^${cssVarsPrefix}-((?:${cssVarsAll.join('|')})-)?(.+)$`),
      ([type = 'base', color]) => {
        const parsed = parseColor(color, theme)
        return parsed?.color ? type : null
      },
      { scope: cssVarsPrefix },
    ],
  ]
}

export function prepareStyler(rules: CRRule[] = []) {
  const createVariants = cv(rules)

  function createStyler<
    V extends CVVariants<S, B>,
    CV extends CVCompoundVariants<V, S, B>,
    B extends ClassValue = undefined,
    S extends CVSlots = undefined,
  >(
    theme: CVMeta<V, CV, never, B, S>,
  ) {
    const ui = createVariants(theme)
    const styler: Styler<typeof ui> = (props: any) => ui(props)
    return styler
  }

  return { createStyler }
}
