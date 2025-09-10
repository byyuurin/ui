import { preset } from '@byyuurin/ui/unocss'
import type { ClassValue, CVCompoundVariants, CVDefaultVariants, CVParts, CVScope, CVVariants } from '@byyuurin/ui-kit'
import { createCV, cx } from '@byyuurin/ui-kit'
import { createUnoMerge } from '@byyuurin/uno-merge'
import { mergeConfigs } from '@unocss/core'
import { presetWind3 } from '@unocss/preset-wind3'
import { createSharedComposable } from '@vueuse/core'
import { createDefu, defu } from 'defu'
import { computed, toValue } from 'vue'
import { injectThemeExtension, injectUnoConfig } from '../app/injections'
import * as uiTheme from '../theme'
import type { Styler, StylerProps, StylerReturnType, StylerTheme } from '../types'

const extendTheme = createDefu((obj: any, key, value) => {
  if (typeof obj[key] === 'string' && typeof value !== 'string') {
    // type error, skip merge
    return true
  }

  if (key === 'compoundVariants' && Array.isArray(value)) {
    obj[key] = [...obj[key], ...value]
    return true
  }

  if (Array.isArray(value)) {
    // type error, skip merge
    return true
  }

  if (key === 'app') {
    obj[key] = defu(value, obj[key])
    return true
  }

  if (typeof obj[key] === 'string' && typeof value === 'string') {
    if (value.trim())
      obj[key] += ` ${value}`

    return true
  }

  if (Array.isArray(obj[key]) && typeof obj[key][0] === 'string' && typeof value === 'string') {
    if (value.trim())
      obj[key].push(value)

    return true
  }
})

type UITheme = typeof uiTheme

const { merge: unoMerge, setConfig } = await createUnoMerge({})

export const useTheme = createSharedComposable(() => {
  const cv = createCV((...classValues) => unoMerge(cx(...classValues)))

  const unoConfig = injectUnoConfig()
  const themeExtension = injectThemeExtension()
  const themeDefaults: UITheme = JSON.parse(JSON.stringify(uiTheme))
  const theme = computed(() => extendTheme(toValue(themeExtension), themeDefaults) as UITheme)

  setConfig(mergeConfigs([
    { presets: [presetWind3(), preset()] },
    toValue(unoConfig),
  ]) as any)

  function createStyler<
    V extends CVVariants<P, B>,
    CV extends CVCompoundVariants<V, P, B>,
    DV extends CVDefaultVariants<V, P>,
    B extends ClassValue = undefined,
    P extends CVParts = undefined,
  >(
    scope: CVScope<V, CV, DV, B, P>,
  ) {
    const ui = cv(scope)
    const styler: Styler<typeof ui> = (props: any) => ui(props)
    return styler
  }

  function generateStyle<T extends keyof UITheme>(name: T, props?: StylerProps<UITheme[T]>) {
    const styler = createStyler(theme.value[name] as any)
    return styler(props as any) as StylerReturnType<StylerTheme<UITheme[T]>>
  }

  return {
    theme,
    createStyler,
    generateStyle,
  }
})
