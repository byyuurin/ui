<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { CheckboxRootProps, PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/checkbox'
import type { ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'

export interface CheckboxEmits {
  change: [payload: Event]
}

export interface CheckboxSlots {
  label?: (props: { label?: string }) => any
  description?: (props: { description?: string }) => any
}

type ThemeVariants = VariantProps<typeof theme>

export interface CheckboxProps extends ComponentBaseProps, Pick<CheckboxRootProps, 'disabled' | 'required' | 'name' | 'value' | 'id' | 'defaultValue'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  label?: string
  description?: string
  size?: ThemeVariants['size']
  /**
   * The icon displayed when checked.
   * @default app.icons.check
   */
  icon?: string
  /**
   * The icon displayed when the checkbox is indeterminate.
   * @default app.icons.minus
   */
  indeterminateIcon?: string
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script lang="ts" setup>
import { reactivePick } from '@vueuse/core'
import { CheckboxIndicator, CheckboxRoot, Label, Primitive, useForwardProps } from 'reka-ui'
import { computed, useId } from 'vue'
import { useAppConfig } from '#imports'
import { useFormField } from '../composables/useFormField'
import { cv, merge } from '../utils/style'
import Icon from './Icon.vue'

const props = withDefaults(defineProps<CheckboxProps>(), {
  required: false,
  disabled: false,
})
const emit = defineEmits<CheckboxEmits>()
const slots = defineSlots<CheckboxSlots>()

const innerValue = defineModel<boolean | 'indeterminate'>({ default: undefined })
const rootProps = useForwardProps(reactivePick(props, 'required', 'value', 'defaultValue'))

const { id: _id, size, name, disabled, ariaAttrs, emitFormChange, emitFormInput } = useFormField<CheckboxProps>(props)
const id = _id.value ?? useId()

const appConfig = useAppConfig() as RuntimeAppConfig
const style = computed(() => {
  const ui = cv(merge(theme, appConfig.ui.checkbox))
  return ui({
    ...props,
    size: size.value,
    disabled: disabled.value,
  })
})

function onUpdate(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: value })
  emit('change', event)
  emitFormChange()
  emitFormInput()
}
</script>

<template>
  <Primitive :as="props.as" :class="style.root({ class: [props.class, props.ui?.root] })" data-part="root">
    <div :class="style.container({ class: props.ui?.container })" data-part="container">
      <CheckboxRoot
        v-slot="{ modelValue }"
        v-bind="{ ...rootProps, ...ariaAttrs, id, name, disabled }"
        v-model="innerValue"
        :class="style.base({ class: props.ui?.base })"
        data-part="base"
        @update:model-value="onUpdate"
      >
        <CheckboxIndicator as-child force-mount>
          <Icon
            v-if="modelValue === 'indeterminate'"
            :name="props.indeterminateIcon || appConfig.ui.icons.minus"
            :class="style.icon({ class: props.ui?.icon })"
            data-part="icon"
          />
          <Icon v-else :name="props.icon || appConfig.ui.icons.check" :class="style.icon({ class: props.ui?.icon })" data-part="icon" />
        </CheckboxIndicator>
      </CheckboxRoot>
    </div>
    <div v-if="props.label || slots.label || props.description || slots.description" :class="style.wrapper({ class: props.ui?.wrapper })" data-part="wrapper">
      <Label v-if="props.label || slots.label" :for="id" :class="style.label({ class: props.ui?.label })" data-part="label">
        <slot name="label" :label="props.label">{{ props.label }}</slot>
      </Label>
      <p v-if="props.description || slots.description" :class="style.description({ class: props.ui?.description })" data-part="description">
        <slot name="description" :description="props.description">
          {{ props.description }}
        </slot>
      </p>
    </div>
  </Primitive>
</template>
