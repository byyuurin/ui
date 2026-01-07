<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { CheckboxRootEmits, CheckboxRootProps, PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/checkbox'
import type { ComponentBaseProps, ComponentUIProps, IconProps, RuntimeAppConfig } from '../types'
import type { ButtonHTMLAttributes } from '../types/html'
import type { StaticSlot } from '../types/utils'

type ThemeVariants = VariantProps<typeof theme>

export interface CheckboxProps extends ComponentBaseProps, Pick<CheckboxRootProps, 'disabled' | 'required' | 'name' | 'value' | 'id' | 'defaultValue'>, /** @vue-ignore */ Omit<ButtonHTMLAttributes, 'type' | 'disabled' | 'value' | 'name'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  label?: string
  description?: string
  /** @default "list" */
  variant?: ThemeVariants['variant']
  /** @default "primary" */
  color?: ThemeVariants['color']
  /** @default "md" */
  size?: ThemeVariants['size']
  /** @default "start" */
  indicator?: ThemeVariants['indicator']
  /**
   * The icon displayed when checked.
   * @default app.icons.check
   */
  icon?: IconProps['name']
  /**
   * The icon displayed when the checkbox is indeterminate.
   * @default app.icons.minus
   */
  indeterminateIcon?: IconProps['name']
  modelValue?: boolean | 'indeterminate'
  ui?: ComponentUIProps<typeof theme>
}

export type CheckboxEmits = CheckboxRootEmits & {
  change: [event: Event]
}

export interface CheckboxSlots {
  label: StaticSlot<{ label?: string }>
  description: StaticSlot<{ description?: string }>
}
</script>

<script lang="ts" setup>
import { reactivePick, useVModel } from '@vueuse/core'
import { CheckboxIndicator, CheckboxRoot, Label, Primitive, useForwardProps } from 'reka-ui'
import { computed, useId } from 'vue'
import { useAppConfig } from '#imports'
import { useFormField } from '../composables/useFormField'
import { pick } from '../utils'
import { cv, merge } from '../utils/style'
import Icon from './Icon.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CheckboxProps>(), {
  required: false,
  disabled: false,
})

const emit = defineEmits<CheckboxEmits>()
const slots = defineSlots<CheckboxSlots>()

const modelValue = useVModel(props, 'modelValue', emit)
const rootProps = useForwardProps(reactivePick(props, 'required', 'value', 'defaultValue'))

const { id: _id, name, size, color, disabled, ariaAttrs, emitFormChange, emitFormInput } = useFormField<CheckboxProps>(props)
const id = _id.value ?? useId()

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.checkbox))

  return styler({
    ...pick(props, ['variant', 'indicator', 'required']),
    size: size.value,
    color: color.value,
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
  <Primitive :as="(props.variant && props.variant !== 'list') ? Label : props.as" :class="ui.root({ class: [props.ui?.root, props.class] })" data-part="root">
    <div :class="ui.container({ class: props.ui?.container })" data-part="container">
      <CheckboxRoot
        v-bind="{ id, ...rootProps, ...$attrs, ...ariaAttrs, name, disabled }"
        v-model="modelValue"
        :class="ui.base({ class: props.ui?.base })"
        data-part="base"
        @update:model-value="onUpdate"
      >
        <template #default="{ modelValue }">
          <CheckboxIndicator :class="ui.indicator({ class: props.ui?.indicator })" data-part="indicator">
            <Icon
              v-if="modelValue === 'indeterminate'"
              :name="props.indeterminateIcon || appConfig.ui.icons.minus"
              :class="ui.icon({ class: props.ui?.icon })"
              data-part="icon"
            />
            <Icon
              v-else
              :name="props.icon || appConfig.ui.icons.check"
              :class="ui.icon({ class: props.ui?.icon })"
              data-part="icon"
            />
          </CheckboxIndicator>
        </template>
      </CheckboxRoot>
    </div>
    <div v-if="props.label || !!slots.label || props.description || !!slots.description" :class="ui.wrapper({ class: props.ui?.wrapper })" data-part="wrapper">
      <component
        :is="(!props.variant || props.variant === 'list') ? Label : 'p'"
        v-if="props.label || !!slots.label"
        :for="id"
        :class="ui.label({ class: props.ui?.label })"
        data-part="label"
      >
        <slot name="label" :label="props.label">
          {{ props.label }}
        </slot>
      </component>
      <p v-if="props.description || !!slots.description" :class="ui.description({ class: props.ui?.description })" data-part="description">
        <slot name="description" :description="props.description">
          {{ props.description }}
        </slot>
      </p>
    </div>
  </Primitive>
</template>
