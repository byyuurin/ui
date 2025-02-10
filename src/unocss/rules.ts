import type { Rule } from '@unocss/core'
import type { ParsedColorValue } from '@unocss/preset-mini/utils'
import { parseColor } from '@unocss/preset-mini/utils'
import { cssVarsAll, cssVarsDynamic, cssVarsPrefix } from './constants'
import { cssVar } from './theme'

export const rules: Rule[] = [
  [
    new RegExp(`^${cssVarsPrefix}-([^/]+)$`),
    ([_, color], ctx) => {
      if (color === 'base')
        return Object.fromEntries(cssVarsDynamic.map((prop) => [`--${cssVarsPrefix}-${prop}`, cssVar('cb')]))

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

      const data = parseColor(color, ctx.theme)
      const value = resolveRuleValue(data)

      if (value)
        return { [`--${cssVarsPrefix}-${prop}`]: value }
    },
    { autocomplete: `${cssVarsPrefix}-(${cssVarsAll.join('|')})-$colors` },
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
