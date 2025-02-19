import { transformUnoRules } from '@byyuurin/ui/unocss'
import type { UserConfig } from '@unocss/core'
import { createSharedComposable } from '@vueuse/core'
import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'
import * as theme from '../theme'
import type { ThemeExtension } from '../types'
import { extendTheme, prepareStyler } from '../utils'
import { defineInjection } from './defineInjection'

export const {
  InjectionKey: InjectionKeyThemeExtension,
  provide: provideThemeExtension,
  inject: injectThemeExtension,
} = defineInjection<MaybeRefOrGetter<ThemeExtension>>('ui.themeExtension', {})

export const {
  InjectionKey: InjectionKeyUnoConfig,
  provide: provideUnoConfig,
  inject: injectUnoConfig,
} = defineInjection<UserConfig>('ui.unoConfig', {})

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
