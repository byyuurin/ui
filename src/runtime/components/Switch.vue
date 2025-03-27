<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { SwitchRootProps } from 'reka-ui'
import type { switch as _switch } from '../theme'
import type { ComponentAttrs } from '../types'

export interface SwitchEmits {
  change: [payload: Event]
}

export interface SwitchSlots {
  label?: (props: { label?: string }) => any
  description?: (props: { description?: string }) => any
}

type SwitchVariants = VariantProps<typeof _switch>

export interface SwitchProps extends ComponentAttrs<typeof _switch>, Pick<SwitchRootProps, 'as' | 'disabled' | 'id' | 'name' | 'required' | 'value' | 'defaultValue'> {
  size?: SwitchVariants['size']
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
}
</script>

<script lang="ts" setup>
import { reactivePick } from '@vueuse/core'
import { Label, Primitive, SwitchRoot, SwitchThumb, useForwardProps } from 'reka-ui'
import { computed, useId } from 'vue'
import { useFormItem } from '../composables/useFormItem'
import { useTheme } from '../composables/useTheme'

const props = withDefaults(defineProps<SwitchProps>(), {})
const emit = defineEmits<SwitchEmits>()
const slots = defineSlots<SwitchSlots>()
const modelValue = defineModel<boolean>({ default: undefined })

const rootProps = useForwardProps(reactivePick(props, 'required', 'value', 'defaultValue'))

const { id: _id, size, name, disabled, ariaAttrs, emitFormChange, emitFormInput } = useFormItem<SwitchProps>(props)
const id = _id.value ?? useId()

const { theme, generateStyle } = useTheme()
const style = computed(() => generateStyle('switch', {
  ...props,
  size: size.value,
  disabled: disabled.value,
  checked: false,
  unchecked: false,
}))

function onUpdate(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })

  emit('change', event)
  emitFormChange()
  emitFormInput()
}
</script>

<template>
  <Primitive :as="props.as" :class="style.root({ class: [props.class, props.ui?.root] })">
    <div :class="style.container({ class: props.ui?.container })">
      <SwitchRoot
        v-bind="{ ...rootProps, ...ariaAttrs, id, name }"
        v-model="modelValue"
        :class="style.base({ class: props.ui?.base })"
        :disabled="disabled || props.loading"
        @update:model-value="onUpdate"
      >
        <SwitchThumb :class="style.thumb({ class: props.ui?.thumb })">
          <span v-if="props.loading" :class="style.icon({ class: [theme.app.icons.loading, props.ui?.icon], checked: true, unchecked: true })"></span>
          <template v-else>
            <span v-if="props.checkedIcon" :class="style.icon({ class: [props.checkedIcon, props.ui?.icon], checked: true })"></span>
            <span v-if="props.uncheckedIcon" :class="style.icon({ class: [props.uncheckedIcon, props.ui?.icon], unchecked: true })"></span>
          </template>
        </SwitchThumb>
      </SwitchRoot>
    </div>
    <div v-if="props.label || slots.label || props.description || slots.description" :class="style.wrapper({ class: props.ui?.wrapper })">
      <Label v-if="props.label || slots.label" :for="id" :class="style.label({ class: props.ui?.label })">
        <slot name="label" :label="props.label">{{ props.label }}</slot>
      </Label>
      <p v-if="props.description || slots.description" :class="style.description({ class: props.ui?.description })">
        <slot name="description" :description="props.description">
          {{ props.description }}
        </slot>
      </p>
    </div>
  </Primitive>
</template>
