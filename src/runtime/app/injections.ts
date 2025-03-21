import type { UserConfig } from '@unocss/core'
import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import type { AvatarGroupProps, ButtonGroupProps, Messages, ThemeExtension } from '../types'
import type { Locale } from '../utils'
import { defineInjection } from '../utils'

// AvatarGroup
export type AvatarGroupProvideValue = Pick<AvatarGroupProps, 'size'>
export const {
  InjectionKey: InjectionKeyAvatarGroup,
  inject: injectAvatarGroup,
  provide: provideAvatarGroup,
} = defineInjection<ComputedRef<AvatarGroupProvideValue>>('ui.avatar-group')

// ButtonGroup
export type ButtonGroupProvideValue = Pick<ButtonGroupProps, 'size' | 'orientation'>
export const {
  InjectionKey: InjectionKeyButtonGroup,
  inject: injectButtonGroup,
  provide: provideButtonGroup,
} = defineInjection<ComputedRef<ButtonGroupProvideValue>>('ui.button-group')

// Locale
export const {
  InjectionKey: InjectionKeyLocaleContext,
  inject: injectLocaleContext,
  provide: provideLocaleContext,
} = defineInjection<MaybeRefOrGetter<Locale<Messages> | undefined>>('ui.locale-context')

// Theme Extension
export const {
  InjectionKey: InjectionKeyThemeExtension,
  provide: provideThemeExtension,
  inject: injectThemeExtension,
} = defineInjection<MaybeRefOrGetter<ThemeExtension>>('ui.theme-extension', {})

// UnoCSS UserConfig
export const {
  InjectionKey: InjectionKeyUnoConfig,
  provide: provideUnoConfig,
  inject: injectUnoConfig,
} = defineInjection<MaybeRefOrGetter<UserConfig>>('ui.uno-config', {})
