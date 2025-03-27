<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps, RadioGroupRootProps } from 'reka-ui'
import type { radioGroup } from '../theme'
import type { AcceptableValue, ComponentAttrs } from '../types'

export interface RadioGroupEmits {
  'update:modelValue': [payload: string]
  'change': [payload: Event]
}

export type RadioGroupValue = AcceptableValue

export type RadioGroupItem = {
  label?: string
  description?: string
  disabled?: boolean
  value?: RadioGroupValue
  [key: string]: any
} | RadioGroupValue

type SlotProps<T extends RadioGroupItem> = (props: { item: T & { id: string }, modelValue?: RadioGroupValue }) => any

export interface RadioGroupSlots<T extends RadioGroupItem = RadioGroupItem> {
  legend?: any
  label?: SlotProps<T>
  description?: SlotProps<T>
}

type RadioGroupVariants = VariantProps<typeof radioGroup>

export interface RadioGroupProps<T extends RadioGroupItem = RadioGroupItem> extends ComponentAttrs<typeof radioGroup>, Pick<RadioGroupRootProps, 'defaultValue' | 'disabled' | 'loop' | 'modelValue' | 'name' | 'required'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  legend?: string
  /**
   * When `options` is an array of objects, select the field to use as the value.
   * @default "value"
   */
  valueKey?: string
  /**
   * When `options` is an array of objects, select the field to use as the label.
   * @default "label"
   */
  labelKey?: string
  /**
   * When `options` is an array of objects, select the field to use as the description.
   * @default "description"
   */
  descriptionKey?: string
  options?: T[]
  size?: RadioGroupVariants['size']
  /**
   * The orientation the radio buttons are laid out.
   * @default "vertical"
   */
  orientation?: RadioGroupRootProps['orientation']
}
</script>

<script lang="ts" setup generic="T extends RadioGroupItem">
import { reactivePick } from '@vueuse/core'
import { Label, RadioGroupIndicator, RadioGroupItem, RadioGroupRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, useId } from 'vue'
import { useFormItem } from '../composables/useFormItem'
import { useTheme } from '../composables/useTheme'
import { get } from '../utils'

const props = withDefaults(defineProps<RadioGroupProps<T>>(), {
  valueKey: 'value',
  labelKey: 'label',
  descriptionKey: 'description',
  orientation: 'vertical',
})

const emit = defineEmits<RadioGroupEmits>()
const slots = defineSlots<RadioGroupSlots<T>>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'modelValue', 'defaultValue', 'orientation', 'loop', 'required'), emit)

const { id: _id, name, size, disabled, ariaAttrs, emitFormChange, emitFormInput } = useFormItem<RadioGroupProps<T>>(props)
const id = _id.value ?? useId()

const { generateStyle } = useTheme()
const style = computed(() => generateStyle('radioGroup', {
  ...props,
  size: size.value,
  disabled: disabled.value,
}))

function normalizeItem(item: any) {
  if (item === null) {
    return {
      id: `${id}:null`,
      label: undefined,
      value: undefined,
    }
  }

  if (typeof item === 'string' || typeof item === 'number') {
    return {
      id: `${id}:${item}`,
      label: String(item),
      value: item,
      disabled: disabled.value,
    }
  }

  const value = get(item, props.valueKey)
  const label = get(item, props.labelKey)
  const description = get(item, props.descriptionKey)

  return {
    ...item,
    id: `${id}:${value}`,
    label,
    value,
    description,
    disabled: disabled.value || item.disabled,
  }
}

const normalizedItems = computed(() => {
  if (!props.options)
    return []

  return props.options.map(normalizeItem)
})

function onUpdate(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emit('change', event)
  emitFormChange()
  emitFormInput()
}
</script>

<template>
  <RadioGroupRoot
    v-slot="{ modelValue }"
    v-bind="{ ...rootProps, id, name, disabled }"
    :class="style.root({ class: [props.class, props.ui?.root] })"
    @update:model-value="onUpdate"
  >
    <fieldset v-bind="ariaAttrs" :class="style.fieldset({ class: props.ui?.fieldset })">
      <legend v-if="props.legend || slots.legend" :class="style.legend({ class: props.ui?.legend })">
        <slot name="legend">
          {{ props.legend }}
        </slot>
      </legend>
      <div v-for="item in normalizedItems" :key="item.value" :class="style.item({ class: props.ui?.item, disabled: item.disabled })">
        <div :class="style.container({ class: props.ui?.container })">
          <RadioGroupItem
            :id="item.id"
            :value="item.value"
            :disabled="item.disabled"
            :class="style.base({ class: props.ui?.base })"
          >
            <RadioGroupIndicator :class="style.indicator({ class: props.ui?.indicator })" force-mount />
          </RadioGroupItem>
        </div>

        <div :class="style.wrapper({ class: props.ui?.wrapper })">
          <Label :for="item.id" :class="style.label({ class: props.ui?.label })">
            <slot name="label" :item="item" :model-value="(modelValue as RadioGroupValue)">{{ item.label }}</slot>
          </Label>
          <p v-if="item.description || slots.description" :class="style.description({ class: props.ui?.description })">
            <slot name="description" :item="item" :model-value="(modelValue as RadioGroupValue)">
              {{ item.description }}
            </slot>
          </p>
        </div>
      </div>
    </fieldset>
  </RadioGroupRoot>
</template>
