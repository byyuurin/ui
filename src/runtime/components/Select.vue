<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { AcceptableValue, SelectArrowProps, SelectContentProps, SelectRootProps } from 'reka-ui'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { select } from '../theme'
import type { ComponentAttrs, MaybeArray, MaybeArrayOfArray, MaybeArrayOfArrayItem, SelectModelValue, SelectOptionKey } from '../types'

export interface SelectEmits<T, V, M extends boolean> {
  (event: 'update:open', value: boolean): void
  (event: 'update:modelValue', payload: SelectModelValue<T, V, M, T extends { value: infer U } ? U : never>): void
  (event: 'change', payload: Event): void
  (event: 'blur', payload: FocusEvent): void
  (event: 'focus', payload: FocusEvent): void
}

type SlotProps<T> = (props: { item: T, index: number }) => any

export interface SelectSlots<T, M extends boolean> {
  leading?: (props: { modelValue?: M extends true ? AcceptableValue[] : AcceptableValue, open: boolean, ui: ComponentAttrs<typeof select>['ui'] }) => any
  default?: (props: { modelValue?: M extends true ? AcceptableValue[] : AcceptableValue, open: boolean }) => any
  trailing?: (props: { modelValue?: M extends true ? AcceptableValue[] : AcceptableValue, open: boolean, ui: ComponentAttrs<typeof select>['ui'] }) => any
  item?: SlotProps<T>
  itemLeading?: SlotProps<T>
  itemLabel?: SlotProps<T>
  itemTrailing?: SlotProps<T>
}

type SelectVariants = VariantProps<typeof select>

export interface SelectOption {
  label?: string
  icon?: string
  /**
   * The option type.
   * @default "option"
   */
  type?: 'label' | 'separator' | 'option'
  value?: string
  disabled?: boolean
}

export type SelectOptionValue = SelectOption | AcceptableValue | boolean

export interface SelectProps<
  T extends MaybeArrayOfArrayItem<I>,
  I extends MaybeArrayOfArray<SelectOptionValue> = MaybeArrayOfArray<SelectOptionValue>,
  V extends SelectOptionKey<T> | undefined = undefined,
  M extends boolean = false,
> extends Omit<SelectRootProps<T>, 'dir' | 'multiple' | 'modelValue' | 'defaultValue' | 'by'>, ComponentAttrs<typeof select>, UseComponentIconsProps {
  id?: string
  /** The placeholder text when the select is empty. */
  placeholder?: string
  variant?: SelectVariants['variant']
  size?: SelectVariants['size']
  /**
   * The icon displayed to open the menu.
   * @default app.icons.chevronDown
   */
  trailingIcon?: string
  /**
   * The icon displayed when an item is selected.
   * @default app.icons.check
   */
  selectedIcon?: string
  /**
   * The content of the menu.
   * @default { side: 'bottom', sideOffset: 8, collisionPadding: 8, position: 'popper' }
   */
  content?: Omit<SelectContentProps, 'as' | 'asChild' | 'forceMount'>
  /**
   * Display an arrow alongside the menu.
   * @default false
   */
  arrow?: boolean | Omit<SelectArrowProps, 'as' | 'asChild'>
  /**
   * Render the menu in a portal.
   * @default true
   */
  portal?: boolean
  /**
   * When `options` is an array of objects, select the field to use as the value.
   * @default "value"
   */
  valueKey?: V
  /**
   * When `options` is an array of objects, select the field to use as the label.
   * @default "label"
   */
  labelKey?: V
  options?: I
  /** The value of the Select when initially rendered. Use when you do not need to control the state of the Select. */
  defaultValue?: SelectModelValue<T, V, M, T extends { value: infer U } ? U : never>
  /** The controlled value of the Select. Can be bind as `v-model`. */
  modelValue?: SelectModelValue<T, V, M, T extends { value: infer U } ? U : never>
  /** Whether multiple options can be selected or not. */
  multiple?: M & boolean
  /** Highlight the ring color like a focus state. */
  highlight?: boolean
  underline?: boolean
}
</script>

<script lang="ts" setup generic="T extends MaybeArrayOfArrayItem<I>, I extends MaybeArrayOfArray<SelectOption | AcceptableValue | boolean> = MaybeArrayOfArray<SelectOption | AcceptableValue | boolean>, V extends SelectOptionKey<T> | undefined = undefined, M extends boolean = false">
import { reactivePick } from '@vueuse/core'
import { defu } from 'defu'
import { SelectArrow, SelectContent, SelectGroup, SelectItem, SelectItemIndicator, SelectItemText, SelectLabel, SelectPortal, SelectRoot, SelectSeparator, SelectTrigger, SelectViewport, useForwardPropsEmits } from 'reka-ui'
import { computed, toRef } from 'vue'
import { useButtonGroup } from '../composables/useButtonGroup'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useTheme } from '../composables/useTheme'
import { compare, get } from '../utils'

const props = withDefaults(defineProps<SelectProps<T, I, V, M>>(), {
  variant: 'outline',
  valueKey: 'value' as never,
  labelKey: 'label' as never,
  portal: true,
})

const emit = defineEmits<SelectEmits<T, V, M>>()
const slots = defineSlots<SelectSlots<T, M>>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'open', 'defaultOpen', 'disabled', 'autocomplete', 'required', 'multiple'), emit)
const contentProps = toRef(() => defu(props.content, { side: 'bottom', sideOffset: 8, collisionPadding: 8, position: 'popper' }) as SelectContentProps)
const arrowProps = toRef(() => props.arrow as SelectArrowProps)

const { theme, createStyler } = useTheme()

