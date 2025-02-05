import type { CRRule, CRRuleMatcher } from '@byyuurin/ui-kit'
import type { CSSEntries, CSSObject, UserConfig } from '@unocss/core'
import { mergeConfigs } from '@unocss/core'
import { presetUno } from '@unocss/preset-uno'
import { preset } from './preset'

const baseUnoConfig = mergeConfigs([
  presetUno(),
  preset(),
])

export function transformUnoRules(
  userConfig: UserConfig = {},
) {
  const { rules = [], theme = {} } = mergeConfigs([baseUnoConfig, userConfig])
  const mergeRules: CRRule[] = []

  const resolveCSSEntries = (entries: CSSEntries) => () => entries.flatMap((value) => Object.keys(value)).join(',')

  const resolveCSSObject = (object: CSSObject) => () => {
    if (JSON.stringify(object) === '{}')
      return null

    return Object.keys(object).join(',')
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

        if (Array.isArray(result)) {
          return result
            .filter((i) => typeof i === 'object')
            .map((i) => Array.isArray(i) ? i[0] : Object.keys(i).join(','))
            .join(',')
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
