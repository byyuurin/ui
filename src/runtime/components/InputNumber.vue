<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { NumberFieldRootProps } from 'reka-ui'
import theme from '#build/ui/input-number'
import type { ButtonProps, ComponentBaseProps, ComponentUIProps, IconProps, RuntimeAppConfig } from '../types'
import type { ModelModifiers } from '../types/input'
import type { StaticSlot } from '../types/utils'

type ThemeVariants = VariantProps<typeof theme>

export interface InputNumberProps extends ComponentBaseProps, Pick<NumberFieldRootProps, 'modelValue' | 'defaultValue' | 'min' | 'max' | 'step' | 'stepSnapping' | 'disabled' | 'required' | 'id' | 'name' | 'formatOptions' | 'disableWheelChange' | 'invertWheelChange' | 'readonly'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: NumberFieldRootProps['as']
  /** The placeholder text when the input is empty. */
  placeholder?: string
  /** @default "outline" */
  variant?: ThemeVariants['variant']
  /** @default "primary" */
  color?: ThemeVariants['color']
  /** @default "md" */
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
  increment?: boolean | ButtonProps
  /**
   * The icon displayed to increment the value.
   * @default app.icons.plus
   */
  incrementIcon?: IconProps['name']
  /** Disable the increment button. */
  incrementDisabled?: boolean
  /**
   * Configure the decrement button. The `color` and `size` are inherited.
   * @default { variant: 'link' }
   */
  decrement?: boolean | ButtonProps
  /**
   * The icon displayed to decrement the value.
   * @default app.icons.minus
   */
  decrementIcon?: IconProps['name']
  /** Disable the decrement button. */
  decrementDisabled?: boolean
  autofocus?: boolean
  autofocusDelay?: number
  modelModifiers?: Pick<ModelModifiers, 'optional'>
  /**
   * The locale to use for formatting and parsing numbers.
   * @default App.locale.code
   */
  locale?: string
  ui?: ComponentUIProps<typeof theme>
}

export interface InputNumberEmits {
  'update:modelValue': [value: number]
  'blur': [event: FocusEvent]
  'change': [event: Event]
}

export interface InputNumberSlots {
  increment: StaticSlot
  decrement: StaticSlot
}
</script>

<script setup lang="ts">
import { reactivePick, useVModel } from '@vueuse/core'
import { NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput, NumberFieldRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, onMounted, ref } from 'vue'
import { useAppConfig } from '#imports'
import { useFieldGroup } from '../composables/useFieldGroup'
import { useFormField } from '../composables/useFormField'
import { useLocale } from '../composables/useLocale'
import { cv, merge } from '../utils/style'
import Button from './Button.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<InputNumberProps>(), {
  orientation: 'horizontal',
  increment: true,
  decrement: true,
})

const emit = defineEmits<InputNumberEmits>()
defineSlots<InputNumberSlots>()

const modelValue = useVModel(props, 'modelValue', emit, { defaultValue: props.defaultValue })

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'defaultValue', 'min', 'max', 'step', 'stepSnapping', 'formatOptions', 'disableWheelChange', 'invertWheelChange', 'readonly'), emit)

const { t, code: codeLocale } = useLocale()
const locale = computed(() => props.locale || codeLocale.value)
const { id, name, size: formFieldSize, color, highlight, disabled, ariaAttrs, emitFormBlur, emitFormFocus, emitFormInput, emitFormChange } = useFormField<InputNumberProps>(props)
const { size: fieldGroupSize, orientation } = useFieldGroup(props)

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.inputNumber))
  return styler({
    ...props,
    size: fieldGroupSize.value || formFieldSize.value,
    color: color.value,
    highlight: highlight.value,
    fieldGroup: orientation.value,
    increment: props.orientation === 'vertical' ? (!!props.increment || !!props.decrement) : !!props.increment,
    decrement: props.orientation === 'vertical' ? false : !!props.decrement,
  })
})

const incrementIcon = computed(() => props.incrementIcon || (props.orientation === 'horizontal' ? appConfig.ui.icons.plus : appConfig.ui.icons.chevronUp))
const decrementIcon = computed(() => props.decrementIcon || (props.orientation === 'horizontal' ? appConfig.ui.icons.minus : appConfig.ui.icons.chevronDown))

const inputRef = ref<InstanceType<typeof NumberFieldInput> | null>(null)

function onUpdate(value: number | undefined) {
  if (props.modelModifiers?.optional)
    value ??= undefined

  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emit('change', event)

  emitFormChange()
  emitFormInput()
}

function onBlur(event: FocusEvent) {
  emitFormBlur()
  emit('blur', event)
}

function autoFocus() {
  if (props.autofocus)
    inputRef.value?.$el?.focus()
}

onMounted(() => {
  setTimeout(() => autoFocus(), props.autofocusDelay)
})

defineExpose({
  inputRef,
})
</script>

<template>
  <NumberFieldRoot
    v-bind="{ ...rootProps, id, name, disabled, locale, modelValue }"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    data-part="root"
    @update:model-value="onUpdate"
  >
    <NumberFieldInput
      v-bind="{ ...$attrs, ...ariaAttrs }"
      ref="inputRef"
      :placeholder="props.placeholder"
      :required="props.required"
      :class="ui.base({ class: props.ui?.base })"
      data-part="base"
      @blur="onBlur"
      @focus="emitFormFocus"
    />

    <div v-if="props.increment" :class="ui.increment({ class: props.ui?.increment })" data-part="increment">
      <NumberFieldIncrement :disabled="disabled || incrementDisabled" as-child>
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

    <div v-if="props.decrement" :class="ui.decrement({ class: props.ui?.decrement })" data-part="decrement">
      <NumberFieldDecrement :disabled="disabled || decrementDisabled" as-child>
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
