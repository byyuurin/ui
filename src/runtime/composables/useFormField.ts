import type { UseEventBusReturn } from '@vueuse/core'
import { useDebounceFn } from '@vueuse/core'
import type { ComputedRef, Ref } from 'vue'
import { computed } from 'vue'
import type { FormErrorWithId, FormEvent, FormFieldProps, FormInputEvents } from '../types'
import type { GetObjectField, MaybeNull } from '../types/utils'
import { defineInjection } from '../utils'

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

export type FormStateProvideValue = Record<string, any>
export const {
  InjectionKey: InjectionKeyFormState,
  inject: injectFormState,
  provide: provideFormState,
} = defineInjection<ComputedRef<FormStateProvideValue>>('ui.form-state')

export interface FormFieldProvideValue<T> {
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
  InjectionKey: InjectionKeyFormField,
  inject: injectFormField,
  provide: provideFormField,
} = defineInjection<ComputedRef<FormFieldProvideValue<FormFieldProps>>>('ui.form-field')

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
} = defineInjection<MaybeNull<Ref<FormErrorWithId[]>>>('ui.form-errors', null)

interface Props<T> {
  id?: string
  name?: string
  size?: GetObjectField<T, 'size'>
  color?: GetObjectField<T, 'color'>
  highlight?: boolean
  disabled?: boolean
}

export function useFormField<T>(props?: Props<T>, options?: { bind?: boolean, deferInputValidation?: boolean }) {
  const formOptions = injectFormOptions()
  const formBus = injectFormBus()
  const formField = injectFormField()
  const formInputs = injectFormInputs()
  const inputId = injectFormInputId()

  if (formField && inputId) {
    if (options?.bind === false) {
      // Removes for="..." attribute on label for RadioGroup and alike.
      inputId.value = undefined
    }
    else if (props?.id) {
      // Updates for="..." attribute on label if props.id is provided.
      inputId.value = props?.id
    }

    if (formInputs && formField.value.name && inputId.value)
      formInputs.value[formField.value.name] = { id: inputId.value, pattern: formField.value.errorPattern }
  }

  function emitFormEvent(type: FormInputEvents, name?: string, eager?: boolean) {
    if (formBus && formField && name)
      formBus.emit({ type, name, eager })
  }

  function emitFormBlur() {
    emitFormEvent('blur', formField?.value.name)
  }

  function emitFormFocus() {
    emitFormEvent('focus', formField?.value.name)
  }

  function emitFormChange() {
    emitFormEvent('change', formField?.value.name)
  }

  const emitFormInput = useDebounceFn(
    () => {
      emitFormEvent('input', formField?.value.name, !options?.deferInputValidation || formField?.value.eagerValidation)
    },
    formField?.value.validateOnInputDelay ?? formOptions?.value.validateOnInputDelay ?? 0,
  )

  return {
    id: computed(() => props?.id ?? inputId?.value),
    name: computed(() => props?.name ?? formField?.value.name),
    size: computed(() => props?.size ?? formField?.value.size),
    color: computed(() => formField?.value.error ? 'error' : props?.color),
    highlight: computed(() => formField?.value.error ? true : props?.highlight),
    disabled: computed(() => formOptions?.value.disabled || props?.disabled),
    emitFormBlur,
    emitFormInput,
    emitFormChange,
    emitFormFocus,
    ariaAttrs: computed(() => {
      if (!formField?.value)
        return

      const descriptiveAttrs = ['error' as const, 'hint' as const, 'help' as const, 'description' as const]
        .filter((type) => formField?.value?.[type])
        .map((type) => `${formField?.value.ariaId}-${type}`) || []

      return {
        'aria-describedby': descriptiveAttrs.join(' '),
        'aria-invalid': !!formField?.value.error,
      }
    }),
  }
}