const { size, orientation } = useButtonGroup(props)
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(toRef(() => defu(props, {
  trailingIcon: theme.value.app.icons.chevronDown,
})))

const groups = computed(() => props.options?.length ? (Array.isArray(props.options[0]) ? props.options : [props.options]) as SelectOption[][] : [])
const items = computed(() => groups.value.flat() as T[])

const style = computed(() => {
  const styler = createStyler(theme.value.select)
  return styler({
    ...props,
    size: size.value,
    groupOrientation: orientation.value,
    leading: isLeading.value,
    trailing: isTrailing.value,
  })
})

function typedItem(item: SelectOption) {
  return item as unknown as T
}

function typedValue<V extends MaybeArray<AcceptableValue>>(value?: V) {
  return value as unknown as M extends true ? AcceptableValue[] : AcceptableValue
}

function typedModelValue(value: any) {
  return value as MaybeArray<AcceptableValue> | undefined
}

function displayValue(value?: MaybeArray<AcceptableValue>): string | undefined {
  if (props.multiple && Array.isArray(value))
    return value.map((v) => displayValue(v)).filter(Boolean).join(', ')

  const item = items.value.find((item) => compare(typeof item === 'object' ? get(item as Record<string, any>, props.valueKey as string) : item, value))
  return item && (typeof item === 'object' ? get(item, props.labelKey as string) : item)
}

function onUpdate(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emit('change', event)
}

function onUpdateOpen(value: boolean) {
  if (value) {
    const event = new FocusEvent('focus')
    emit('focus', event)
  }
  else {
    const event = new FocusEvent('blur')
    emit('blur', event)
  }
}
</script>

<template>
  <SelectRoot
    v-slot="{ modelValue: innerValue, open }"
    :name="props.name"
    v-bind="rootProps"
    :autocomplete="props.autocomplete"
    :disabled="props.disabled"
    :default-value="typedModelValue(props.defaultValue)"
    :model-value="typedModelValue(props.modelValue)"
    @update:model-value="onUpdate"
    @update:open="onUpdateOpen"
  >
    <SelectTrigger :id="props.id" :class="style.base({ class: [props.class, props.ui?.base] })">
      <span v-if="isLeading || slots.leading" :class="style.leading({ class: props.ui?.leading })">
        <slot name="leading" :model-value="typedValue(innerValue)" :open="open" :ui="props.ui">
          <span v-if="isLeading && leadingIconName" :class="style.leadingIcon({ class: [leadingIconName, props.ui?.leadingIcon] })"></span>
        </slot>
      </span>

      <slot :model-value="typedValue(innerValue)" :open="open">
        <template v-for="displayedModelValue in [displayValue(innerValue)]" :key="displayedModelValue">
          <span v-if="displayedModelValue" :class="style.value({ class: props.ui?.value })">
            {{ displayedModelValue }}
          </span>
          <span v-else :class="style.placeholder({ class: props.ui?.placeholder })">
            {{ placeholder }}&nbsp;
          </span>
        </template>
      </slot>

      <span v-if="isTrailing || !!slots.trailing" :class="style.trailing({ class: props.ui?.trailing })">
        <slot name="trailing" :model-value="typedValue(innerValue)" :open="open" :ui="props.ui">
          <span v-if="trailingIconName" :class="style.trailingIcon({ class: [trailingIconName, props.ui?.trailingIcon] })"></span>
        </slot>
      </span>
    </SelectTrigger>

    <SelectPortal :disabled="!props.portal">
      <SelectContent v-bind="contentProps" :class="style.content({ class: props.ui?.content })">
        <SelectViewport :class="style.viewport({ class: props.ui?.viewport })">
          <SelectGroup v-for="(group, groupIndex) in groups" :key="`group-${groupIndex}`" :class="style.group({ class: props.ui?.group })">
            <template v-for="(item, index) in group" :key="`group-${groupIndex}-${index}`">
              <SelectLabel v-if="item.type === 'label'" :class="style.label({ class: props.ui?.label })">
                {{ get(item, props.labelKey as string) }}
              </SelectLabel>
              <SelectSeparator v-else-if="item.type === 'separator'" :class="style.separator({ class: props.ui?.separator })" />

              <SelectItem
                v-else
                :class="style.item({ class: props.ui?.item })"
                :disabled="item.disabled"
                :value="typeof item === 'object' ? get(item, props.valueKey as string) : item"
              >
                <slot name="item" :item="typedItem(item)" :index="index">
                  <slot name="itemLeading" :item="typedItem(item)" :index="index">
                    <span v-if="item.icon" :class="style.itemLeadingIcon({ class: [item.icon, props.ui?.itemLeadingIcon] })"></span>
                  </slot>

                  <SelectItemText :class="style.itemLabel({ class: props.ui?.itemLabel })">
                    <slot name="itemLabel" :item="typedItem(item)" :index="index">
                      {{ typeof item === 'object' ? get(item, props.labelKey as string) : item }}
                    </slot>
                  </SelectItemText>

                  <span :class="style.itemTrailing({ class: props.ui?.itemTrailing })">
                    <slot name="itemTrailing" :item="typedItem(item)" :index="index"></slot>

                    <SelectItemIndicator as-child>
                      <span :class="style.itemTrailingIcon({ class: [props.selectedIcon || theme.app.icons.check, props.ui?.itemTrailingIcon] })"></span>
                    </SelectItemIndicator>
                  </span>
                </slot>
              </SelectItem>
            </template>
          </SelectGroup>
        </SelectViewport>

        <SelectArrow v-if="!!props.arrow" v-bind="arrowProps" :class="style.arrow({ class: props.ui?.arrow })" />
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
