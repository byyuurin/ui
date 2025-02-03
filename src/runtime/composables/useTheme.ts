import { createMergeRules } from '@byyuurin/ui/unocss-preset'
import { createSharedComposable } from '@vueuse/core'
import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'
import * as theme from '../theme'
import type { ThemeExtension } from '../types'
import { createInjection, extendTheme, prepareStyler } from '../utils'

export const {
  provide: provideThemeExtension,
  inject: injectThemeExtension,
} = createInjection<MaybeRefOrGetter<ThemeExtension>>('ui.themeExtension', {})

export const useTheme = createSharedComposable(() => {
  const _theme = injectThemeExtension()
  const mergeRules = createMergeRules()
  const { createStyler } = prepareStyler(mergeRules)

  return {
    theme: computed(() => extendTheme(toValue(_theme), theme) as typeof theme),
    createStyler,
  }
})
