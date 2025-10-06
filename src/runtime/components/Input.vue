<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import type { InputHTMLAttributes } from 'vue'
import theme from '#build/ui/input'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'

export interface InputEmits {
  'update:modelValue': [payload: string | number]
  'blur': [event: FocusEvent]
  'change': [event: Event]
}

export interface InputSlots {
  leading?: (props?: {}) => any
  default?: (props?: {}) => any
  trailing?: (props?: {}) => any
}

type ThemeVariants = VariantProps<typeof theme>

export interface InputProps extends ComponentBaseProps, UseComponentIconsProps {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  id?: string
  name?: string
  type?: InputHTMLAttributes['type']
  placeholder?: string
  color?: ThemeVariants['color']
  size?: ThemeVariants['size']
  variant?: ThemeVariants['variant']
  loading?: boolean
  highlight?: boolean
  underline?: boolean
  required?: boolean
  autocomplete?: InputHTMLAttributes['autocomplete']
  autofocus?: boolean
  autofocusDelay?: number
  disabled?: boolean
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed, onMounted, ref } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useFieldGroup } from '../composables/useFieldGroup'
import { useFormField } from '../composables/useFormField'
import { looseToNumber } from '../utils'
import { cv, merge } from '../utils/style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  variant: 'outline',
  autocomplete: 'off',
  autofocusDelay: 0,
})

const emit = defineEmits<InputEmits>()
const slots = defineSlots<InputSlots>()
const [modelValue, modelModifiers] = defineModel<string | number>()

const inputRef = ref<HTMLInputElement | null>(null)

const {
  size: formFieldSize,
  id,
  name,
  color,
  highlight,
  disabled,
  ariaAttrs,
  emitFormBlur,
  emitFormInput,
  emitFormChange,
  emitFormFocus,
} = useFormField<InputProps>(props, { deferInputValidation: true })
const { size: fieldGroupSize, orientation } = useFieldGroup(props)
const { isLeading, leadingIconName, isTrailing, trailingIconName } = useComponentIcons(props)

const appConfig = useAppConfig() as RuntimeAppConfig
const style = computed(() => {
  const ui = cv(merge(theme, appConfig.ui.input))

  return ui({
    ...props,
    type: props.type as ThemeVariants['type'],
    color: color.value,
    size: fieldGroupSize.value || formFieldSize.value,
    highlight: highlight.value,
    groupOrientation: orientation.value,
    leading: isLeading.value || !!slots.leading,
    trailing: isTrailing.value || !!slots.trailing,
  })
})

function autoFocus() {
  if (props.autofocus)
    inputRef.value?.focus()
}

function updateInput(value: string) {
  if (modelModifiers.trim)
    value = value.trim()

  if (modelModifiers.number || props.type === 'number')
    value = looseToNumber(value)

  modelValue.value = value
  emitFormInput()
}

function onInput(event: Event) {
  if (!modelModifiers.lazy)
    updateInput((event.target as HTMLInputElement).value)
}

function onChange(event: Event) {
  const value = (event.target as HTMLInputElement).value

  if (modelModifiers.lazy)
    updateInput(value)

  if (modelModifiers.trim)
    (event.target as HTMLInputElement).value = value.trim()

  emit('change', event)
  emitFormChange()
}

function onBlur(event: FocusEvent) {
  emit('blur', event)
  emitFormBlur()
}

defineExpose({
  inputRef,
})

onMounted(() => {
  setTimeout(() => {
    autoFocus()
  }, props.autofocusDelay)
})
</script>

<template>
  <Primitive
    :as="as"
    :aria-disabled="disabled ? true : undefined"
    :class="style.root({ class: [props.class, props.ui?.root] })"
    :data-part="$attrs['data-part'] ?? 'root'"
  >
    <span v-if="isLeading || slots.leading" :class="style.leading({ class: props.ui?.leading })" data-part="leading">
      <slot name="leading">
        <span
          v-if="isLeading && leadingIconName"
          :class="style.leadingIcon({ class: [leadingIconName, props.ui?.leadingIcon] })"
          data-part="leading-icon"
        ></span>
      </slot>
    </span>

    <input
      ref="inputRef"
      :class="style.base({ class: props.ui?.base })"
      data-part="input"
      :type="props.type"
      :value="modelValue"
      :placeholder="props.placeholder"
      :required="props.required"
      :autocomplete="props.autocomplete"
      v-bind="{ ...$attrs, ...ariaAttrs, id, name, disabled }"
      @input="onInput"
      @blur="onBlur"
      @change="onChange"
      @focus="emitFormFocus"
    />

    <slot></slot>

    <span v-if="isTrailing || slots.trailing" :class="style.trailing({ class: props.ui?.trailing })" data-part="trailing">
      <slot name="trailing">
        <span
          v-if="isTrailing && trailingIconName"
          :class="style.trailingIcon({ class: [trailingIconName, props.ui?.trailingIcon] })"
          data-part="trailing-icon"
        ></span>
      </slot>
    </span>
  </Primitive>
</template>
