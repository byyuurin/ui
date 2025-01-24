<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import type { InputHTMLAttributes } from 'vue'
import type { input } from '../theme'
import type { ComponentAttrs } from '../types'

type InputVariants = VariantProps<typeof input>

interface InputAttrs extends ComponentAttrs<typeof input> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: PrimitiveProps['as']
  id?: string
  name?: string
  type?: InputHTMLAttributes['type']
  placeholder?: string
  size?: InputVariants['size']
  variant?: InputVariants['variant']
  loading?: boolean
  required?: boolean
  autocomplete?: InputHTMLAttributes['autocomplete']
  autofocus?: boolean
  autofocusDelay?: number
  disabled?: boolean
}

export interface InputEmits {
  (e: 'update:modelValue', payload: string | number): void
  (e: 'blur', event: FocusEvent): void
  (e: 'change', event: Event): void
}

export interface InputSlots {
  leading?: (props?: {}) => any
  default?: (props?: {}) => any
  trailing?: (props?: {}) => any
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed, onMounted, ref } from 'vue'
import { useTheme } from '../composables'
import { createStyler } from '../internal'
import { looseToNumber } from '../utils'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<InputAttrs>(), {
  type: 'text',
  size: 'md',
  variant: 'outline',
  autocomplete: 'off',
  autofocusDelay: 0,
})
const emit = defineEmits<InputEmits>()
const slots = defineSlots<InputSlots>()
const [modelValue, modelModifiers] = defineModel<string | number>()

const inputRef = ref<HTMLInputElement | null>(null)

const theme = useTheme()
const style = computed(() => {
  const styler = createStyler(theme.value.input)
  return styler(props)
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
}

function onBlur(event: FocusEvent) {
  emit('blur', event)
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
  <Primitive :as="as" :class="style.root({ class: [props.class, props.ui?.root] })">
    <input
      :id="id"
      ref="inputRef"
      :type="props.type"
      :value="modelValue"
      :name="props.name"
      :placeholder="props.placeholder"
      :class="style.base({ class: props.ui?.base })"
      :disabled="props.disabled"
      :required="props.required"
      :autocomplete="props.autocomplete"
      v-bind="$attrs"
      @input="onInput"
      @blur="onBlur"
      @change="onChange"
    />

    <slot></slot>

    <span v-if="slots.leading" :class="style.leading({ class: props.ui?.leading })">
      <slot name="leading"></slot>
    </span>

    <span v-if="slots.trailing" :class="style.trailing({ class: props.ui?.trailing })">
      <slot name="trailing"></slot>
    </span>
  </Primitive>
</template>
