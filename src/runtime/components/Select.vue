<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { SelectArrowProps, SelectContentEmits, SelectContentProps, SelectRootEmits, SelectRootProps } from 'reka-ui'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { select } from '../theme'
import type { AcceptableValue, ArrayOrNested, ComponentAttrs, EmitsToProps, GetItemKeys, GetItemValue, GetModelValue, GetModelValueEmits, MaybeArray, NestedItem } from '../types'

interface SelectItemBase {
  label?: string
  icon?: string
  /**
   * The option type.
   * @default "option"
   */
  type?: 'label' | 'separator' | 'option'
  value?: AcceptableValue
  disabled?: boolean
  [key: string]: any
}

export type SelectItem = SelectItemBase | AcceptableValue | boolean

export type SelectEmits<T extends ArrayOrNested<SelectItem>, VK extends GetItemKeys<T> | undefined, M extends boolean> = Omit<SelectRootEmits, 'update:modelValue'> & {
  change: [payload: Event]
  blur: [payload: FocusEvent]
  focus: [payload: FocusEvent]
} & GetModelValueEmits<T, VK, M>

type SlotProps<T extends SelectItem> = (props: { item: T, index: number }) => any

export interface SelectSlots<
  T extends ArrayOrNested<SelectItem> = ArrayOrNested<SelectItem>,
  VK extends GetItemKeys<T> | undefined = undefined,
  M extends boolean = false,
  I extends NestedItem<T> = NestedItem<T>,
> {
  'leading'?: (props: { modelValue?: GetModelValue<T, VK, M>, open: boolean, ui: ComponentAttrs<typeof select>['ui'] }) => any
  'default'?: (props: { modelValue?: GetModelValue<T, VK, M>, open: boolean }) => any
  'trailing'?: (props: { modelValue?: GetModelValue<T, VK, M>, open: boolean, ui: ComponentAttrs<typeof select>['ui'] }) => any
  'item'?: SlotProps<I>
  'item-leading'?: SlotProps<I>
  'item-label'?: SlotProps<I>
  'item-trailing'?: SlotProps<I>
}

type SelectVariants = VariantProps<typeof select>

export interface SelectProps<
  T extends ArrayOrNested<SelectItem> = ArrayOrNested<SelectItem>,
  VK extends GetItemKeys<T> = 'value',
  M extends boolean = false,
> extends ComponentAttrs<typeof select>, UseComponentIconsProps, Omit<SelectRootProps<T>, 'dir' | 'multiple' | 'modelValue' | 'defaultValue' | 'by'> {
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
  content?: Omit<SelectContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<SelectContentEmits>>
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
  valueKey?: VK
  /**
   * When `options` is an array of objects, select the field to use as the label.
   * @default "label"
   */
  labelKey?: VK
  options?: T
  /** The value of the Select when initially rendered. Use when you do not need to control the state of the Select. */
  defaultValue?: GetModelValue<T, VK, M>
  /** The controlled value of the Select. Can be bind as `v-model`. */
  modelValue?: GetModelValue<T, VK, M>
  /** Whether multiple options can be selected or not. */
  multiple?: M & boolean
  /** Highlight the ring color like a focus state. */
  highlight?: boolean
  underline?: boolean
}
</script>

<script lang="ts" setup generic="T extends ArrayOrNested<SelectItem>, VK extends GetItemKeys<T> = 'value', M extends boolean = false">
import { reactivePick } from '@vueuse/core'
import { defu } from 'defu'
import { SelectArrow, SelectContent, SelectGroup, SelectItem, SelectItemIndicator, SelectItemText, SelectLabel, SelectPortal, SelectRoot, SelectSeparator, SelectTrigger, SelectViewport, useForwardPropsEmits } from 'reka-ui'
import { computed, toRef } from 'vue'
import { useButtonGroup } from '../composables/useButtonGroup'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useFormItem } from '../composables/useFormItem'
import { useTheme } from '../composables/useTheme'
import { compare, get, isArrayOfArray } from '../utils'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SelectProps<T, VK, M>>(), {
  valueKey: 'value' as never,
  labelKey: 'label' as never,
  portal: true,
})

const emit = defineEmits<SelectEmits<T, VK, M>>()
const slots = defineSlots<SelectSlots<T, VK, M>>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'open', 'defaultOpen', 'disabled', 'autocomplete', 'required', 'multiple'), emit)
const contentProps = toRef(() => defu(props.content, { side: 'bottom', sideOffset: 8, collisionPadding: 8, position: 'popper' }) as SelectContentProps)
const arrowProps = toRef(() => props.arrow as SelectArrowProps)

const { id, name, size: formItemSize, highlight, disabled, ariaAttrs, emitFormChange, emitFormInput, emitFormBlur, emitFormFocus } = useFormItem<SelectProps<T, VK, M>>(props)
const { size: buttonGroupSize, orientation } = useButtonGroup(props)

const { theme, generateStyle } = useTheme()
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(toRef(() => defu(props, {
  trailingIcon: theme.value.app.icons.chevronDown,
})))

