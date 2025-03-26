import type { UserConfig } from '@unocss/core'
import type { UseEventBusReturn } from '@vueuse/core'
import type { ComputedRef, MaybeRefOrGetter, Ref } from 'vue'
import type { AvatarGroupProps, ButtonGroupProps, FormErrorWithId, FormEvent, FormItemProps, GetObjectField, Messages, ThemeExtension } from '../types'
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

// Form
export interface FormOptionsProvideValue {
  disabled: boolean
  validateOnInputDelay: number
}
export const {
  InjectionKey: InjectionKeyFormOptions,
  inject: injectFormOptions,
  provide: provideFormOptions,
} = defineInjection<ComputedRef<FormOptionsProvideValue>>('ui.form-options')

export type FormBusProvideValue = UseEventBusReturn<FormEvent<any>, string>
export const {
  InjectionKey: InjectionKeyFormBus,
  inject: injectFormBus,
  provide: provideFormBus,
} = defineInjection<FormBusProvideValue>('ui.form-bus')

export interface FormItemProvideValue<T> {
  name?: string
  size?: GetObjectField<T, 'size'>
  error?: string | boolean
  eagerValidation?: boolean
  validateOnInputDelay?: number
  errorPattern?: RegExp
  hint?: string
  description?: string
  ariaId: string
}
export const {
  InjectionKey: InjectionKeyFormItem,
  inject: injectFormItem,
  provide: provideFormItem,
} = defineInjection<ComputedRef<FormItemProvideValue<FormItemProps>>>('ui.form-item')

export const {
  InjectionKey: InjectionKeyFormInputId,
  inject: injectFormInputId,
  provide: provideFormInputId,
} = defineInjection<Ref<string | undefined>>('ui.form-input-id')

export type FormInputsProvideValue = Record<string, { id?: string, pattern?: RegExp }>
export const {
  InjectionKey: InjectionKeyFormInputs,
  inject: injectFormInputs,
  provide: provideFormInputs,
} = defineInjection<Ref<FormInputsProvideValue>>('ui.form-inputs')

export const {
  InjectionKey: InjectionKeyFormLoading,
  inject: injectFormLoading,
  provide: provideFormLoading,
} = defineInjection<Readonly<Ref<boolean>>>('ui.form-loading')

export const {
  InjectionKey: InjectionKeyFormErrors,
  inject: injectFormErrors,
  provide: provideFormErrors,
} = defineInjection<Ref<FormErrorWithId[]> | null>('ui.form-errors', null)

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
