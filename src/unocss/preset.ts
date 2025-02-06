import { definePreset } from '@unocss/core'
import { parseCssColor } from '@unocss/preset-mini/utils'
import { cssVarsPrefix } from './constants'
import rules from './rules'
import theme, { cssColor, cssVar } from './theme'

export interface PresetOptions {
  /** @default "0rem" */
  radius?: string
  /** @default "[radius]" */
  radiusBox?: string
  /** @default "[radius]" */
  radiusButton?: string
  /** @default "[radius]" */
  radiusCheckbox?: string
  /** @default "[radius]" */
  radiusRadio?: string
  /** @default "[radius]" */
  radiusSwitch?: string
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

export const preset = definePreset((
  options: PresetOptions = {},
) => {
  return {
    name: 'unocss-preset-ui',
    theme,
    rules,
    preflights: [
      { getCSS: () => createRootCSS(mergeOptions(options)) },
    ],
    safelist: Object.keys(theme.animation!.keyframes!).map((v) => `keyframes-${v}`),
  }
})

export default preset

function mergeOptions(options: PresetOptions): PresetOptions {
  const defaults: Required<PresetOptions> = {
    radius: '0rem',
    radiusBox: '',
    radiusButton: '',
    radiusCheckbox: '',
    radiusRadio: '',
    radiusSwitch: '',
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
