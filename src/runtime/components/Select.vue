<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { SelectArrowProps, SelectContentEmits, SelectContentProps, SelectRootEmits, SelectRootProps } from 'reka-ui'
import theme from '#build/ui/select'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { AvatarProps, ChipProps, ComponentBaseProps, ComponentStyler, ComponentUIProps, IconProps, RuntimeAppConfig } from '../types'
import type { ModelModifiers } from '../types/input'
import type { AcceptableValue, ArrayOrNested, Defined, EmitsToProps, GetItemKeys, GetItemValue, GetModelValue, GetModelValueEmits, MaybeArray, MaybeNull, NestedItem, StaticSlot } from '../types/utils'

export type SelectValue = Exclude<AcceptableValue, boolean>

export type SelectItem = SelectValue | {
  label?: string
  description?: string
  icon?: IconProps['name']
  avatar?: AvatarProps
  chip?: ChipProps
  /**
   * The item type.
   * @default "item"
   */
  type?: 'label' | 'separator' | 'item'
  value?: SelectValue
  disabled?: boolean
  onSelect?: (e: Event) => void
  ui?: Pick<ComponentUIProps<typeof theme>, 'label' | 'separator' | 'item' | 'itemLeadingIcon' | 'itemLeadingAvatarSize' | 'itemLeadingAvatar' | 'itemLeadingChipSize' | 'itemLeadingChip' | 'itemWrapper' | 'itemLabel' | 'itemDescription' | 'itemTrailing' | 'itemTrailingIcon'>
  class?: ComponentBaseProps['class']
  [key: string]: any
}

type ThemeVariants = VariantProps<typeof theme>

export interface SelectProps<
  T extends ArrayOrNested<SelectItem> = ArrayOrNested<SelectItem>,
  VK extends GetItemKeys<T> = 'value',
  M extends boolean = false,
> extends ComponentBaseProps, UseComponentIconsProps, Omit<SelectRootProps<T>, 'dir' | 'multiple' | 'modelValue' | 'defaultValue' | 'by'> {
  id?: string
  /** The placeholder text when the select is empty. */
  placeholder?: string
  /** @default "outline" */
  variant?: ThemeVariants['variant']
  /** @default "md" */
  size?: ThemeVariants['size']
  /** @default "primary" */
  color?: ThemeVariants['color']
  /**
   * The icon displayed to open the menu.
   * @default app.icons.chevronDown
   */
  trailingIcon?: IconProps['name']
  /**
   * The icon displayed when an item is selected.
   * @default app.icons.check
   */
  selectedIcon?: IconProps['name']
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
  portal?: boolean | string | HTMLElement
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
  /** The value of the Select when initially rendered. Use when you do not need to control the state of the Select. */
  defaultValue?: MaybeNull<GetModelValue<T, VK, M>>
  /** The controlled value of the Select. Can be bind as `v-model`. */
  modelValue?: MaybeNull<GetModelValue<T, VK, M>>
  modelModifiers?: Omit<ModelModifiers<GetModelValue<T, VK, M>>, 'lazy'>
  /** Whether multiple options can be selected or not. */
  multiple?: M & boolean
  /** Highlight the ring color like a focus state. */
  highlight?: boolean
  autofocus?: boolean
  autofocusDelay?: number
  ui?: ComponentUIProps<typeof theme>
}

export type SelectEmits<A extends ArrayOrNested<SelectItem>, VK extends GetItemKeys<A> | undefined, M extends boolean> = Omit<SelectRootEmits, 'update:modelValue'> & {
  change: [event: Event]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
} & GetModelValueEmits<A, VK, M>

export interface SelectSlots<
  A extends ArrayOrNested<SelectItem> = ArrayOrNested<SelectItem>,
  VK extends GetItemKeys<A> | undefined = undefined,
  M extends boolean = false,
  T extends NestedItem<A> = NestedItem<A>,
