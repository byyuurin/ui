import type { Rule } from '@unocss/core'
import type { ParsedColorValue } from '@unocss/preset-mini/utils'
import { parseColor } from '@unocss/preset-mini/utils'
import { cssVarsAll, cssVarsDynamic, cssVarsPrefix } from './constants'
import { cssColor, cssVar } from './theme'

export const rules: Rule[] = [
  [
    new RegExp(`^${cssVarsPrefix}-([^/]+)$`),
    ([_, color], ctx) => {
      if (color === 'base')
        return Object.fromEntries(cssVarsDynamic.map((prop) => [`--${cssVarsPrefix}-${prop}`, cssVar('cb')]))

      if (color === 'base-inverted')
        return Object.fromEntries(cssVarsDynamic.map((prop) => [`--${cssVarsPrefix}-${prop}`, cssVar('cx')]))

      if (color === 'primary')
        return Object.fromEntries(cssVarsDynamic.map((prop) => [`--${cssVarsPrefix}-${prop}`, cssVar('cp', cssVar('cb'))]))

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
      if (color === 'base')
        return { [`--${cssVarsPrefix}-${prop}`]: cssVar('cb') }

      if (color === 'base-inverted')
        return { [`--${cssVarsPrefix}-${prop}`]: cssVar('cx') }

      if (color === 'primary')
        return { [`--${cssVarsPrefix}-${prop}`]: cssVar('cp', cssVar('cb')) }

      const data = parseColor(color, ctx.theme)
      const value = resolveRuleValue(data)

      if (value)
        return { [`--${cssVarsPrefix}-${prop}`]: value }
    },
    { autocomplete: `${cssVarsPrefix}-(${cssVarsAll.join('|')})-$colors` },
  ],
  [
    /^bg-solid-(.+)$/,
    ([_, c], { theme }) => {
      const parsed = parseColor(c, theme)

      if (!parsed || parsed.cssColor?.type !== 'rgb')
        return

      const color = `rgb(${parsed.cssColor.components.join(' ')})`
      const opacity = parsed.opacity || '100'

      return {
        'background-color': `color-mix(in srgb, ${color} ${opacity}%, ${cssColor(cssVar('cx'))})`,
      }
    },
  ],
  // overrides
  [/^rotate-(\d+)$/, ([_, d]) => ({ rotate: `${d}deg` })],
]

export default rules

function resolveRuleValue(data: ParsedColorValue | undefined) {
  if (data?.color && data.cssColor?.components) {
    let value = data.cssColor.components.join(' ')

    if (!/var\s*\((.+)\)(.*)/.test(data.color))
      value += ` /* ${data.color} */`

    return value
  }

  return null
}
