<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { AcceptableValue, PrimitiveProps, RadioGroupRootProps } from 'reka-ui'
import type { radioGroup } from '../theme'
import type { ComponentAttrs } from '../types'

type RadioGroupVariants = VariantProps<typeof radioGroup>

export interface RadioOption {
  label?: string
  description?: string
  disabled?: boolean
  value?: string
}

export interface RadioGroupProps<T> extends ComponentAttrs<typeof radioGroup>, Pick<RadioGroupRootProps, 'defaultValue' | 'disabled' | 'loop' | 'modelValue' | 'name' | 'required'> {
  as?: PrimitiveProps['as']
  legend?: string
  /**
   * When `options` is an array of objects, select the field to use as the value.
   * @default 'value'
   */
  valueKey?: string
  /**
   * When `options` is an array of objects, select the field to use as the label.
   * @default 'label'
   */
  labelKey?: string
  /**
   * When `options` is an array of objects, select the field to use as the description.
   * @default 'description'
   */
  descriptionKey?: string
  options?: T[]
  size?: RadioGroupVariants['size']
  /**
   * The orientation the radio buttons are laid out.
   * @default 'vertical'
   */
  orientation?: RadioGroupRootProps['orientation']
}

export interface RadioGroupEmits {
  (event: 'update:modelValue', payload: string): void
  (event: 'change', payload: Event): void
}

type SlotProps<T> = (props: { item: NormalizeItem<T>, modelValue?: AcceptableValue }) => any

export interface RadioGroupSlots<T> {
  legend?: (props?: {}) => any
  label?: SlotProps<T>
  description?: SlotProps<T>
}

type NormalizeItem<T> = { id: string } & (
  T extends RadioOption
    ? T
    : {
        id: string
        label: string
        value: any
        description: string
        disabled: false
      }
    )
</script>

<script lang="ts" setup generic="T extends RadioOption | AcceptableValue">
import { reactivePick } from '@vueuse/core'
import { Label, RadioGroupIndicator, RadioGroupItem, RadioGroupRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, useId } from 'vue'
import { useTheme } from '../composables'
import { get } from '../utils'

const props = withDefaults(defineProps<RadioGroupProps<T>>(), {
  size: 'md',
  valueKey: 'value',
  labelKey: 'label',
  descriptionKey: 'description',
  orientation: 'vertical',
})

const emit = defineEmits<RadioGroupEmits>()
const slots = defineSlots<RadioGroupSlots<T>>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'modelValue', 'defaultValue', 'orientation', 'loop', 'required'), emit)
const id = useId()

const { theme, createStyler } = useTheme()
const style = computed(() => {
  const styler = createStyler(theme.value.radioGroup)
  return styler(props)
})

function normalizeItem(item: any): NormalizeItem<T> {
  if (['string', 'number', 'boolean'].includes(typeof item)) {
    return {
      id: `${id}:${item}`,
      value: item,
      label: item,
      description: '',
    } as any
  }

  const value = get(item, props.valueKey)
  const label = get(item, props.labelKey)
  const description = get(item, props.descriptionKey)

  return {
    ...item,
    value,
    label,
    description,
    id: `${id}:${value}`,
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
}
</script>

<template>
  <RadioGroupRoot
    :id="id"
    v-slot="{ modelValue }"
    v-bind="rootProps"
    :name="props.name"
    :disabled="props.disabled"
    :class="style.root({ class: [props.class, props.ui?.root] })"
    @update:model-value="onUpdate"
  >
    <fieldset :class="style.fieldset({ class: props.ui?.fieldset })">
      <legend v-if="props.legend || slots.legend" :class="style.legend({ class: props.ui?.legend })">
        <slot name="legend">
          {{ props.legend }}
        </slot>
      </legend>
      <div v-for="item in normalizedItems" :key="item.value" :class="style.item({ class: props.ui?.item })">
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
            <slot name="label" :item="item" :model-value="modelValue">{{ item.label }}</slot>
          </Label>
          <p v-if="item.description || slots.description" :class="style.description({ class: props.ui?.description })">
            <slot name="description" :item="item" :model-value="modelValue">
              {{ item.description }}
            </slot>
          </p>
        </div>
      </div>
    </fieldset>
  </RadioGroupRoot>
</template>
