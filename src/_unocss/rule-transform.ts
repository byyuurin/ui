import type { CRRule, CRRuleMatcher } from '@byyuurin/ui-kit'
import type { CSSEntry, CSSObject, CSSValueInput, UserConfig } from '@unocss/core'
import { mergeConfigs } from '@unocss/core'
import { presetWind3 } from '@unocss/preset-wind3'
import { preset } from './preset'

const baseUnoConfig = mergeConfigs([
  presetWind3(),
  preset(),
])

export function transformUnoRules(
  userConfig: UserConfig = {},
): CRRule[] {
  const { rules = [], theme = {} } = mergeConfigs([baseUnoConfig, userConfig])
  const mergeRules: CRRule[] = []

  const toString = (values: string[]) => {
    const variables = new Set<string>([])
    const properties = new Set<string>([])
    const propertiesIgnores = new Set<string>(['transform'])
    let propertiesOnly = true

    values.forEach((value) => {
      if (propertiesIgnores.has(value)) {
        properties.add(value)
        propertiesOnly = false
        return
      }

      if (value.startsWith('--')) {
        variables.add(value)
        return
      }

      properties.add(value)
    })

    const valueArray = propertiesOnly && properties.size > 0 ? Array.from(properties.values()) : values

    return valueArray.join(',')
  }

  const resolveCSSValues = (values: (CSSEntry | CSSValueInput)[]) => () => toString(values.flatMap((value) => Object.keys(value)))

  const resolveCSSObject = (object: CSSObject) => () => {
    if (JSON.stringify(object) === '{}')
      return null

    return toString(Object.keys(object))
  }

  for (const rule of rules) {
    const [maybeString, maybeResult] = rule
    const ruleRE = typeof maybeString === 'string' ? new RegExp(`^(?:${maybeString})$`) : maybeString

    if (Array.isArray(maybeResult)) {
      const inputs = maybeResult.filter((item) => typeof item === 'object')
      mergeRules.push([ruleRE, resolveCSSValues(inputs)])
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

        if (Array.isArray(result))
          return toString(result.filter((i) => typeof i === 'object').map((i) => Array.isArray(i) ? i[0] : Object.keys(i).join(',')) as string[])

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

  return mergeRules.sort(([r1], [r2]) => r2.source.length - r1.source.length)
}
