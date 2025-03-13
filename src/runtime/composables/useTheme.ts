import { transformUnoRules } from '@byyuurin/ui/unocss'
import { createSharedComposable } from '@vueuse/core'
import { computed, toValue } from 'vue'
import { injectThemeExtension, injectUnoConfig } from '../app/injections'
import * as theme from '../theme'
import { extendTheme, prepareStyler } from '../utils'

export const useTheme = createSharedComposable(() => {
  const themeExtension = injectThemeExtension()
  const unoConfig = injectUnoConfig()
  const mergeRules = transformUnoRules(toValue(unoConfig))
  const { createStyler } = prepareStyler(mergeRules)

  return {
    theme: computed(() => extendTheme(toValue(themeExtension), theme) as typeof theme),
    createStyler,
  }
})
