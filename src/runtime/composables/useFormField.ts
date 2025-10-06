import { useDebounceFn } from '@vueuse/core'
import { computed } from 'vue'
import type { FormInputEvents } from '../types'
import type { GetObjectField } from '../types/utils'
import {
  injectFormBus,
  injectFormField,
  injectFormInputId,
  injectFormInputs,
  injectFormOptions,
} from './injections'

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