> {
  'leading': StaticSlot<{ modelValue?: MaybeNull<GetModelValue<A, VK, M>>, open: boolean, ui: ComponentStyler<typeof theme> }>
  'default': StaticSlot<{ modelValue?: MaybeNull<GetModelValue<A, VK, M>>, open: boolean, ui: ComponentStyler<typeof theme> }>
  'trailing': StaticSlot<{ modelValue?: MaybeNull<GetModelValue<A, VK, M>>, open: boolean, ui: ComponentStyler<typeof theme> }>
  'item': StaticSlot<{ item: T, index: number, ui: ComponentStyler<typeof theme> }>
  'item-leading': StaticSlot<{ item: T, index: number, ui: ComponentStyler<typeof theme> }>
  'item-label': StaticSlot<{ item: T, index: number }>
  'item-description': StaticSlot<{ item: T, index: number }>
  'item-trailing': StaticSlot<{ item: T, index: number, ui: ComponentStyler<typeof theme> }>
  'content-top': StaticSlot
  'content-bottom': StaticSlot
}
</script>

<script lang="ts" setup generic="T extends ArrayOrNested<SelectItem>, VK extends GetItemKeys<T> = 'value', M extends boolean = false">
import { reactivePick } from '@vueuse/core'
import { defu } from 'defu'
import { SelectArrow, SelectContent, SelectGroup, SelectItem as RekaSelectItem, SelectItemIndicator, SelectItemText, SelectLabel, SelectPortal, SelectRoot, SelectSeparator, SelectTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed, onMounted, shallowRef, toRaw, toRef } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useFieldGroup } from '../composables/useFieldGroup'
import { useFormField } from '../composables/useFormField'
import { usePortal } from '../composables/usePortal'
import { get, getDisplayValue, isArrayOfArray, looseToNumber } from '../utils'
import { cv, merge } from '../utils/style'
import Avatar from './Avatar.vue'
import Chip from './Chip.vue'
import Icon from './Icon.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SelectProps<T, VK, M>>(), {
  valueKey: 'value' as never,
  labelKey: 'label',
  descriptionKey: 'description',
  portal: true,
  autofocusDelay: 0,
})

const emit = defineEmits<SelectEmits<T, VK, M>>()
const slots = defineSlots<SelectSlots<T, VK, M>>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'open', 'defaultOpen', 'disabled', 'autocomplete', 'required', 'multiple'), emit)
const portalProps = usePortal(toRef(() => props.portal))
const contentProps = toRef(() => defu(props.content, { side: 'bottom', sideOffset: 8, collisionPadding: 8, position: 'popper' }) as SelectContentProps)
const arrowProps = toRef(() => props.arrow as SelectArrowProps)

const { id, name, size: formFieldSize, color, highlight, disabled, ariaAttrs, emitFormChange, emitFormInput, emitFormBlur, emitFormFocus } = useFormField<SelectProps<T, VK, M>>(props)
const { size: fieldGroupSize, orientation } = useFieldGroup(props)

const appConfig = useAppConfig() as RuntimeAppConfig

const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(toRef(() => defu(props, {
  trailingIcon: appConfig.ui.icons.chevronDown,
})))

const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.select))
  return styler({
    ...props,
    fieldGroup: orientation.value,
    size: fieldGroupSize.value || formFieldSize.value,
    color: color.value,
    highlight: highlight.value,
    leading: isLeading.value || !!props.avatar || !!slots.leading,
    trailing: isTrailing.value || !!slots.trailing,
  })
})

const groups = computed<SelectItem[][]>(
  () => props.items?.length
    ? isArrayOfArray(props.items) ? props.items : [props.items]
    : [],
)

const items = computed(() => groups.value.flat() as T[])

function displayValue(value?: MaybeArray<GetItemValue<T, VK>>): string | undefined {
  if (props.multiple && Array.isArray(value)) {
    const displayedValues = value
      .map((item) => getDisplayValue<T[], GetItemValue<T, VK>>(items.value, item, {
        labelKey: props.labelKey,
        valueKey: props.valueKey,
      }))
      .filter((v): v is string => v != null && v !== '')

    return displayedValues.length > 0 ? displayedValues.join(', ') : undefined
  }

  return getDisplayValue<T[], GetItemValue<T, VK>>(items.value, value as GetItemValue<T, VK>, {
    labelKey: props.labelKey,
    valueKey: props.valueKey,
  })
}

