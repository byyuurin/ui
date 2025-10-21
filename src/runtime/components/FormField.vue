<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/form-field'
import type { ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'
import type { StaticSlot } from '../types/utils'

export interface FormFieldSlots {
  label: StaticSlot<{ label?: string }>
  hint: StaticSlot<{ hint?: string }>
  description: StaticSlot<{ description?: string }>
  help: StaticSlot<{ help?: string }>
  error: StaticSlot<{ error?: boolean | string }>
  default: StaticSlot<{ error?: boolean | string }>
}

type ThemeVariants = VariantProps<typeof theme>

export interface FormFieldProps extends ComponentBaseProps {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  /** The name of the FormField. Also used to match form errors. */
  name?: string
  /** A regular expression to match form error names. */
  errorPattern?: RegExp
  label?: string
  description?: string
  help?: string
  error?: string | boolean
  hint?: string
  /**
   * @default "md"
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
import { computed, ref, useId, watch } from 'vue'
import { useAppConfig } from '#imports'
import { injectFormErrors, injectFormInputs, provideFormField, provideFormInputId } from '../composables/injections'
import { cv, merge } from '../utils/style'

const props = defineProps<FormFieldProps>()
const slots = defineSlots<FormFieldSlots>()

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

const id = ref(useId())

// Copies id's initial value to bind aria-attributes such as aria-describedby.
// This is required for the RadioGroup component which unsets the id value.
const ariaId = id.value

const formInputs = injectFormInputs()

watch(id, () => {
  if (formInputs && props.name)
    formInputs.value[props.name] = { id: id.value, pattern: props.errorPattern }
}, {
  immediate: true,
})

provideFormInputId(id)

provideFormField(computed(() => ({
  name: props.name,
  size: props.size,
  eagerValidation: props.eagerValidation,
  validateOnInputDelay: props.validateOnInputDelay,
  errorPattern: props.errorPattern,
  hint: props.hint,
  description: props.description,
  help: props.help,
  ariaId,
  error: error.value,
})))

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.formField))
  return styler(props)
})
</script>

<template>
  <Primitive :as="props.as" :class="ui.root({ class: [props.ui?.root, props.class] })" data-part="root">
    <div :class="ui.wrapper({ class: props.ui?.wrapper })" data-part="wrapper">
      <div v-if="props.label || !!slots.label" :class="ui.labelWrapper({ class: props.ui?.labelWrapper })" data-part="label-wrapper">
        <Label :for="id" :class="ui.label({ class: props.ui?.label })" data-part="label">
          <slot name="label" :label="props.label">
            {{ props.label }}
          </slot>
        </Label>
        <span v-if="props.hint || !!slots.hint" :id="`${ariaId}-hint`" :class="ui.hint({ class: props.ui?.hint })" data-part="hint">
          <slot name="hint" :hint="props.hint">
            {{ props.hint }}
          </slot>
        </span>
      </div>

      <p v-if="props.description || !!slots.description" :id="`${ariaId}-description`" :class="ui.description({ class: props.ui?.description })" data-part="description">
        <slot name="description" :description="props.description">
          {{ props.description }}
        </slot>
      </p>
    </div>

    <div :class="(props.label || !!slots.label || props.description || !!slots.description) && ui.container({ class: props.ui?.container })" data-part="container">
      <slot :error="error"></slot>

      <div v-if="(typeof error === 'string' && error) || !!slots.error" :id="`${ariaId}-error`" :class="ui.error({ class: props.ui?.error })" data-part="error">
        <slot name="error" :error="error">
          {{ error }}
        </slot>
      </div>
      <div v-else-if="props.help || !!slots.help" :class="ui.help({ class: props.ui?.help })" data-part="help">
        <slot name="help" :help="props.help">
          {{ props.help }}
        </slot>
      </div>
    </div>
  </Primitive>
</template>
