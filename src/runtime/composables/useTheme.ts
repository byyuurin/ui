import { transformUnoRules } from '@byyuurin/ui/unocss'
import { createSharedComposable } from '@vueuse/core'
import { computed, toValue } from 'vue'
import { injectThemeExtension, injectUnoConfig } from '../app/injections'
import * as uiTheme from '../theme'
import type { StylerProps, StylerReturnType, StylerTheme } from '../types'
import { extendTheme, prepareStyler } from '../utils'

type UITheme = typeof uiTheme

export const useTheme = createSharedComposable(() => {
  const themeExtension = injectThemeExtension()
  const unoConfig = injectUnoConfig()
  const mergeRules = transformUnoRules(toValue(unoConfig))
  const { createStyler } = prepareStyler(mergeRules)
  const theme = computed(() => extendTheme(toValue(themeExtension), uiTheme) as UITheme)

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
