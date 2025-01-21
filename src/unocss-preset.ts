import { definePreset } from '@unocss/core'
import type { Theme } from '@unocss/preset-mini'
import type { ParsedColorValue } from '@unocss/preset-mini/utils'
import { parseColor, parseCssColor } from '@unocss/preset-mini/utils'

export interface PresetOptions {
  /** @default "0rem" */
  radius?: string
  /** @default "[radius]" */
  radiusButton?: string
  /** @default "[radius]" */
  radiusBox?: string
  /**
   * Base content color
   * @default "#1f2937"
   */
  cb?: string
  /**
   * Base color 1
   * @default "#ffffff"
   */
  c1?: string
  /**
   * Base color 2
   * @default "#f2f2f2"
   */
  c2?: string
  /**
   * Base color 3
   * @default "#e5e6e6"
   */
  c3?: string
}

export const cssVarsPrefix = 'ui'
export const cssVarsBase = ['cb', 'c1', 'c2', 'c3']
export const cssVarsDynamic = ['fill', 'content']
export const cssVarsAll = [...cssVarsBase, ...cssVarsDynamic]

export default definePreset((
  options: PresetOptions = {},
) => {
  const theme: Theme = {
    colors: {
      [cssVarsPrefix]: {
        cb: cssColor(cssVar('cb')),
        c: {
          1: cssColor(cssVar('c1')),
          2: cssColor(cssVar('c2')),
          3: cssColor(cssVar('c3')),
        },
        fill: cssColor(cssVar('fill', cssVar('cb'))),
        content: cssColor(cssVar('content', cssVar('cb'))),
      },
    },
    backgroundColor: {
      [cssVarsPrefix]: {
        base: cssColor(cssVar('fill', cssVar('c1'))),
      },
    },
    textColor: {
      [cssVarsPrefix]: {
        base: cssColor(cssVar('content', cssVar('cb'))),
      },
    },
    borderColor: {
      [cssVarsPrefix]: {
        base: cssColor(cssVar('fill', cssVar('c2'))),
      },
    },
    borderRadius: {
      [`${cssVarsPrefix}-base`]: cssVar('radius'),
      [`${cssVarsPrefix}-button`]: cssVar('radius-button', cssVar('radius')),
      [`${cssVarsPrefix}-box`]: cssVar('radius-box', cssVar('radius')),
    },
    ringWidth: {
      DEFAULT: '1px',
    },
    shadowColor: {
      [cssVarsPrefix]: {
        base: cssColor(cssVar('fill', cssVar('c3'))),
      },
    },
    animation: {
      keyframes: {
        'accordion-up': '{from {height: var(--reka-accordion-content-height);}to {height: 0;}}',
        'accordion-down': '{from {height: 0;}to {height: var(--reka-accordion-content-height);}}',
        'scale-in': '{from {opacity: 0;scale: 0.95;}to {opacity: 1;scale: 1;}}',
        'scale-out': '{from {opacity: 1;scale: 1;}to {opacity: 0;scale: 0.95;}}',
      },
    },
  }

  const resolveRuleValue = (data: ParsedColorValue | undefined) => {
    if (data?.color && data.cssColor?.components) {
      let value = data.cssColor.components.join(' ')

      if (!/var\s*\((.+)\)(.*)/.test(data.color))
        value += ` /* ${data.color} */`

      return value
    }

    return null
  }

  return {
    name: 'unocss-preset-ui',
    theme,
    rules: [
      [
        new RegExp(`^${cssVarsPrefix}-([^/]+)$`),
        ([_, color], ctx) => {
          const data = parseColor(color, ctx.theme)
          const value = resolveRuleValue(data)

          if (value)
            return Object.fromEntries(cssVarsDynamic.map((prop) => [`--${cssVarsPrefix}-${prop}`, value]))
        },
        { autocomplete: `${cssVarsPrefix}-$colors` },
      ],
      [
        new RegExp(`^${cssVarsPrefix}-(?:(${cssVarsAll.join('|')})-)([^/]+)$`),
        ([_, prop, color], ctx) => {
          const data = parseColor(color, ctx.theme)
          const value = resolveRuleValue(data)

          if (value)
            return { [`--${cssVarsPrefix}-${prop}`]: value }
        },
        { autocomplete: `${cssVarsPrefix}-(${cssVarsAll.join('|')})-$colors` },
      ],
      // overrides
      [/^rotate-(\d+)$/, ([_, d]) => ({ rotate: `${d}deg` })],
    ],
    preflights: [
      { getCSS: () => createRootCSS(mergeOptions(options)) },
    ],
    safelist: [
      'fade-in',
      'fade-out',
      ...Object.keys(theme.animation!.keyframes!),
    ].map((v) => `keyframes-${v}`),
  }
})

function mergeOptions(options: PresetOptions): PresetOptions {
  const defaults: Required<PresetOptions> = {
    radius: '0rem',
    radiusButton: '',
    radiusBox: '',
    cb: '#1f2937',
    c1: '#ffffff',
    c2: '#f2f2f2',
    c3: '#e5e6e6',
  }

  return {
    ...defaults,
    ...options,
  }
}

function cssVar(name: string, defaultValue?: string) {
  return defaultValue ? `var(--${cssVarsPrefix}-${name},${defaultValue})` : `var(--${cssVarsPrefix}-${name})`
}

function cssColor(...rgb: (string | number)[]) {
  return `rgb(${rgb.join(' ')})`
}

function createRootCSS(kv: PresetOptions) {
  const kebabCase = (input: string) => input.replace(/([A-Z][^A-Z]*)/g, '-$1').replace(/^-/, '').toLowerCase()
  const join = (input: string[]) => input.map((item) => item.endsWith(';') ? item : `${item};`).join('')

  const css = [
    // initial
    `:root{${join(Object.entries(kv)
      .filter(([_, v]) => Boolean(v))
      .map(([k, v]) => {
        const name = kebabCase(k)
        const content = parseCssColor(v)?.components.join(' ') ?? v
        return `--${cssVarsPrefix}-${name}:${content}`
      }))}}`,
    // reset
    `:root{${join([
      `color:${cssColor(cssVar('cb'))}`,
    ])}}`,
    `*,::before,::after{${join([
      `--un-default-border-color:${cssColor(cssVar('c3'))}`,
      `accent-color:${cssColor(cssVar('cb'))}`,
      `scrollbar-color:color-mix(in srgb,${cssColor(cssVar('cb'))} 35%,transparent) transparent`,
    ])}}`,
  ]

  return css.join('')
}
