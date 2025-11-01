<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import type { InputHTMLAttributes } from 'vue'
import theme from '#build/ui/input'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { AvatarProps, ComponentBaseProps, ComponentStyler, ComponentUIProps, RuntimeAppConfig } from '../types'
import type { ModelModifiers } from '../types/input'
import type { AcceptableValue, MaybeNull, Nullable, StaticSlot } from '../types/utils'

export type InputValue = AcceptableValue

type ThemeVariants = VariantProps<typeof theme>

export interface InputProps<T extends InputValue = InputValue> extends ComponentBaseProps, UseComponentIconsProps {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  id?: string
  name?: string
  type?: InputHTMLAttributes['type']
  /** The placeholder text when the input is empty. */
  placeholder?: string
  /** @default "primary" */
  color?: ThemeVariants['color']
  /** @default "md" */
  size?: ThemeVariants['size']
  /** @default "outline" */
  variant?: ThemeVariants['variant']
  loading?: boolean
  /** Highlight the ring color like a focus state. */
  highlight?: boolean
  required?: boolean
  autocomplete?: InputHTMLAttributes['autocomplete']
  autofocus?: boolean
  autofocusDelay?: number
  disabled?: boolean
  defaultValue?: T
  modelValue?: T
  modelModifiers?: ModelModifiers
  ui?: ComponentUIProps<typeof theme>
}

export interface InputEmits<T extends InputValue> {
  'update:modelValue': [value: T]
  'blur': [event: FocusEvent]
  'change': [event: Event]
}

export interface InputSlots {
  leading: StaticSlot<{ ui: ComponentStyler<typeof theme> }>
  default: StaticSlot<{ ui: ComponentStyler<typeof theme> }>
  trailing: StaticSlot<{ ui: ComponentStyler<typeof theme> }>
}
</script>

<script setup lang="ts" generic="T extends InputValue">
import { useVModel } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed, onMounted, ref } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useFieldGroup } from '../composables/useFieldGroup'
import { useFormField } from '../composables/useFormField'
import { looseToNumber } from '../utils'
import { cv, merge } from '../utils/style'
import Avatar from './Avatar.vue'
import Icon from './Icon.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<InputProps<T>>(), {
  type: 'text',
  autocomplete: 'off',
  autofocusDelay: 0,
})

const emit = defineEmits<InputEmits<T>>()
const slots = defineSlots<InputSlots>()

const modelValue = useVModel<InputProps<T>, 'modelValue', 'update:modelValue'>(props, 'modelValue', emit, { defaultValue: props.defaultValue })

const { id, name, size: formFieldSize, color, highlight, disabled, ariaAttrs, emitFormBlur, emitFormInput, emitFormChange, emitFormFocus } = useFormField<InputProps>(props, { deferInputValidation: true })
const { size: fieldGroupSize, orientation } = useFieldGroup(props)
const { isLeading, leadingIconName, isTrailing, trailingIconName } = useComponentIcons(props)

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.input))

  return styler({
    ...props,
    type: props.type as ThemeVariants['type'],
    color: color.value,
    size: fieldGroupSize.value || formFieldSize.value,
    highlight: highlight.value,
    fieldGroup: orientation.value,
    leading: isLeading.value || !!props.avatar || !!slots.leading,
    trailing: isTrailing.value || !!slots.trailing,
  })
})

const inputRef = ref<MaybeNull<HTMLInputElement>>(null)

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
    inputRef.value?.focus()
}

onMounted(() => {
  setTimeout(() => autoFocus(), props.autofocusDelay)
})

defineExpose({
  inputRef,
})
</script>

<template>
  <Primitive :as="as" :class="ui.root({ class: [props.ui?.root, props.class] })" data-part="root">
    <span v-if="isLeading || !!props.avatar || !!slots.leading" :class="ui.leading({ class: props.ui?.leading })" data-part="leading">
      <slot name="leading" :ui="ui">
        <Icon
          v-if="isLeading && leadingIconName"
          :name="leadingIconName"
          :class="ui.leadingIcon({ class: props.ui?.leadingIcon })"
          data-part="leading-icon"
        />
        <Avatar
          v-else-if="props.avatar"
          :size="((props.ui?.leadingAvatarSize || ui.leadingAvatarSize()) as AvatarProps['size'])"
          v-bind="props.avatar"
          :class="ui.leadingAvatar({ class: props.ui?.leadingAvatar })"
          data-part="leading-avatar"
        />
      </slot>
    </span>

    <input
      ref="inputRef"
      :type="props.type"
      :value="modelValue"
      :placeholder="props.placeholder"
      :required="props.required"
      :autocomplete="props.autocomplete"
      v-bind="{ id, name, disabled, ...$attrs, ...ariaAttrs }"
      :class="ui.base({ class: props.ui?.base })"
      data-part="base"
      @input="onInput"
      @blur="onBlur"
      @change="onChange"
      @focus="emitFormFocus"
    />

    <slot :ui="ui"></slot>

    <span v-if="isTrailing || slots.trailing" :class="ui.trailing({ class: props.ui?.trailing })" data-part="trailing">
      <slot name="trailing" :ui="ui">
        <Icon
          v-if="trailingIconName"
          :name="trailingIconName"
          :class="ui.trailingIcon({ class: props.ui?.trailingIcon })"
          data-part="trailing-icon"
        />
      </slot>
    </span>
  </Primitive>
</template>
