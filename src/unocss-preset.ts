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
  /** @default "[radius]" */
  radiusTabs?: string
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

export const theme: Theme = {
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
      base: cssColor(cssVar('fill', cssVar('cb'))),
    },
  },
  borderRadius: {
    [`${cssVarsPrefix}-base`]: cssVar('radius'),
    [`${cssVarsPrefix}-button`]: cssVar('radius-button', cssVar('radius')),
    [`${cssVarsPrefix}-box`]: cssVar('radius-box', cssVar('radius')),
    [`${cssVarsPrefix}-tabs`]: cssVar('radius-tabs', cssVar('radius')),
  },
  ringWidth: {
    DEFAULT: '1px',
  },
  shadowColor: {
    [cssVarsPrefix]: {
      base: cssColor(cssVar('fill', cssVar('cb'))),
    },
  },
  animation: {
    keyframes: {
      'fade-in': '{from {opacity: 0;}to {opacity: 1;}}',
      'fade-out': '{from {opacity: 1;}to {opacity: 0;}}',
      'scale-in': '{from {opacity: 0;scale: 0.95;}to {opacity: 1;scale: 1;}}',
      'scale-out': '{from {opacity: 1;scale: 1;}to {opacity: 0;scale: 0.95;}}',
      'slide-in-from-top': '{from {transform: translateY(-100%);}to {transform: translateY(0);}}',
      'slide-out-to-top': '{from {transform: translateY(0);}to {transform: translateY(-100%);}}',
      'slide-in-from-right': '{from {transform: translateX(100%);}to {transform: translateX(0);}}',
      'slide-out-to-right': '{from {transform: translateX(0);}to {transform: translateX(100%);}}',
      'slide-in-from-bottom': '{from {transform: translateY(100%);}to {transform: translateY(0);}}',
      'slide-out-to-bottom': '{from {transform: translateY(0);}to {transform: translateY(100%);}}',
      'slide-in-from-left': '{from {transform: translateX(-100%);}to {transform: translateX(0);}}',
      'slide-out-to-left': '{from {transform: translateX(0);}to {transform: translateX(-100%);}}',
      'slide-in-from-top-and-fade': '{from {opacity: 0;transform: translateY(-4px);}to {opacity: 1;transform: translateY(0);}}',
      'slide-out-to-top-and-fade': '{from {opacity: 1;transform: translateY(0);}to {opacity: 0;transform: translateY(-4px);}}',
      'slide-in-from-right-and-fade': '{from {opacity: 0;transform: translateX(4px);}to {opacity: 1;transform: translateX(0);}}',
      'slide-out-to-right-and-fade': '{from {opacity: 1;transform: translateX(0);}to {opacity: 0;transform: translateX(4px);}}',
      'slide-in-from-bottom-and-fade': '{from {opacity: 0;transform: translateY(4px);}to {opacity: 1;transform: translateY(0);}}',
      'slide-out-to-bottom-and-fade': '{from {opacity: 1;transform: translateY(0);}to {opacity: 0;transform: translateY(4px);}}',
      'slide-in-from-left-and-fade': '{from {opacity: 0;transform: translateX(-4px);}to {opacity: 1;transform: translateX(0);}}',
      'slide-out-to-left-and-fade': '{from {opacity: 1;transform: translateX(0);}to {opacity: 0;transform: translateX(-4px);}}',
    },
  },
}

export default definePreset((
  options: PresetOptions = {},
) => {
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
    safelist: Object.keys(theme.animation!.keyframes!).map((v) => `keyframes-${v}`),
  }
})

function mergeOptions(options: PresetOptions): PresetOptions {
  const defaults: Required<PresetOptions> = {
    radius: '0rem',
    radiusButton: '',
    radiusBox: '',
    radiusTabs: '',
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

function cssVar(name: string, ...defaultValue: string[]) {
  return `var(${[`--${cssVarsPrefix}-${name}`, ...defaultValue].join(',')})`
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
      `--un-default-border-color:color-mix(in srgb,${cssColor(cssVar('cb'))} 10%,transparent)`,
      `accent-color:${cssColor(cssVar('fill', cssVar('cb')))}`,
      `scrollbar-color:color-mix(in srgb,${cssColor(cssVar('cb'))} 25%,transparent) transparent`,
    ])}}`,
    `*::selection{${join([
      `color:${cssColor(cssVar('c1'))}`,
      `background-color:${cssColor(cssVar('fill', cssVar('cb')))}`,
    ])}}`,
  ]

  return css.join('')
}
