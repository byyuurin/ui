<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/form-item'
import type { ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'

export interface FormFieldSlots {
  label?: (props: { label?: string }) => any
  hint?: (props: { hint?: string }) => any
  description?: (props: { description?: string }) => any
  help?: (props: { help?: string }) => any
  error?: (props: { error?: string | boolean }) => any
  default?: (props: { error?: string | boolean }) => any
}

type ThemeVariants = VariantProps<typeof theme>

export interface FormItemProps extends ComponentBaseProps {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  /** The name of the FormItem. Also used to match form errors. */
  name?: string
  /** A regular expression to match form error names. */
  errorPattern?: RegExp
  label?: string
  description?: string
  help?: string
  error?: string | boolean
  hint?: string
  /**
   * @default 'md'
   */
  size?: ThemeVariants['size']
  required?: boolean
  /** If true, validation on input will be active immediately instead of waiting for a blur event. */
  eagerValidation?: boolean
  /**
   * Delay in milliseconds before validating the form on input events.
   * @default 300
   */
  validateOnInputDelay?: number
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script setup lang="ts">
import { Label, Primitive } from 'reka-ui'
import { computed, ref, useId } from 'vue'
import { useAppConfig } from '#imports'
import { injectFormErrors, provideFormInputId, provideFormItem } from '../composables/injections'
import { cv, merge } from '../utils/style'

const props = defineProps<FormItemProps>()
const slots = defineSlots<FormFieldSlots>()

const id = ref(useId())
// Copies id's initial value to bind aria-attributes such as aria-describedby.
// This is required for the RadioGroup component which unsets the id value.
const ariaId = id.value
provideFormInputId(id)

const formErrors = injectFormErrors()
const error = computed(() => {
  if (props.error)
    return props.error

  const formError = formErrors?.value.find((error) => {
    if (error.name && error.name === props.name)
      return true

    if (error.name && props.errorPattern)
      return error.name.match(props.errorPattern)

    return false
  })

  return formError?.message
})

provideFormItem(computed(() => ({
  ...props,
  error: error.value,
  ariaId,
})))

const appConfig = useAppConfig() as RuntimeAppConfig
const style = computed(() => {
  const ui = cv(merge(theme, appConfig.ui.formItem))
  return ui(props)
})
</script>

<template>
  <Primitive :as="props.as" :class="style.root({ class: [props.class, props.ui?.root] })" data-part="root">
    <div :class="style.wrapper({ class: props.ui?.wrapper })" data-part="wrapper">
      <div v-if="props.label || slots.label" :class="style.labelWrapper({ class: props.ui?.labelWrapper })" data-part="label-wrapper">
        <Label :for="id" :class="style.label({ class: props.ui?.label })" data-part="label">
          <slot name="label" :label="props.label">
            {{ props.label }}
          </slot>
        </Label>
        <span v-if="props.hint || slots.hint" :id="`${ariaId}-hint`" :class="style.hint({ class: props.ui?.hint })" data-part="hint">
          <slot name="hint" :hint="props.hint">
            {{ props.hint }}
          </slot>
        </span>
      </div>

      <p v-if="props.description || slots.description" :id="`${ariaId}-description`" :class="style.description({ class: props.ui?.description })" data-part="description">
        <slot name="description" :description="props.description">
          {{ props.description }}
        </slot>
      </p>
    </div>

    <div :class="(props.label || slots.label || props.description || slots.description) && style.container({ class: props.ui?.container })" data-part="container">
      <slot :error="error"></slot>

      <p v-if="(typeof error === 'string' && error) || slots.error" :id="`${ariaId}-error`" :class="style.error({ class: props.ui?.error })" data-part="error">
        <slot name="error" :error="error">
          {{ error }}
        </slot>
      </p>
      <p v-else :class="style.help({ class: props.ui?.help })" data-part="help">
        <slot name="help" :help="props.help">
          {{ help }}
        </slot>
      </p>
    </div>
  </Primitive>
</template>
