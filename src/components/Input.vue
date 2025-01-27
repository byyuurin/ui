<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import type { InputHTMLAttributes } from 'vue'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { input } from '../theme'
import type { ComponentAttrs } from '../types'

type InputVariants = VariantProps<typeof input>

export interface InputProps extends ComponentAttrs<typeof input>, UseComponentIconsProps {
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
  highlight?: boolean
  underline?: boolean
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
  prefix?: (props?: {}) => any
  default?: (props?: {}) => any
  suffix?: (props?: {}) => any
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed, onMounted, ref } from 'vue'
import { useComponentIcons, useTheme } from '../composables'
import { createStyler } from '../internal'
import { looseToNumber } from '../utils'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<InputProps>(), {
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

const { isPrefix, prefixIconName, isSuffix, suffixIconName } = useComponentIcons(props)

const theme = useTheme()
const style = computed(() => {
  const styler = createStyler(theme.value.input)
  // @ts-expect-error ignore type
  return styler({
    ...props,
    prefix: isPrefix.value || !!slots.prefix,
    suffix: isSuffix.value || !!slots.suffix,
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
  <Primitive :as="as" :class="style.root({ class: [props.class, props.ui?.root] })" :aria-disabled="props.disabled ? true : undefined">
    <span v-if="isPrefix || slots.prefix" :class="style.prefix({ class: props.ui?.prefix })">
      <slot name="prefix">
        <i
          v-if="isPrefix && prefixIconName"
          :class="style.prefixIcon({ class: [prefixIconName, props.ui?.prefixIcon] })"
        ></i>
      </slot>
    </span>

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

    <span v-if="isSuffix || slots.suffix" :class="style.suffix({ class: props.ui?.suffix })">
      <slot name="suffix">
        <i
          v-if="isSuffix && suffixIconName"
          :class="style.suffixIcon({ class: [suffixIconName, props.ui?.suffixIcon] })"
        ></i>
      </slot>
    </span>
  </Primitive>
</template>
