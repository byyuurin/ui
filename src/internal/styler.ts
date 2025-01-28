import type { ClassValue, CRRule, CRRuleMatcher, CVCompoundVariants, CVMeta, CVSlots, CVVariants } from '@byyuurin/ui-kit'
import { cv } from '@byyuurin/ui-kit'
import type { ConfigBase, CSSEntries, CSSObject } from '@unocss/core'
import { mergeConfigs } from '@unocss/core'
import { presetMini } from '@unocss/preset-mini'
import type { Styler } from '../types'
import unocssPreset from '../unocss-preset'

export function transformUnoRules<Theme extends object = object>(
  config: ConfigBase<Theme> = {},
) {
  const { rules = [], theme = {} as Theme } = config
  const mergeRules: CRRule[] = []

  const wrap = (value: string, skip = false) => skip ? value : `[${value}]`
  const resolveCSSEntries = (entries: CSSEntries, skipWrap = false) => () => wrap(
    entries.flatMap((value) => Object.keys(value)).join(','),
    skipWrap,
  )

  const resolveCSSObject = (object: CSSObject, skipWrap = false) => () => {
    if (JSON.stringify(object) === '{}')
      return null

    return wrap(
      Object.keys(object).join(','),
      skipWrap,
    )
  }

  for (const rule of rules) {
    const [maybeString, maybeResult] = rule
    const ruleRE = typeof maybeString === 'string' ? new RegExp(`^${maybeString}$`) : maybeString

    if (Array.isArray(maybeResult)) {
      mergeRules.push([ruleRE, resolveCSSEntries(maybeResult)])
      continue
    }

    if (typeof maybeResult === 'object') {
      mergeRules.push([ruleRE, resolveCSSObject(maybeResult)])
      continue
    }

    const matcher: CRRuleMatcher = (matches) => {
      try {
        const result = maybeResult(['', ...matches], {
          theme,
          // @ts-expect-error pass
          generator: { config: {} },
        })

        if (typeof result === 'function')
          return null

        if (Array.isArray(result)) {
          return wrap(result.map((item) => Array.isArray(item)
            ? item[0]
            : resolveCSSObject(item as any, false)).join(','))
        }

        if (typeof result === 'object')
          return resolveCSSObject(result as any)()
      }
      catch (e: any) {
        console.warn(`[Fail Rule]`, ruleRE, e.message)
      }

      return null
    }

    mergeRules.push([ruleRE, matcher])
  }

  return mergeRules
}

const config = mergeConfigs([
  presetMini(),
  unocssPreset(),
])

export const rules = transformUnoRules(config)

export const createVariants = cv()

export function createStyler<
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