const triggerRef = shallowRef<MaybeNull<InstanceType<typeof SelectTrigger>>>(null)

function autoFocus() {
  if (props.autofocus) {
    triggerRef.value?.$el?.focus({
      focusVisible: true,
    })
  }
}

onMounted(() => {
  setTimeout(() => autoFocus(), props.autofocusDelay)
})

function onUpdate(value: any) {
  if (toRaw(props.modelValue) === value)
    return

  if (props.modelModifiers?.trim)
    value = value?.trim() ?? null

  if (props.modelModifiers?.number)
    value = looseToNumber(value)

  if (props.modelModifiers?.nullable)
    value ??= null

  if (props.modelModifiers?.optional)
    value ??= undefined

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

function isSelectItem(item: SelectItem): item is Exclude<SelectItem, SelectValue> {
  return typeof item === 'object' && item !== null
}

defineExpose({
  triggerRef,
})
</script>

<template>
  <SelectRoot
    v-slot="{ modelValue, open }"
    :name="name"
    v-bind="rootProps"
    :default-value="(defaultValue as MaybeArray<SelectItem>)"
    :model-value="(modelValue as MaybeArray<SelectItem>)"
    :autocomplete="props.autocomplete"
    :disabled="disabled"
    @update:model-value="onUpdate"
    @update:open="onUpdateOpen"
  >
    <SelectTrigger
      ref="triggerRef"
      v-bind="{ id, ...$attrs, ...ariaAttrs }"
      :class="ui.base({ class: [props.ui?.base, props.class] })"
      data-part="base"
    >
      <span v-if="isLeading || !!props.avatar || slots.leading" :class="ui.leading({ class: props.ui?.leading })" data-part="leading">
        <slot name="leading" :model-value="(modelValue as Defined<GetModelValue<T, VK, M>>)" :open="open" :ui="ui">
          <Icon
            v-if="isLeading && leadingIconName"
            :name="leadingIconName"
            :class="ui.leadingIcon({ class: props.ui?.leadingIcon })"
            data-part="leadingIcon"
          />
          <Avatar
            v-else-if="props.avatar"
            :size="((props.ui?.itemLeadingChipSize || ui.itemLeadingAvatarSize()) as AvatarProps['size'])"
            v-bind="props.avatar"
            :class="ui.leadingAvatar({ class: props.ui?.leadingAvatar })"
            data-part="leadingAvatar"
          />
        </slot>
      </span>

      <slot :model-value="(modelValue as Defined<GetModelValue<T, VK, M>>)" :open="open" :ui="ui">
        <template v-for="displayedModelValue in [displayValue((modelValue as GetModelValue<T, VK, M>))]" :key="displayedModelValue">
          <span v-if="displayedModelValue != null" :class="ui.value({ class: props.ui?.value })" data-part="value">
            {{ displayedModelValue }}
          </span>
          <span v-else :class="ui.placeholder({ class: props.ui?.placeholder })" data-part="placeholder">
            <template v-if="props.placeholder">{{ props.placeholder }}</template>
            <template v-else>&nbsp;</template>
          </span>
        </template>
      </slot>

      <span v-if="isTrailing || !!slots.trailing" :class="ui.trailing({ class: props.ui?.trailing })" data-part="trailing">
        <slot name="trailing" :model-value="(modelValue as Defined<GetModelValue<T, VK, M>>)" :open="open" :ui="ui">
          <Icon v-if="trailingIconName" :name="trailingIconName" :class="ui.trailingIcon({ class: props.ui?.trailingIcon })" data-part="trailingIcon" />
        </slot>
      </span>
    </SelectTrigger>

    <SelectPortal v-bind="portalProps">
      <SelectContent v-bind="contentProps" :class="ui.content({ class: props.ui?.content })" data-part="content">
        <slot name="content-top"></slot>

        <div role="presentation" :class="ui.viewport({ class: props.ui?.viewport })" data-part="viewport">
          <SelectGroup v-for="(group, groupIndex) in groups" :key="`group-${groupIndex}`" :class="ui.group({ class: props.ui?.group })" data-part="group">
            <template v-for="(item, index) in group" :key="`group-${groupIndex}-${index}`">
              <SelectLabel v-if="isSelectItem(item) && item.type === 'label'" :class="ui.label({ class: [props.ui?.label, item.ui?.label, item.class] })" data-part="label">
                {{ get(item, props.labelKey as string) }}
              </SelectLabel>

              <SelectSeparator v-else-if="isSelectItem(item) && item.type === 'separator'" :class="ui.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })" data-part="separator" />

              <RekaSelectItem
                v-else
                :value="isSelectItem(item) ? get(item, props.valueKey as string) : item"
                :disabled="isSelectItem(item) && item.disabled"
                :class="ui.item({ class: [props.ui?.item, ...isSelectItem(item) ? [item.ui?.item, item.class] : []] })"
                data-part="item"
                @select="isSelectItem(item) && item.onSelect?.($event)"
              >
                <slot name="item" :item="(item as Defined<NestedItem<T>>)" :index="index" :ui="ui">
                  <slot name="item-leading" :item="(item as Defined<NestedItem<T>>)" :index="index" :ui="ui">
                    <Icon
                      v-if="isSelectItem(item) && item.icon"
                      :name="item.icon"
                      :class="ui.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })"
                      data-part="itemLeadingIcon"
                    />
                    <Avatar
                      v-else-if="isSelectItem(item) && item.avatar"
                      :size="((item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.itemLeadingAvatarSize()) as AvatarProps['size'])"
                      v-bind="item.avatar"
                      :class="ui.itemLeadingAvatar({ class: [props.ui?.leadingAvatar, item.ui?.itemLeadingAvatar] })"
                      data-part="itemLeadingAvatar"
                    />
                    <Chip
                      v-else-if="isSelectItem(item) && item.chip"
                      :size="((item.ui?.itemLeadingChipSize || props.ui?.itemLeadingChipSize || ui.itemLeadingChipSize()) as ChipProps['size'])"
                      inset
                      standalone
                      v-bind="item.chip"
                      :class="ui.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })"
                      data-part="itemLeadingChip"
                    />
                  </slot>

                  <span :class="ui.itemWrapper({ class: [props.ui?.itemWrapper, ...isSelectItem(item) ? [item.ui?.itemWrapper] : []] })" data-part="itemWrapper">
                    <SelectItemText :class="ui.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })" data-part="itemLabel">
                      <slot name="item-label" :item="(item as Defined<NestedItem<T>>)" :index="index">
                        {{ isSelectItem(item) ? get(item, props.labelKey as string) : item }}
                      </slot>
                    </SelectItemText>

                    <span
                      v-if="isSelectItem(item) && get(item, props.descriptionKey as string) || !!slots['item-description']"
                      :class="ui.itemDescription({ class: [props.ui?.itemDescription, ...isSelectItem(item) ? [item.ui?.itemDescription] : []] })"
                      data-part="itemDescription"
                    >
                      <slot name="item-description" :item="(item as Defined<NestedItem<T>>)" :index="index">
                        {{ isSelectItem(item) ? get(item, props.descriptionKey as string) : '' }}
                      </slot>
                    </span>
                  </span>

                  <span :class="ui.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })" data-part="itemTrailing">
                    <slot name="item-trailing" :item="(item as Defined<NestedItem<T>>)" :index="index" :ui="ui"></slot>

                    <SelectItemIndicator as-child>
                      <Icon :name="props.selectedIcon || appConfig.ui.icons.check" :class="ui.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })" data-part="itemTrailingIcon" />
                    </SelectItemIndicator>
                  </span>
                </slot>
              </RekaSelectItem>
            </template>
          </SelectGroup>
        </div>

        <slot name="content-bottom"></slot>

        <SelectArrow v-if="props.arrow" v-bind="arrowProps" :class="ui.arrow({ class: props.ui?.arrow })" data-part="arrow" />
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
