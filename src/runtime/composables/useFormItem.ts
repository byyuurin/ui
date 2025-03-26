import { useDebounceFn } from '@vueuse/core'
import { computed } from 'vue'
import {
  injectFormBus,
  injectFormInputId,
  injectFormInputs,
  injectFormItem,
  injectFormOptions,
} from '../app/injections'
import type { FormInputEvents, GetObjectField } from '../types'

interface Props<T> {
  id?: string
  name?: string
  size?: GetObjectField<T, 'size'>
  highlight?: boolean
  disabled?: boolean
}

export function useFormItem<T>(props?: Props<T>, options?: { bind?: boolean, deferInputValidation?: boolean }) {
  const formOptions = injectFormOptions()
  const formBus = injectFormBus()
  const formItem = injectFormItem()
  const formInputs = injectFormInputs()
  const inputId = injectFormInputId()

  if (formItem && inputId) {
    if (options?.bind === false) {
      // Removes for="..." attribute on label for RadioGroup and alike.
      inputId.value = undefined
    }
    else if (props?.id) {
      // Updates for="..." attribute on label if props.id is provided.
      inputId.value = props?.id
    }

    if (formInputs && formItem.value.name && inputId.value)
      formInputs.value[formItem.value.name] = { id: inputId.value, pattern: formItem.value.errorPattern }
  }

  function emitFormEvent(type: FormInputEvents, name?: string, eager?: boolean) {
    if (formBus && formItem && name)
      formBus.emit({ type, name, eager })
  }

  function emitFormBlur() {
    emitFormEvent('blur', formItem?.value.name)
  }

  function emitFormFocus() {
    emitFormEvent('focus', formItem?.value.name)
  }

  function emitFormChange() {
    emitFormEvent('change', formItem?.value.name)
  }

  const emitFormInput = useDebounceFn(
    () => {
      emitFormEvent('input', formItem?.value.name, !options?.deferInputValidation || formItem?.value.eagerValidation)
    },
    formItem?.value.validateOnInputDelay ?? formOptions?.value.validateOnInputDelay ?? 0,
  )

  return {
    id: computed(() => props?.id ?? inputId?.value),
    name: computed(() => props?.name ?? formItem?.value.name),
    size: computed(() => props?.size ?? formItem?.value.size),
    highlight: computed(() => formItem?.value.error ? true : props?.highlight),
    disabled: computed(() => formOptions?.value.disabled || props?.disabled),
    emitFormBlur,
    emitFormInput,
    emitFormChange,
    emitFormFocus,
    ariaAttrs: computed(() => {
      if (!formItem?.value)
        return

      const descriptiveAttrs = ['error' as const, 'hint' as const, 'description' as const]
        .filter((type) => formItem?.value?.[type])
        .map((type) => `${formItem?.value.ariaId}-${type}`) || []

      return {
        'aria-describedby': descriptiveAttrs.join(' '),
        'aria-invalid': !!formItem?.value.error,
      }
    }),
  }
}
