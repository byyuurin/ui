<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { CheckboxGroupRootEmits, CheckboxGroupRootProps, CheckboxRootProps } from 'reka-ui'
import theme from '#build/ui/checkbox-group'
import type { CheckboxProps, ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'
import type { AcceptableValue, GetItemKeys, GetModelValue, StaticSlot } from '../types/utils'

type ThemeVariants = VariantProps<typeof theme>

export type CheckboxGroupValue = AcceptableValue

interface CheckboxGroupItemBase {
  label?: string
  description?: string
  disabled?: boolean
  value?: AcceptableValue
  class?: ComponentBaseProps['class']
  ui?: Pick<ComponentUIProps<typeof theme>, 'item'> & Omit<Required<CheckboxProps>['ui'], 'root'>
}

export type CheckboxGroupItem = CheckboxGroupValue | (CheckboxGroupItemBase & { [key: string]: any })

export interface CheckboxGroupProps< T extends CheckboxGroupItem[] = CheckboxGroupItem[], VK extends GetItemKeys<T> = 'value'> extends ComponentBaseProps, Pick<CheckboxGroupRootProps, 'disabled' | 'loop' | 'name' | 'required'>, Pick<CheckboxProps, 'color' | 'indicator' | 'icon'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: CheckboxRootProps['as']
  legend?: string
  /**
   * When `items` is an array of objects, select the field to use as the value.
   * @default "value"
   */
  valueKey?: VK
  /**
   * When `items` is an array of objects, select the field to use as the label.
   * @default "label"
   */
  labelKey?: GetItemKeys<T>
  /**
   * When `items` is an array of objects, select the field to use as the description.
   * @default "description"
   */
  descriptionKey?: GetItemKeys<T>
  items?: T
  /** The controlled value of the CheckboxGroup. Can be bind as `v-model`. */
  modelValue?: GetModelValue<T, VK, true>
  /** The value of the CheckboxGroup when initially rendered. Use when you do not need to control the state of the CheckboxGroup. */
  defaultValue?: GetModelValue<T, VK, true>
  /** @default "md" */
  size?: ThemeVariants['size']
  /** @default "list" */
  variant?: ThemeVariants['variant']
  /**
   * The orientation the checkbox buttons are laid out.
   * @default "vertical"
   */
  orientation?: ThemeVariants['orientation']
  ui?: ComponentUIProps<typeof theme>
}

export type CheckboxGroupEmits<T extends CheckboxGroupItem[] = CheckboxGroupItem[]> = CheckboxGroupRootEmits<T[number]> & {
  change: [event: Event]
}

export interface CheckboxGroupSlots<T extends CheckboxGroupItem[] = CheckboxGroupItem[]> {
  legend: StaticSlot
  label: StaticSlot<{ item: T[number] & { id: string } }>
  description: StaticSlot<{ item: T[number] & { id: string } }>
}
</script>

<script setup lang="ts" generic="T extends CheckboxGroupItem[], VK extends GetItemKeys<T> = 'value'">
import { reactivePick } from '@vueuse/core'
import { CheckboxGroupRoot, useForwardProps, useForwardPropsEmits } from 'reka-ui'
import { computed, useId } from 'vue'
import { useAppConfig } from '#imports'
import { useFormField } from '../composables/useFormField'
import { get, omit, pick } from '../utils'
import { cv, merge } from '../utils/style'
import Checkbox from './Checkbox.vue'

const props = withDefaults(defineProps<CheckboxGroupProps<T, VK>>(), {
  labelKey: 'label',
  descriptionKey: 'description',
  valueKey: 'value' as never,
  orientation: 'vertical',
})

const emit = defineEmits<CheckboxGroupEmits<T>>()
const slots = defineSlots<CheckboxGroupSlots>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'modelValue', 'defaultValue', 'orientation', 'loop', 'required'), emit)
const checkboxProps = useForwardProps(reactivePick(props, 'indicator', 'icon'))
const getProxySlots = () => omit(slots, ['legend'])

const { id: _id, name, color, size, disabled, ariaAttrs, emitFormChange, emitFormInput } = useFormField<CheckboxGroupProps<T>>(props, { bind: false })
const id = _id.value ?? useId()

// TODO: item type
function normalizeItem(item: CheckboxGroupItem): any {
  const itemBase: CheckboxGroupItemBase = {
    disabled: disabled.value,
    label: undefined,
    description: undefined,
    value: undefined,
    ui: undefined,
    class: undefined,
  }

  if (typeof item === 'object' && item === null) {
    return {
      ...itemBase,
      id: `${id}:null`,
      value: null,
    }
  }

  if (typeof item === 'boolean' || typeof item === 'string' || typeof item === 'number' || typeof item === 'bigint') {
    return {
      ...itemBase,
      id: `${id}:${item}`,
      label: String(item),
      value: item,
    }
  }

  const value = get(item, props.valueKey as string)
  const label = get(item, props.labelKey as string)
  const description = get(item, props.descriptionKey as string)

  return {
    ...itemBase,
    ...item,
    value,
    label,
    description,
    id: `${id}:${value}`,
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

const appConfig = useAppConfig() as RuntimeAppConfig

const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.checkboxGroup))

  return styler({
    ...pick(props, ['required', 'orientation', 'variant']),
    size: size.value,
    color: color.value,
    disabled: disabled.value,
  })
})
</script>

<template>
  <CheckboxGroupRoot
    v-bind="{ ...rootProps, id, name, disabled }"
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

      <Checkbox
        v-for="item in normalizedItems"
        :key="item.id"
        v-bind="{ ...item, ...checkboxProps, color, size, name }"
        :variant="props.variant"
        :disabled="item.disabled || disabled"
        :ui="{ ...(props.ui ? omit(props.ui, ['root']) : undefined), ...(item.ui || {}) }"
        :class="ui.item({ disabled: item.disabled || disabled, class: [props.ui?.item, item.ui?.item, item.class] })"
        data-part="item"
      >
        <template v-for="(_, name) in getProxySlots()" #[name]>
          <slot :name="name" :item="item"></slot>
        </template>
      </Checkbox>
    </fieldset>
  </CheckboxGroupRoot>
</template>
