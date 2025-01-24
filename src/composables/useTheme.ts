import { createSharedComposable } from '@vueuse/core'
import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'
import { extendTheme } from '../internal'
import * as theme from '../theme'
import type { ThemeExtension } from '../types'
import { createInjection } from '../utils'

export const {
  provide: provideThemeExtension,
  inject: injectThemeExtension,
} = createInjection<MaybeRefOrGetter<ThemeExtension>>('ui.themeExtension', {})

export const useTheme = createSharedComposable(() => {
  const _theme = injectThemeExtension()
  return computed(() => extendTheme(toValue(_theme), theme) as typeof theme)
})
