import { definePreset } from '@unocss/core'
import { parseColor } from '@unocss/preset-mini/utils'

interface PresetOptions {
  /** @default "16px" */
  units?: string
  /** @default "0px" */
  radius?: string
}

export default definePreset((options: PresetOptions = {}) => {
  const css = `:root{${Object.entries({
    units: '16px',
    radius: '0px',
    ...options,
  }).map(([k, v]) => `--ui-${k}:${v};`).join('')}}`

  return {
    name: 'unocss-preset-ui',
    rules: [
      [
        /^ui-([^/]+)$/,
        ([_, color], ctx) => {
          const data = parseColor(color, ctx.theme)

          if (data?.cssColor?.components) {
            const value = data.cssColor.components.join(' ')
            return Object.fromEntries(['bg', 'border', 'text'].map((variant) => [`--ui-${variant}`, value]))
          }
        },
        { autocomplete: 'ui-$colors' },
      ],
      [
        /^ui-(?:(bg|border|text)-)([^/]+)$/,
        ([_, variant, color], ctx) => {
          const data = parseColor(color, ctx.theme)

          if (data?.cssColor?.components) {
            const value = data.cssColor.components.join(' ')
            return { [`--ui-${variant}`]: value }
          }
        },
        { autocomplete: 'ui-(bg|border|text)-$colors' },
      ],
    ],
    preflights: [
      { getCSS: () => css },
    ],
  }
})
