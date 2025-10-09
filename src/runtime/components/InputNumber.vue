<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { NumberFieldRootProps } from 'reka-ui'
import theme from '#build/ui/input-number'
import type { ButtonProps, ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'

export interface InputNumberEmits {
  'update:modelValue': [payload: number]
  'blur': [event: FocusEvent]
  'change': [payload: Event]
}

export interface InputNumberSlots {
  increment?: (props?: {}) => any
  decrement?: (props?: {}) => any
}

type ThemeVariants = VariantProps<typeof theme>

export interface InputNumberProps extends ComponentBaseProps, Pick<NumberFieldRootProps, 'as' | 'modelValue' | 'defaultValue' | 'min' | 'max' | 'step' | 'disabled' | 'required' | 'id' | 'name' | 'formatOptions'> {
  /** The placeholder text when the input is empty. */
  placeholder?: string
  variant?: ThemeVariants['variant']
  color?: ThemeVariants['color']
  size?: ThemeVariants['size']
  /** Highlight the ring color like a focus state. */
  highlight?: boolean
  /**
   * The orientation of the input menu.
   * @default "horizontal"
   */
  orientation?: ThemeVariants['orientation']
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
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput, NumberFieldRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, onMounted, ref } from 'vue'
import { useAppConfig } from '#imports'
import { useFormField } from '../composables/useFormField'
import { useLocale } from '../composables/useLocale'
import { cv, merge } from '../utils/style'
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
const { id, name, size, color, highlight, disabled, ariaAttrs, emitFormBlur, emitFormFocus, emitFormInput, emitFormChange } = useFormField<InputNumberProps>(props)

const appConfig = useAppConfig() as RuntimeAppConfig
const style = computed(() => {
  const ui = cv(merge(theme, appConfig.ui.inputNumber))
  return ui({
    ...props,
    size: size.value,
    color: color.value,
    highlight: highlight.value,
  })
})

const incrementIcon = computed(() => props.incrementIcon || (props.orientation === 'horizontal' ? appConfig.ui.icons.plus : appConfig.ui.icons.chevronUp))
const decrementIcon = computed(() => props.decrementIcon || (props.orientation === 'horizontal' ? appConfig.ui.icons.minus : appConfig.ui.icons.chevronDown))

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
    :locale="locale"
    :aria-disabled="disabled ? true : undefined"
    :class="style.root({ class: [props.class, props.ui?.root] })"
    :data-part="$attrs['data-part'] ?? 'root'"
    @update:model-value="onUpdate"
  >
    <NumberFieldInput
      v-bind="{ ...$attrs, ...ariaAttrs }"
      ref="inputRef"
      :placeholder="props.placeholder"
      :required="props.required"
      :class="style.base({ class: props.ui?.base })"
      data-part="base"
      @blur="onBlur"
      @focus="emitFormFocus"
    />

    <div :class="style.increment({ class: props.ui?.increment })" data-part="increment">
      <NumberFieldIncrement as-child :disabled="disabled">
        <slot name="increment">
          <Button
            :icon="incrementIcon"
            :size="props.size"
            :color="color"
            variant="link"
            :aria-label="t('inputNumber.increment')"
            v-bind="typeof props.increment === 'object' ? props.increment : undefined"
          />
        </slot>
      </NumberFieldIncrement>
    </div>

    <div :class="style.decrement({ class: props.ui?.decrement })" data-part="decrement">
      <NumberFieldDecrement as-child :disabled="disabled">
        <slot name="decrement">
          <Button
            :icon="decrementIcon"
            :size="props.size"
            :color="color"
            variant="link"
            :aria-label="t('inputNumber.decrement')"
            v-bind="typeof props.decrement === 'object' ? props.decrement : undefined"
          />
        </slot>
      </NumberFieldDecrement>
    </div>
  </NumberFieldRoot>
</template>