const style = computed(() => generateStyle('select', {
  ...props,
  groupOrientation: orientation.value,
  size: buttonGroupSize.value || formItemSize.value,
  highlight: highlight.value,
  leading: isLeading.value,
  trailing: isTrailing.value,
}))

const groups = computed<SelectItem[][]>(
  () => props.options?.length
    ? isArrayOfArray(props.options) ? props.options : [props.options]
    : [],
)

const items = computed(() => groups.value.flat() as T[])

function displayValue(value?: MaybeArray<GetItemValue<T, VK>>): string {
  if (props.multiple && Array.isArray(value))
    return value.map((v) => displayValue(v)).filter(Boolean).join(', ')

  const item = items.value.find((item) => compare(typeof item === 'object' ? get(item as Record<string, any>, props.valueKey as string) : item, value))
  return (item != null) && (typeof item === 'object' ? get(item, props.labelKey as string) : String(item))
}

function isSelectItem(item: SelectItem): item is SelectItemBase {
  return typeof item === 'object' && item !== null
}

function onUpdate(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emit('change', event)
  emitFormChange()
  emitFormInput()
}

function onUpdateOpen(value: boolean) {
  if (value) {
    const event = new FocusEvent('focus')
    emit('focus', event)
    emitFormFocus()
  }
  else {
    const event = new FocusEvent('blur')
    emit('blur', event)
    emitFormBlur()
  }
}
</script>

<template>
  <SelectRoot
    v-slot="{ modelValue: innerValue, open }"
    v-bind="rootProps"
    :name="name"
    :autocomplete="props.autocomplete"
    :disabled="disabled"
    :default-value="(props.defaultValue as MaybeArray<AcceptableValue>)"
    :model-value="(props.modelValue as MaybeArray<AcceptableValue>)"
    @update:model-value="onUpdate"
    @update:open="onUpdateOpen"
  >
    <SelectTrigger v-bind="{ ...$attrs, ...ariaAttrs, id }" :class="style.base({ class: [props.class, props.ui?.base] })">
      <span v-if="isLeading || slots.leading" :class="style.leading({ class: props.ui?.leading })">
        <slot name="leading" :model-value="(innerValue as GetModelValue<T, VK, M>)" :open="open" :ui="props.ui">
          <span v-if="isLeading && leadingIconName" :class="style.leadingIcon({ class: [leadingIconName, props.ui?.leadingIcon] })"></span>
        </slot>
      </span>

      <slot :model-value="(innerValue as GetModelValue<T, VK, M>)" :open="open">
        <template v-for="displayedModelValue in [displayValue((innerValue as GetModelValue<T, VK, M>))]" :key="displayedModelValue">
          <span v-if="displayedModelValue" :class="style.value({ class: props.ui?.value })">
            {{ displayedModelValue }}
          </span>
          <span v-else :class="style.placeholder({ class: props.ui?.placeholder })">
            {{ placeholder }}&nbsp;
          </span>
        </template>
      </slot>

      <span v-if="isTrailing || !!slots.trailing" :class="style.trailing({ class: props.ui?.trailing })">
        <slot name="trailing" :model-value="(innerValue as GetModelValue<T, VK, M>)" :open="open" :ui="props.ui">
          <span v-if="trailingIconName" :class="style.trailingIcon({ class: [trailingIconName, props.ui?.trailingIcon] })"></span>
        </slot>
      </span>
    </SelectTrigger>

    <SelectPortal :disabled="!props.portal">
      <SelectContent v-bind="contentProps" :class="style.content({ class: props.ui?.content })">
        <SelectViewport :class="style.viewport({ class: props.ui?.viewport })">
          <SelectGroup v-for="(group, groupIndex) in groups" :key="`group-${groupIndex}`" :class="style.group({ class: props.ui?.group })">
            <template v-for="(item, index) in group" :key="`group-${groupIndex}-${index}`">
              <SelectLabel v-if="isSelectItem(item) && item.type === 'label'" :class="style.label({ class: props.ui?.label })">
                {{ get(item, props.labelKey as string) }}
              </SelectLabel>
              <SelectSeparator v-else-if="isSelectItem(item) && item.type === 'separator'" :class="style.separator({ class: props.ui?.separator })" />

              <SelectItem
                v-else
                :class="style.item({ class: props.ui?.item })"
                :disabled="isSelectItem(item) && item.disabled"
                :value="isSelectItem(item) ? get(item, props.valueKey as string) : item"
              >
                <slot name="item" :item="(item as NestedItem<T>)" :index="index">
                  <slot name="item-leading" :item="(item as NestedItem<T>)" :index="index">
                    <span v-if="isSelectItem(item) && item.icon" :class="style.itemLeadingIcon({ class: [item.icon, props.ui?.itemLeadingIcon] })"></span>
                  </slot>

                  <SelectItemText :class="style.itemLabel({ class: props.ui?.itemLabel })">
                    <slot name="item-label" :item="(item as NestedItem<T>)" :index="index">
                      {{ isSelectItem(item) ? get(item, props.labelKey as string) : item }}
                    </slot>
                  </SelectItemText>

                  <span :class="style.itemTrailing({ class: props.ui?.itemTrailing })">
                    <slot name="item-trailing" :item="(item as NestedItem<T>)" :index="index"></slot>

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
