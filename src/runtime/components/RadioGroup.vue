<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { RadioGroupItem, RadioGroupRootProps } from 'reka-ui'
import theme from '#build/ui/radio-group'
import type { ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'
import type { AcceptableValue, GetItemKeys, GetModelValue, MaybeArray, StaticSlot } from '../types/utils'

export interface RadioGroupEmits {
  'update:modelValue': [payload: string]
  'change': [payload: Event]
}

export type RadioGroupValue = AcceptableValue
export type RadioGroupItem = RadioGroupValue | {
  label?: string
  description?: string
  disabled?: boolean
  value?: RadioGroupValue
  class?: ComponentBaseProps['class']
  ui?: Pick<ComponentUIProps<typeof theme>, 'item' | 'container' | 'base' | 'indicator' | 'wrapper' | 'label' | 'description'>
  [key: string]: any
}

type NormalizeItem<T extends RadioGroupItem> = Exclude<T & { id: string, ui?: Pick<ComponentUIProps<typeof theme>, 'item' | 'container' | 'base' | 'indicator' | 'wrapper' | 'label' | 'description'> }, RadioGroupValue>

type SlotProps<T extends RadioGroupItem> = StaticSlot<{ item: NormalizeItem<T>, modelValue?: RadioGroupValue }>

export interface RadioGroupSlots<T extends RadioGroupItem[] = RadioGroupItem[]> {
  legend: StaticSlot
  label: SlotProps<T[number]>
  description: SlotProps<T[number]>
}

type ThemeVariants = VariantProps<typeof theme>

export interface RadioGroupProps<T extends RadioGroupItem[] = RadioGroupItem[], VK extends GetItemKeys<T> = 'value'> extends ComponentBaseProps, Pick<RadioGroupRootProps, 'disabled' | 'loop' | 'name' | 'required'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: RadioGroupRootProps['as']
  /** @default "list" */
  variant?: ThemeVariants['variant']
  /** @default "md" */
  size?: ThemeVariants['size']
  /** @default "primary" */
  color?: ThemeVariants['color']
  /**
   * Position of the indicator.
   * @default "start"
   */
  indicator?: ThemeVariants['indicator']
  legend?: string
  /**
   * When `options` is an array of objects, select the field to use as the value.
   * @default "value"
   */
  valueKey?: VK
  /**
   * When `options` is an array of objects, select the field to use as the label.
   * @default "label"
   */
  labelKey?: GetItemKeys<T>
  /**
   * When `options` is an array of objects, select the field to use as the description.
   * @default "description"
   */
  descriptionKey?: GetItemKeys<T>
  items?: T
  /** The controlled value of the RadioGroup. Can be bind as `v-model`. */
  modelValue?: GetModelValue<T, VK, false>
  /** The value of the RadioGroup when initially rendered. Use when you do not need to control the state of the RadioGroup. */
  defaultValue?: GetModelValue<T, VK, false>
  /**
   * The orientation the radio buttons are laid out.
   * @default "vertical"
   */
  orientation?: RadioGroupRootProps['orientation']
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script lang="ts" setup generic="T extends RadioGroupItem[], VK extends GetItemKeys<T> = 'value'">
import { reactivePick } from '@vueuse/core'
import { Label, RadioGroupIndicator, RadioGroupItem as RekaRadioGroupItem, RadioGroupRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, useId } from 'vue'
import { useAppConfig } from '#imports'
import { useFormField } from '../composables/useFormField'
import { get } from '../utils'
import { cv, merge } from '../utils/style'

const props = withDefaults(defineProps<RadioGroupProps<T, VK>>(), {
  valueKey: 'value' as never,
  labelKey: 'label',
  descriptionKey: 'description',
  orientation: 'vertical',
})

const emit = defineEmits<RadioGroupEmits>()
const slots = defineSlots<RadioGroupSlots<T>>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'loop', 'required'), emit)

