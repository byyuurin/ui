<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/textarea'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { AvatarProps, ComponentBaseProps, ComponentStyler, ComponentUIProps, RuntimeAppConfig } from '../types'
import type { TextareaHTMLAttributes } from '../types/html'
import type { ModelModifiers } from '../types/input'
import type { MaybeNull, Nullable, StaticSlot } from '../types/utils'

type TextareaValue = MaybeNull<string | number>

type ThemeVariants = VariantProps<typeof theme>

export interface TextareaProps<T extends TextareaValue = TextareaValue> extends ComponentBaseProps, UseComponentIconsProps, /** @vue-ignore */ Omit<TextareaHTMLAttributes, 'name' | 'placeholder' | 'required' | 'autofocus' | 'disabled' | 'rows'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  id?: string
  name?: string
  /** The placeholder text when the textarea is empty. */
  placeholder?: string
  /** @default "sm" */
  size?: ThemeVariants['size']
  /** @default "primary" */
  color?: ThemeVariants['color']
  /** @default "outline" */
  variant?: ThemeVariants['variant']
  /** Highlight the ring color like a focus state. */
  highlight?: boolean
  required?: boolean
  autofocus?: boolean
  autofocusDelay?: number
  disabled?: boolean
  rows?: number
  maxRows?: number
  autoresize?: boolean
  autoresizeDelay?: number
  modelValue?: T
  defaultValue?: T
  modelModifiers?: ModelModifiers<T>
  ui?: ComponentUIProps<typeof theme>
}

export interface TextareaEmits<T extends TextareaValue = TextareaValue> {
  'update:modelValue': [payload: T]
  'blur': [event: FocusEvent]
  'change': [event: Event]
}

export interface TextareaSlots {
  default: StaticSlot<{ ui: ComponentStyler<typeof theme> }>
  leading: StaticSlot<{ ui: ComponentStyler<typeof theme> }>
  trailing: StaticSlot<{ ui: ComponentStyler<typeof theme> }>
}
</script>

<script setup lang="ts" generic="T extends TextareaValue">
import { useVModel } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed, nextTick, onMounted, shallowRef, watch } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useFormField } from '../composables/useFormField'
import { looseToNumber } from '../utils'
import { cv, merge } from '../utils/style'
import Avatar from './Avatar.vue'
import Icon from './Icon.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TextareaProps<T>>(), {
  rows: 3,
  maxRows: 0,
  autofocusDelay: 0,
  autoresizeDelay: 0,
})

const emit = defineEmits<TextareaEmits>()
const slots = defineSlots<TextareaSlots>()

const modelValue = useVModel<TextareaProps<T>, 'modelValue', 'update:modelValue'>(props, 'modelValue', emit, { defaultValue: props.defaultValue })

const { id, name, size, color, highlight, disabled, ariaAttrs, emitFormInput, emitFormChange, emitFormBlur, emitFormFocus } = useFormField<TextareaProps<T>>(props)
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props)

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.textarea))
  return styler({
    ...props,
    size: size.value,
    color: color.value,
    highlight: highlight.value,
    leading: isLeading.value || !!props.avatar || !!slots.leading,
    trailing: isTrailing.value || !!slots.trailing,
  })
})

const textareaRef = shallowRef<MaybeNull<HTMLTextAreaElement>>(null)

// Custom function to handle the v-model properties
function updateInput(value: Nullable<string>) {
  if (props.modelModifiers?.trim)
    value = value?.trim() ?? null

  if (props.modelModifiers?.number)
    value = looseToNumber(value)

  if (props.modelModifiers?.nullable)
    value ||= null

  if (props.modelModifiers?.optional)
    value ||= undefined

  modelValue.value = value as T
  emitFormInput()
}

function onInput(event: Event) {
  autoResize()

  if (!props.modelModifiers?.lazy)
    updateInput((event.target as HTMLTextAreaElement).value)
}

function onChange(event: Event) {
  const value = (event.target as HTMLTextAreaElement).value

  if (props.modelModifiers?.lazy)
    updateInput(value)

  // Update trimmed textarea so that it has same behavior as native textarea
  // https://github.com/vuejs/core/blob/5ea8a8a4fab4e19a71e123e4d27d051f5e927172/packages/runtime-dom/src/directives/vModel.ts#L63
  if (props.modelModifiers?.trim)
    (event.target as HTMLTextAreaElement).value = value.trim()

  emitFormChange()
  emit('change', event)
}

function onBlur(event: FocusEvent) {
  emitFormBlur()
  emit('blur', event)
}

function autoFocus() {
  if (props.autofocus)
    textareaRef.value?.focus()
}

function autoResize() {
  if (!props.autoresize || !textareaRef.value)
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
  const newRows = (scrollHeight - padding) / lineHeight

  if (newRows > props.rows)
    textareaRef.value.rows = props.maxRows ? Math.min(newRows, props.maxRows) : newRows

  textareaRef.value.style.overflow = overflow
}

watch(modelValue, () => nextTick(autoResize))

onMounted(() => {
  setTimeout(() => autoFocus(), props.autofocusDelay)
  setTimeout(() => autoResize(), props.autoresizeDelay)
})

defineExpose({
  textareaRef,
})
</script>

<template>
  <Primitive :as="props.as" :class="ui.root({ class: [props.ui?.root, props.class] })" data-part="root">
    <span v-if="isLeading || props.avatar || !!slots.leading" :class="ui.leading({ class: props.ui?.leading })" data-part="leading">
      <slot name="leading" :ui="ui">
        <Icon
          v-if="isLeading && leadingIconName"
          :name="leadingIconName"
          :class="ui.leadingIcon({ class: props.ui?.leadingIcon })"
          data-part="leadingIcon"
        />
        <Avatar
          v-else-if="props.avatar"
          :size="((props.ui?.leadingAvatarSize || ui.leadingAvatarSize()) as AvatarProps['size'])"
          v-bind="props.avatar"
          :class="ui.leadingAvatar({ class: props.ui?.leadingAvatar })"
          data-part="leadingAvatar"
        />
      </slot>
    </span>

    <textarea
      ref="textareaRef"
      :value="modelValue"
      :rows="props.rows"
      :placeholder="props.placeholder"
      :required="props.required"
      v-bind="{ id, name, disabled, ...$attrs, ...ariaAttrs }"
      :class="ui.base({ class: props.ui?.base })"
      data-part="base"
      @input="onInput"
      @blur="onBlur"
      @change="onChange"
      @focus="emitFormFocus"
    ></textarea>

    <slot :ui="ui"></slot>

    <span v-if="isTrailing || !!slots.trailing" :class="ui.trailing({ class: props.ui?.trailing })" data-part="trailing">
      <slot name="trailing" :ui="ui">
        <Icon
          v-if="trailingIconName"
          :name="trailingIconName"
          :class="ui.trailingIcon({ class: props.ui?.trailingIcon })"
          data-part="trailingIcon"
        />
      </slot>
    </span>
  </Primitive>
</template>
