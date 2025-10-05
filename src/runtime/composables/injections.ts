import type { UseEventBusReturn } from '@vueuse/core'
import type { ComputedRef, MaybeRefOrGetter, Ref } from 'vue'
import type { AvatarGroupProps, FieldGroupProps, FormErrorWithId, FormEvent, FormItemProps, Messages } from '../types'
import type { GetObjectField } from '../types/utils'
import type { Locale } from '../utils'
import { defineInjection } from '../utils'

// AvatarGroup
export type AvatarGroupProvideValue = Pick<AvatarGroupProps, 'size'>
export const {
  InjectionKey: InjectionKeyAvatarGroup,
  inject: injectAvatarGroup,
  provide: provideAvatarGroup,
} = defineInjection<ComputedRef<AvatarGroupProvideValue>>('ui.avatar-group')

// FieldGroup
export type FieldGroupProvideValue = Pick<FieldGroupProps, 'size' | 'orientation'>
export const {
  InjectionKey: InjectionKeyFieldGroup,
  inject: injectFieldGroup,
  provide: provideFieldGroup,
} = defineInjection<ComputedRef<FieldGroupProvideValue>>('ui.field-group')

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
  help?: string
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