const { id: _id, name, color, size, disabled, ariaAttrs, emitFormChange, emitFormInput } = useFormField<RadioGroupProps<T>>(props, { bind: false })
const id = _id.value ?? useId()

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.radioGroup))
  return styler({
    ...props,
    color: color.value,
    size: size.value,
    disabled: disabled.value,
  })
})

function normalizeItem(item: RadioGroupItem) {
  if (item === null) {
    return {
      disabled: disabled.value,
      id: `${id}:null`,
      label: undefined,
      description: undefined,
      value: undefined,
      ui: undefined,
      class: undefined,
    }
  }

  if (typeof item === 'boolean' || typeof item === 'string' || typeof item === 'number' || typeof item === 'bigint') {
    return {
      disabled: disabled.value,
      id: `${id}:${item}`,
      label: String(item),
      description: undefined,
      value: item,
      ui: undefined,
      class: undefined,
    }
  }

  const value = get(item, props.valueKey as string)
  const label = get(item, props.labelKey as string)
  const description = get(item, props.descriptionKey as string)

  return {
    disabled: disabled.value,
    ...item,
    id: `${id}:${value}`,
    label,
    value,
    description,
  }
}

const normalizedItems = computed(() => {
  if (!props.items)
    return []

  return props.items.map(normalizeItem)
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
    v-bind="{ id, ...rootProps, name, disabled }"
    :model-value="(props.modelValue as MaybeArray<Exclude<RadioGroupItem, boolean>>)"
    :default-value="(props.defaultValue as MaybeArray<Exclude<RadioGroupItem, boolean>>)"
    :orientation="props.orientation"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    data-part="root"
    @update:model-value="onUpdate"
  >
    <fieldset v-bind="ariaAttrs" :class="ui.fieldset({ class: props.ui?.fieldset })" data-part="fieldset">
      <legend v-if="props.legend || !!slots.legend" :class="ui.legend({ class: props.ui?.legend })" data-part="legend">
        <slot name="legend">
          {{ props.legend }}
        </slot>
      </legend>
      <component
        :is="(!props.variant || props.variant === 'list') ? 'div' : Label"
        v-for="item in normalizedItems"
        :key="item.value"
        :class="ui.item({ class: [props.ui?.item, item.ui?.item, item.class], disabled: item.disabled })"
        data-part="item"
      >
        <div :class="ui.container({ class: [props.ui?.container, item.ui?.container], disabled: item.disabled })" data-part="container">
          <RekaRadioGroupItem
            :id="item.id"
            :value="item.value"
            :disabled="item.disabled"
            :class="ui.base({ class: [props.ui?.base, item.ui?.base], disabled: item.disabled, indicator: props.indicator })"
            data-part="base"
            :data-indicator="props.indicator"
          >
            <RadioGroupIndicator :class="ui.indicator({ class: [props.ui?.indicator, item.ui?.indicator], disabled: item.disabled })" data-part="indicator" force-mount />
          </RekaRadioGroupItem>
        </div>

        <div v-if="(item.label || !!slots.label) || (item.description || !!slots.description)" :class="ui.wrapper({ class: [props.ui?.wrapper, item.ui?.wrapper], disabled: item.disabled })" data-part="wrapper">
          <component :is="(!props.variant || props.variant === 'list') ? Label : 'p'" :for="item.id" :class="ui.label({ class: [props.ui?.label, item.ui?.label], disabled: item.disabled })" data-part="label">
            <slot name="label" :item="(item as NormalizeItem<T[number]>)" :model-value="(modelValue as RadioGroupValue)">
              {{ item.label }}
            </slot>
          </component>
          <p v-if="item.description || !!slots.description" :class="ui.description({ class: [props.ui?.description, item.ui?.description], disabled: item.disabled })" data-part="description">
            <slot name="description" :item="(item as NormalizeItem<T[number]>)" :model-value="(modelValue as RadioGroupValue)">
              {{ item.description }}
            </slot>
          </p>
        </div>
      </component>
    </fieldset>
  </RadioGroupRoot>
</template>
