<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { NumberFieldRootProps } from 'reka-ui'
import type { inputNumber } from '../theme'
import type { ButtonProps, ComponentAttrs } from '../types'

export interface InputNumberEmits {
  'update:modelValue': [payload: number]
  'blur': [event: FocusEvent]
  'change': [payload: Event]
}

export interface InputNumberSlots {
  increment?: (props?: {}) => any
  decrement?: (props?: {}) => any
}

type InputNumberVariants = VariantProps<typeof inputNumber>

export interface InputNumberProps extends ComponentAttrs<typeof inputNumber>, Pick<NumberFieldRootProps, 'as' | 'modelValue' | 'defaultValue' | 'min' | 'max' | 'step' | 'disabled' | 'required' | 'id' | 'name' | 'formatOptions'> {
  /** The placeholder text when the input is empty. */
  placeholder?: string
  variant?: InputNumberVariants['variant']
  size?: InputNumberVariants['size']
  underline?: boolean
  /** Highlight the ring color like a focus state. */
  highlight?: boolean
  /**
   * The orientation of the input menu.
   * @default "horizontal"
   */
  orientation?: InputNumberVariants['orientation']
  /**
   * Configure the increment button. The `color` and `size` are inherited.
   * @default { variant: 'link' }
   */
  increment?: ButtonProps
  /**
   * The icon displayed to increment the value.
   * @default app.icons.plus
   */
  incrementIcon?: string
  /**
   * Configure the decrement button. The `color` and `size` are inherited.
   * @default { variant: 'link' }
   */
  decrement?: ButtonProps
  /**
   * The icon displayed to decrement the value.
   * @default app.icons.minus
   */
  decrementIcon?: string
  autofocus?: boolean
  autofocusDelay?: number
  /**
   * The locale to use for formatting and parsing numbers.
   */
  locale?: string
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput, NumberFieldRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, onMounted, ref } from 'vue'
import { useFormItem } from '../composables/useFormItem'
import { useLocale } from '../composables/useLocale'
import { useTheme } from '../composables/useTheme'
import Button from './Button.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<InputNumberProps>(), {
  orientation: 'horizontal',
})

const emit = defineEmits<InputNumberEmits>()
defineSlots<InputNumberSlots>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'modelValue', 'defaultValue', 'min', 'max', 'step', 'formatOptions'), emit)

const inputRef = ref<InstanceType<typeof NumberFieldInput> | null>(null)

const { t, code: codeLocale } = useLocale()
const locale = computed(() => props.locale || codeLocale.value)
const { id, name, size, highlight, disabled, ariaAttrs, emitFormBlur, emitFormFocus, emitFormInput, emitFormChange } = useFormItem<InputNumberProps>(props)
const { theme, generateStyle } = useTheme()
const incrementIcon = computed(() => props.incrementIcon || (props.orientation === 'horizontal' ? theme.value.app.icons.plus : theme.value.app.icons.chevronUp))
const decrementIcon = computed(() => props.decrementIcon || (props.orientation === 'horizontal' ? theme.value.app.icons.minus : theme.value.app.icons.chevronDown))

const style = computed(() => generateStyle('inputNumber', {
  ...props,
  size: size.value,
  highlight: highlight.value,
}))

onMounted(() => {
  setTimeout(() => {
    autoFocus()
  }, props.autofocusDelay)
})

defineExpose({
  inputRef,
})

function autoFocus() {
  if (props.autofocus)
    inputRef.value?.$el?.focus()
}

function onUpdate(value: number) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emit('change', event)
  emitFormChange()
  emitFormInput()
}

function onBlur(event: FocusEvent) {
  emit('blur', event)
  emitFormBlur()
}
</script>

<template>
  <NumberFieldRoot
    v-bind="{ ...rootProps, id, name, disabled }"
    :class="style.base({ class: [props.class, props.ui?.base] })"
    :locale="locale"
    :aria-disabled="disabled ? true : undefined"
    @update:model-value="onUpdate"
  >
    <NumberFieldInput
      v-bind="{ ...$attrs, ...ariaAttrs }"
      ref="inputRef"
      :placeholder="props.placeholder"
      :required="props.required"
      :class="style.input({ class: props.ui?.input })"
      @blur="onBlur"
      @focus="emitFormFocus"
    />

    <div :class="style.increment({ class: props.ui?.increment })">
      <NumberFieldIncrement as-child :disabled="disabled">
        <slot name="increment">
          <Button
            :icon="incrementIcon"
            :size="props.size"
            variant="link"
            :aria-label="t('inputNumber.increment')"
            v-bind="typeof props.increment === 'object' ? props.increment : undefined"
          />
        </slot>
      </NumberFieldIncrement>
    </div>

    <div :class="style.decrement({ class: props.ui?.decrement })">
      <NumberFieldDecrement as-child :disabled="disabled">
        <slot name="decrement">
          <Button
            :icon="decrementIcon"
            :size="props.size"
            variant="link"
            :aria-label="t('inputNumber.decrement')"
            v-bind="typeof props.decrement === 'object' ? props.decrement : undefined"
          />
        </slot>
      </NumberFieldDecrement>
    </div>
  </NumberFieldRoot>
</template>
