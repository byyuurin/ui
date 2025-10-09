<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { SwitchRootProps } from 'reka-ui'
import theme from '#build/ui/switch'
import type { ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'

export interface SwitchEmits {
  change: [payload: Event]
}

export interface SwitchSlots {
  label?: (props: { label?: string }) => any
  description?: (props: { description?: string }) => any
}

type ThemeVariants = VariantProps<typeof theme>

export interface SwitchProps extends ComponentBaseProps, Pick<SwitchRootProps, 'as' | 'disabled' | 'id' | 'name' | 'required' | 'value' | 'defaultValue'> {
  color?: ThemeVariants['color']
  size?: ThemeVariants['size']
  /** When `true`, the loading icon will be displayed. */
  loading?: boolean
  /**
   * The icon when the `loading` prop is `true`.
   * @default app.icons.loading
   */
  loadingIcon?: string
  /** Display an icon when the switch is checked. */
  checkedIcon?: string
  /** Display an icon when the switch is unchecked. */
  uncheckedIcon?: string
  label?: string
  description?: string
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script lang="ts" setup>
import { reactivePick } from '@vueuse/core'
import { Label, Primitive, SwitchRoot, SwitchThumb, useForwardProps } from 'reka-ui'
import { computed, useId } from 'vue'
import { useAppConfig } from '#imports'
import { useFormField } from '../composables/useFormField'
import { cv, merge } from '../utils/style'
import Icon from './Icon.vue'

const props = withDefaults(defineProps<SwitchProps>(), {})
const emit = defineEmits<SwitchEmits>()
const slots = defineSlots<SwitchSlots>()
const modelValue = defineModel<boolean>({ default: undefined })

const rootProps = useForwardProps(reactivePick(props, 'required', 'value', 'defaultValue'))

const { id: _id, size, name, disabled, ariaAttrs, emitFormChange, emitFormInput } = useFormField<SwitchProps>(props)
const id = _id.value ?? useId()

const appConfig = useAppConfig() as RuntimeAppConfig
const style = computed(() => {
  const ui = cv(merge(theme, appConfig.ui.switch))
  return ui({
    ...props,
    size: size.value,
    disabled: disabled.value,
    checked: false,
    unchecked: false,
  })
})

function onUpdate(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })

  emit('change', event)
  emitFormChange()
  emitFormInput()
}
</script>

<template>
  <Primitive :as="props.as" :class="style.root({ class: [props.class, props.ui?.root] })" data-part="root">
    <div :class="style.container({ class: props.ui?.container })" data-part="container">
      <SwitchRoot
        v-bind="{ ...rootProps, ...ariaAttrs, id, name }"
        v-model="modelValue"
        :disabled="disabled || props.loading"
        :class="style.base({ class: props.ui?.base })"
        data-part="base"
        @update:model-value="onUpdate"
      >
        <SwitchThumb :class="style.thumb({ class: props.ui?.thumb })" data-part="thumb">
          <Icon v-if="props.loading" :name="appConfig.ui.icons.loading" :class="style.icon({ class: props.ui?.icon, checked: true, unchecked: true })" data-part="icon" />
          <template v-else>
            <Icon v-if="props.checkedIcon" :name="props.checkedIcon" :class="style.icon({ class: props.ui?.icon, checked: true })" data-part="icon" />
            <Icon v-if="props.uncheckedIcon" :name="props.uncheckedIcon" :class="style.icon({ class: props.ui?.icon, unchecked: true })" data-part="icon" />
          </template>
        </SwitchThumb>
      </SwitchRoot>
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
