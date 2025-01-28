import { createSharedComposable } from '@vueuse/core'
import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'
import { createMergeRules, extendTheme, prepareStyler } from '../internal'
import * as theme from '../theme'
import type { ThemeExtension } from '../types'
import { createInjection } from '../utils'

export const {
  provide: provideThemeExtension,
  inject: injectThemeExtension,
} = createInjection<MaybeRefOrGetter<ThemeExtension>>('ui.themeExtension', {})

export const mergeRules = createMergeRules()

export const useTheme = createSharedComposable(() => {
  const _theme = injectThemeExtension()
  const { createStyler } = prepareStyler(mergeRules)

  return {
    theme: computed(() => extendTheme(toValue(_theme), theme) as typeof theme),
    createStyler,
  }
})
