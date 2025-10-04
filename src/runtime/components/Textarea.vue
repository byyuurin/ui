<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/textarea'
import type { ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'

export interface TextareaEmits {
  'update:modelValue': [payload: string]
  'blur': [event: FocusEvent]
  'change': [event: Event]
}

export interface TextareaSlots {
  default?: (props?: {}) => any
}

type ThemeVariants = VariantProps<typeof theme>

export interface TextareaProps extends ComponentBaseProps {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  id?: string
  name?: string
  placeholder?: string
  size?: ThemeVariants['size']
  variant?: ThemeVariants['variant']
  highlight?: boolean
  underline?: boolean
  required?: boolean
  autofocus?: boolean
  autofocusDelay?: number
  disabled?: boolean
  rows?: number
  maxRows?: number
  autoResize?: boolean
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed, nextTick, onMounted, useTemplateRef, watch } from 'vue'
import { useAppConfig } from '#imports'
import { useFormItem } from '../composables/useFormItem'
import { cv, merge } from '../utils/style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TextareaProps>(), {
  variant: 'outline',
  rows: 3,
  maxRows: 0,
  autofocusDelay: 0,
})

const emit = defineEmits<TextareaEmits>()
defineSlots<TextareaSlots>()
const [modelValue, modelModifiers] = defineModel<string | number>()

const textareaRef = useTemplateRef('textareaRef')

const { id, name, size, highlight, disabled, ariaAttrs, emitFormInput, emitFormChange, emitFormBlur, emitFormFocus } = useFormItem<TextareaProps>(props)
const appConfig = useAppConfig() as RuntimeAppConfig
const style = computed(() => {
  const ui = cv(merge(theme, appConfig.ui.textarea))
  return ui({
    ...props,
    size: size.value,
    highlight: highlight.value,
  })
})

function autoFocus() {
  if (props.autofocus)
    textareaRef.value?.focus()
}

function updateInput(value: string) {
  if (modelModifiers.trim)
    value = value.trim()

  modelValue.value = value
  emitFormInput()
}

function onInput(event: Event) {
  autoResize()

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

function autoResize() {
  if (!props.autoResize)
    return

  if (!textareaRef.value)
    return

  textareaRef.value.rows = props.rows

  const overflow = textareaRef.value.style.overflow
  textareaRef.value.style.overflow = 'hidden'

  const styles = window.getComputedStyle(textareaRef.value)
  const paddingTop = Number.parseInt(styles.paddingTop)
  const paddingBottom = Number.parseInt(styles.paddingBottom)
  const padding = paddingTop + paddingBottom
  const lineHeight = Number.parseInt(styles.lineHeight)
  const { scrollHeight } = textareaRef.value
  const newRows = Math.ceil((scrollHeight - padding) / lineHeight)

  if (newRows > props.rows)
    textareaRef.value.rows = props.maxRows ? Math.min(newRows, props.maxRows) : newRows

  textareaRef.value.style.overflow = overflow
}

watch(modelValue, () => {
  nextTick(autoResize)
})

defineExpose({
  textareaRef,
})

onMounted(() => {
  setTimeout(() => {
    autoFocus()
  }, props.autofocusDelay)
})
</script>

<template>
  <Primitive
    :as="props.as"
    :aria-disabled="disabled ? true : undefined"
    :class="style.root({ class: [props.class, props.ui?.root] })"
    :data-part="$attrs['data-part'] ?? 'root'"
  >
    <textarea
      ref="textareaRef"
      :class="style.base({ class: props.ui?.base })"
      data-part="base"
      :value="modelValue"
      :rows="props.rows"
      :placeholder="props.placeholder"
      :required="props.required"
      v-bind="{ ...$attrs, ...ariaAttrs, id, name, disabled }"
      @input="onInput"
      @blur="onBlur"
      @change="onChange"
      @focus="emitFormFocus"
    ></textarea>

    <slot></slot>
  </Primitive>
</template>
