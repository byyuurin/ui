import { mergeConfigs } from '@unocss/core'
import { presetUno } from '@unocss/preset-uno'
import { createSharedComposable } from '@vueuse/core'
import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'
import { extendTheme, prepareStyler } from '../internal'
import * as theme from '../theme'
import type { ThemeExtension } from '../types'
import presetUI from '../unocss-preset'
import { createInjection, transformUnoRules } from '../utils'

export const {
  provide: provideThemeExtension,
  inject: injectThemeExtension,
} = createInjection<MaybeRefOrGetter<ThemeExtension>>('ui.themeExtension', {})

const config = mergeConfigs([
  presetUno(),
  presetUI(),
])

export const mergeRules = transformUnoRules(config)

export const useTheme = createSharedComposable(() => {
  const _theme = injectThemeExtension()
  const { createStyler } = prepareStyler(mergeRules)

  return {
    theme: computed(() => extendTheme(toValue(_theme), theme) as typeof theme),
    createStyler,
  }
})
