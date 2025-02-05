import { transformUnoRules } from '@byyuurin/ui/unocss-preset'
import { createSharedComposable } from '@vueuse/core'
import type { UserConfig } from 'unocss'
import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'
import * as theme from '../theme'
import type { ThemeExtension } from '../types'
import { createInjection, extendTheme, prepareStyler } from '../utils'

export const {
  provide: provideThemeExtension,
  inject: injectThemeExtension,
} = createInjection<MaybeRefOrGetter<ThemeExtension>>('ui.themeExtension', {})

export const {
  provide: provideUnoConfig,
  inject: injectUnoConfig,
} = createInjection<UserConfig>('ui.unoConfig', {})

export const useTheme = createSharedComposable(() => {
  const themeExtension = injectThemeExtension()
  const unoConfig = injectUnoConfig()
  const mergeRules = transformUnoRules(unoConfig)
  const { createStyler } = prepareStyler(mergeRules)

  return {
    theme: computed(() => extendTheme(toValue(themeExtension), theme) as typeof theme),
    createStyler,
  }
})
