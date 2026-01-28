<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { ComboboxArrowProps, ComboboxContentEmits, ComboboxContentProps, ComboboxRootEmits, ComboboxRootProps } from 'reka-ui'
import theme from '#build/ui/select'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { AvatarProps, ButtonProps, ChipProps, ComponentBaseProps, ComponentStyler, ComponentUIProps, IconProps, InputProps, LinkPropsKeys, RuntimeAppConfig } from '../types'
import type { ButtonHTMLAttributes } from '../types/html'
import type { ModelModifiers } from '../types/input'
import type { AcceptableValue, ArrayOrNested, Defined, EmitsToProps, GetItemKeys, GetItemValue, GetModelValue, GetModelValueEmits, MaybeArray, MaybeNull, NestedItem, Nullable, StaticSlot } from '../types/utils'

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
  VK extends Nullable<GetItemKeys<T>> = 'value',
  M extends boolean = false,
> extends ComponentBaseProps, UseComponentIconsProps, Pick<ComboboxRootProps, 'open' | 'defaultOpen' | 'disabled' | 'name' | 'resetSearchTermOnBlur' | 'resetSearchTermOnSelect' | 'resetModelValueOnClear' | 'highlightOnHover'>, /** @vue-ignore */ Omit<ButtonHTMLAttributes, 'type' | 'disabled' | 'value' | 'name'> {
  id?: string
  /** The placeholder text when the select is empty. */
  placeholder?: string
  /**
   * Whether to display the search input or not.
   *
   * Can be an object to pass additional props to the input.
   *
   * `{ placeholder: "Search...", variant: "none" }`
   *
   * @default false
   */
  searchInput?: boolean | InputProps
  searchTerm?: string
  required?: boolean
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
   * Display a clear button to reset the model value.
   * Can be an object to pass additional props to the Button.
   * @default false
   */
  clear?: boolean | Partial<Omit<ButtonProps, LinkPropsKeys>>
  /**
   * The icon displayed in the clear button.
   * @default app.icons.close
   */
  clearIcon?: IconProps['name']
  /**
   * The content of the menu.
   * @default { side: 'bottom', sideOffset: 8, collisionPadding: 8, position: 'popper' }
   */
  content?: Omit<ComboboxContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<ComboboxContentEmits>>
  /**
   * Display an arrow alongside the menu.
   * @default false
   */
  arrow?: boolean | Omit<ComboboxArrowProps, 'as' | 'asChild'>
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
  /**
   * Determines if custom user input that does not exist in options can be added.
   * @default false
   */
  createItem?: boolean | 'always' | { position?: 'top' | 'bottom', when?: 'empty' | 'always' }
  /**
   * Fields to filter items by.
   * @default [labelKey]
   */
  filterFields?: string[]
  /**
   * When `true`, disable the default filters, useful for custom filtering (useAsyncData, useFetch, etc.).
   * @default false
   */
  ignoreFilter?: boolean
  autofocus?: boolean
  autofocusDelay?: number
  ui?: ComponentUIProps<typeof theme>
}

export type SelectEmits<A extends ArrayOrNested<SelectItem>, VK extends Nullable<GetItemKeys<A>>, M extends boolean> = Omit<ComboboxRootEmits, 'update:modelValue'> & {
  'change': [event: Event]
  'blur': [event: FocusEvent]
  'focus': [event: FocusEvent]
  'create': [item: string]
  'clear': []
  /** Event handler when highlighted element changes. */
  'highlight': [payload: {
    ref: HTMLElement
    value: GetModelValue<A, VK, M>
  } | undefined]
  'update:searchTerm': [value: string]
} & GetModelValueEmits<A, VK, M>

export interface SelectSlots<
  A extends ArrayOrNested<SelectItem> = ArrayOrNested<SelectItem>,
  VK extends Nullable<GetItemKeys<A>> = undefined,
  M extends boolean = false,
  T extends NestedItem<A> = NestedItem<A>,
> {
  'leading': StaticSlot<{ modelValue?: MaybeNull<GetModelValue<A, VK, M>>, open: boolean, ui: ComponentStyler<typeof theme> }>
  'default': StaticSlot<{ modelValue?: MaybeNull<GetModelValue<A, VK, M>>, open: boolean, ui: ComponentStyler<typeof theme> }>
  'trailing': StaticSlot<{ modelValue?: MaybeNull<GetModelValue<A, VK, M>>, open: boolean, ui: ComponentStyler<typeof theme> }>
  'empty': StaticSlot<{ searchTerm?: string }>
  'item': StaticSlot<{ item: T, index: number, ui: ComponentStyler<typeof theme> }>
  'item-leading': StaticSlot<{ item: T, index: number, ui: ComponentStyler<typeof theme> }>
  'item-label': StaticSlot<{ item: T, index: number }>
  'item-description': StaticSlot<{ item: T, index: number }>
  'item-trailing': StaticSlot<{ item: T, index: number, ui: ComponentStyler<typeof theme> }>
  'content-top': StaticSlot
  'content-bottom': StaticSlot
  'create-item-label': StaticSlot<{ item: string }>
}
</script>

<script lang="ts" setup generic="T extends ArrayOrNested<SelectItem>, VK extends Nullable<GetItemKeys<T>> = 'value', M extends boolean = false">
import { createReusableTemplate, reactivePick } from '@vueuse/core'
import { defu } from 'defu'
import { ComboboxAnchor, ComboboxArrow, ComboboxCancel, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxLabel, ComboboxPortal, ComboboxRoot, ComboboxSeparator, ComboboxTrigger, FocusScope, useFilter, useForwardPropsEmits } from 'reka-ui'
import { computed, onMounted, shallowRef, toRaw, toRef } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useFieldGroup } from '../composables/useFieldGroup'
import { useFormField } from '../composables/useFormField'
import { useLocale } from '../composables/useLocale'
import { usePortal } from '../composables/usePortal'
import { compare, get, getDisplayValue, isArrayOfArray, looseToNumber, pick } from '../utils'
import { cv, merge } from '../utils/style'
import Avatar from './Avatar.vue'
import Button from './Button.vue'
import Chip from './Chip.vue'
import Icon from './Icon.vue'
import Input from './Input.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SelectProps<T, VK, M>>(), {
  portal: true,
  searchInput: false,
  searchTerm: '',
  valueKey: 'value' as never,
  labelKey: 'label',
  descriptionKey: 'description',
  resetSearchTermOnBlur: true,
  resetSearchTermOnSelect: true,
  resetModelValueOnClear: true,
  autofocusDelay: 0,
})

const emit = defineEmits<SelectEmits<T, VK, M>>()
const slots = defineSlots<SelectSlots<T, VK, M>>()

const [DefineCreateItemTemplate, ReuseCreateItemTemplate] = createReusableTemplate()

const { t } = useLocale()

const searchTerm = defineModel<string>('searchTerm', { default: '' })

const { contains } = useFilter({ sensitivity: 'base' })

const rootProps = useForwardPropsEmits(reactivePick(props, 'modelValue', 'defaultValue', 'open', 'defaultOpen', 'required', 'multiple', 'resetSearchTermOnBlur', 'resetSearchTermOnSelect', 'resetModelValueOnClear', 'highlightOnHover'), emit)
const portalProps = usePortal(toRef(() => props.portal))
const contentProps = toRef(() => defu(props.content, { side: 'bottom', sideOffset: 8, collisionPadding: 8, position: 'popper' }) as ComboboxContentProps)
const arrowProps = toRef(() => props.arrow as ComboboxArrowProps)
const clearProps = computed(() => typeof props.clear === 'object' ? props.clear : {})
const searchInputProps = toRef(() => defu(props.searchInput, { placeholder: t('select.search'), ...props.searchInput ? {} : { readonly: true } }) as InputProps)

const { id, name, size: formFieldSize, color, highlight, disabled, ariaAttrs, emitFormChange, emitFormInput, emitFormBlur, emitFormFocus } = useFormField<SelectProps<T, VK, M>>(props)
const { size: fieldGroupSize, orientation } = useFieldGroup(props)

const appConfig = useAppConfig() as RuntimeAppConfig

const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(toRef(() => defu(props, {
  trailingIcon: appConfig.ui.icons.chevronDown,
})))

const size = computed(() => fieldGroupSize.value || formFieldSize.value)

const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.select))

  return styler({
    ...pick(props, ['variant', 'loading']),
    color: color.value,
    size: size.value,
    highlight: highlight.value,
    leading: isLeading.value || !!props.avatar || !!slots.leading,
    trailing: isTrailing.value || !!slots.trailing,
    fieldGroup: orientation.value,
    searchInput: !!props.searchInput,
  })
})

const groups = computed<SelectItem[][]>(
  () => props.items?.length
    ? isArrayOfArray(props.items) ? props.items : [props.items]
    : [],
)

const items = computed(() => groups.value.flat() as T[])

const filteredGroups = computed(() => {
  if (props.ignoreFilter || !searchTerm.value)
    return groups.value

  const fields = Array.isArray(props.filterFields) ? props.filterFields : [props.labelKey] as string[]

  return groups.value.map((items) => items.filter((item) => {
    if (item == null)
      return false

    if (typeof item !== 'object')
      return contains(String(item), searchTerm.value)

    if (item.type && ['label', 'separator'].includes(item.type))
      return true

    return fields.some((field) => {
      const value = get(item, field)
      return value != null && contains(String(value), searchTerm.value)
    })
  })).filter((group) => group.some((item) => !isSelectItem(item) || (!item.type || !['label', 'separator'].includes(item.type))))
})

const filteredItems = computed(() => filteredGroups.value.flat())

const createItem = computed(() => {
  if (!props.createItem || !searchTerm.value)
    return false

  const newItem = props.valueKey ? { [props.valueKey]: searchTerm.value } as NestedItem<T> : searchTerm.value

  if ((typeof props.createItem === 'object' && props.createItem.when === 'always') || props.createItem === 'always')
    return !filteredItems.value.some((item) => compare(item, newItem, props.valueKey as string))

  return !filteredItems.value.length
})

const createItemPosition = computed(() => typeof props.createItem === 'object' ? props.createItem.position : 'bottom')

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

const triggerRef = shallowRef<MaybeNull<InstanceType<typeof ComboboxTrigger>>>(null)

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

  if (props.resetSearchTermOnSelect)
    searchTerm.value = ''
}

function onUpdateOpen(value: boolean) {
  let timeoutId

  if (value) {
    const event = new FocusEvent('focus')

    emit('focus', event)
    emitFormFocus()
    clearTimeout(timeoutId)
  }
  else {
    const event = new FocusEvent('blur')
    emit('blur', event)
    emitFormBlur()

    // Since we use `displayValue` prop inside ComboboxInput we should reset searchTerm manually
    // https://reka-ui.com/docs/components/combobox#api-reference
    if (props.resetSearchTermOnBlur) {
      const STATE_ANIMATION_DELAY_MS = 100

      timeoutId = setTimeout(() => {
        searchTerm.value = ''
      }, STATE_ANIMATION_DELAY_MS)
    }
  }
}

function onCreate(e: Event) {
  e.preventDefault()
  e.stopPropagation()

  emit('create', searchTerm.value)
}

function onSelect(e: Event, item: SelectItem) {
  if (!isSelectItem(item))
    return

  if (item.disabled) {
    e.preventDefault()
    return
  }

  item.onSelect?.(e)
}

function isSelectItem(item: SelectItem): item is Exclude<SelectItem, SelectValue> {
  return typeof item === 'object' && item !== null
}

function isModelValueEmpty(modelValue: GetModelValue<T, VK, M>): boolean {
  if (props.multiple && Array.isArray(modelValue))
    return modelValue.length === 0

  return modelValue == null || modelValue === ''
}

function onClear() {
  emit('clear')
}

defineExpose({
  triggerRef: toRef(() => triggerRef.value?.$el as HTMLButtonElement),
})
</script>

<template>
  <DefineCreateItemTemplate>
    <ComboboxItem
      :value="searchTerm"
      data-part="item"
      :class="ui.item({ class: props.ui?.item })"
      @select="onCreate"
    >
      <span data-part="itemLabel" :class="ui.itemLabel({ class: props.ui?.itemLabel })">
        <slot name="create-item-label" :item="searchTerm">
          {{ t('select.create', { label: searchTerm }) }}
        </slot>
      </span>
    </ComboboxItem>
  </DefineCreateItemTemplate>

  <ComboboxRoot
    :id="id"
    v-slot="{ modelValue, open }"
    v-bind="{ ...rootProps, ...$attrs, ...ariaAttrs }"
    :name="name"
    :disabled="disabled"
    ignore-filter
    as-child
    @update:model-value="onUpdate"
    @update:open="onUpdateOpen"
  >
    <ComboboxAnchor as-child>
      <ComboboxTrigger ref="triggerRef" tabindex="0" data-part="base" :class="ui.base({ class: [props.ui?.base, props.class] })">
        <span v-if="isLeading || !!props.avatar || slots.leading" data-part="leading" :class="ui.leading({ class: props.ui?.leading })">
          <slot name="leading" :model-value="(modelValue as Defined<GetModelValue<T, VK, M>>)" :open="open" :ui="ui">
            <Icon
              v-if="isLeading && leadingIconName"
              :name="leadingIconName"
              data-part="leadingIcon"
              :class="ui.leadingIcon({ class: props.ui?.leadingIcon })"
            />
            <Avatar
              v-else-if="props.avatar"
              :size="((props.ui?.itemLeadingChipSize || ui.itemLeadingAvatarSize()) as AvatarProps['size'])"
              v-bind="props.avatar"
              data-part="leadingAvatar"
              :class="ui.leadingAvatar({ class: props.ui?.leadingAvatar })"
            />
          </slot>
        </span>

        <slot :model-value="(modelValue as Defined<GetModelValue<T, VK, M>>)" :open="open" :ui="ui">
          <template v-for="displayedModelValue in [displayValue((modelValue as GetModelValue<T, VK, M>))]" :key="displayedModelValue">
            <span v-if="displayedModelValue != null" data-part="value" :class="ui.value({ class: props.ui?.value })">
              {{ displayedModelValue }}
            </span>
            <span v-else data-part="placeholder" :class="ui.placeholder({ class: props.ui?.placeholder })">
              <template v-if="props.placeholder">{{ props.placeholder }}</template>
              <template v-else>&nbsp;</template>
            </span>
          </template>
        </slot>

        <span v-if="isTrailing || !!slots.trailing || props.clear" data-part="trailing" :class="ui.trailing({ class: props.ui?.trailing })">
          <slot name="trailing" :model-value="(modelValue as Defined<GetModelValue<T, VK, M>>)" :open="open" :ui="ui">
            <ComboboxCancel v-if="props.clear && !isModelValueEmpty(modelValue as GetModelValue<T, VK, M>)" as-child>
              <Button
                as="span"
                :icon="props.clearIcon || appConfig.ui.icons.close"
                :size="size"
                variant="link"
                color="neutral"
                tabindex="-1"
                v-bind="clearProps"
                data-part="trailingClear"
                :class="ui.trailingClear({ class: props.ui?.trailingClear })"
                @click.stop="onClear"
              />
            </ComboboxCancel>
            <Icon v-else-if="trailingIconName" :name="trailingIconName" data-part="trailingIcon" :class="ui.trailingIcon({ class: props.ui?.trailingIcon })" />
          </slot>
        </span>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxPortal v-bind="portalProps">
      <ComboboxContent v-bind="contentProps" data-part="content" :class="ui.content({ class: props.ui?.content })">
        <FocusScope trapped data-part="focusScope" :class="ui.focusScope({ class: props.ui?.focusScope })">
          <slot name="content-top"></slot>

          <ComboboxInput v-model="searchTerm" :display-value="() => searchTerm" as-child>
            <Input
              autofocus
              autocomplete="off"
              :size="size"
              v-bind="searchInputProps"
              data-part="input"
              :class="ui.input({ class: props.ui?.input })"
              @change.stop
            />
          </ComboboxInput>

          <ComboboxEmpty data-part="empty" :class="ui.empty({ class: props.ui?.empty })">
            <slot name="empty" :search-term="searchTerm">
              {{ searchTerm ? t('select.noMatch', { searchTerm }) : t('select.noData') }}
            </slot>
          </ComboboxEmpty>

          <div role="presentation" data-part="viewport" :class="ui.viewport({ class: props.ui?.viewport })">
            <ComboboxGroup v-if="createItem && createItemPosition === 'top'" data-part="group" :class="ui.group({ class: props.ui?.group })">
              <ReuseCreateItemTemplate />
            </ComboboxGroup>

            <ComboboxGroup v-for="(group, groupIndex) in filteredGroups" :key="`group-${groupIndex}`" data-part="group" :class="ui.group({ class: props.ui?.group })">
              <template v-for="(item, index) in group" :key="`group-${groupIndex}-${index}`">
                <ComboboxLabel
                  v-if="isSelectItem(item) && item.type === 'label'"
                  data-part="label"
                  :class="ui.label({ class: [props.ui?.label, item.ui?.label, item.class] })"
                >
                  {{ get(item, props.labelKey as string) }}
                </ComboboxLabel>

                <ComboboxSeparator
                  v-else-if="isSelectItem(item) && item.type === 'separator'"
                  data-part="separator"
                  :class="ui.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })"
                />

                <ComboboxItem
                  v-else
                  :value="props.valueKey && isSelectItem(item) ? get(item, props.valueKey as string) : item"
                  :disabled="isSelectItem(item) && item.disabled"
                  data-part="item"
                  :class="ui.item({ class: [props.ui?.item, ...isSelectItem(item) ? [item.ui?.item, item.class] : []] })"
                  @select="onSelect($event, item)"
                >
                  <slot name="item" :item="(item as Defined<NestedItem<T>>)" :index="index" :ui="ui">
                    <slot name="item-leading" :item="(item as Defined<NestedItem<T>>)" :index="index" :ui="ui">
                      <Icon
                        v-if="isSelectItem(item) && item.icon"
                        :name="item.icon"
                        data-part="itemLeadingIcon"
                        :class="ui.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })"
                      />
                      <Avatar
                        v-else-if="isSelectItem(item) && item.avatar"
                        :size="((item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.itemLeadingAvatarSize()) as AvatarProps['size'])"
                        v-bind="item.avatar"
                        data-part="itemLeadingAvatar"
                        :class="ui.itemLeadingAvatar({ class: [props.ui?.leadingAvatar, item.ui?.itemLeadingAvatar] })"
                      />
                      <Chip
                        v-else-if="isSelectItem(item) && item.chip"
                        :size="((item.ui?.itemLeadingChipSize || props.ui?.itemLeadingChipSize || ui.itemLeadingChipSize()) as ChipProps['size'])"
                        inset
                        standalone
                        v-bind="item.chip"
                        data-part="itemLeadingChip"
                        :class="ui.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })"
                      />
                    </slot>

                    <span data-part="itemWrapper" :class="ui.itemWrapper({ class: [props.ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })">
                      <span data-part="itemLabel" :class="ui.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })">
                        <slot name="item-label" :item="(item as Defined<NestedItem<T>>)" :index="index">
                          {{ isSelectItem(item) ? get(item, props.labelKey as string) : item }}
                        </slot>
                      </span>

                      <span
                        v-if="isSelectItem(item) && get(item, props.descriptionKey as string) || !!slots['item-description']"
                        data-part="itemDescription"
                        :class="ui.itemDescription({ class: [props.ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })"
                      >
                        <slot name="item-description" :item="(item as Defined<NestedItem<T>>)" :index="index">
                          {{ isSelectItem(item) ? get(item, props.descriptionKey as string) : '' }}
                        </slot>
                      </span>
                    </span>

                    <span data-part="itemTrailing" :class="ui.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })">
                      <slot name="item-trailing" :item="(item as Defined<NestedItem<T>>)" :index="index" :ui="ui"></slot>

                      <ComboboxItemIndicator as-child>
                        <Icon :name="props.selectedIcon || appConfig.ui.icons.check" data-part="itemTrailingIcon" :class="ui.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })" />
                      </ComboboxItemIndicator>
                    </span>
                  </slot>
                </ComboboxItem>
              </template>
            </ComboboxGroup>

            <ComboboxGroup v-if="createItem && createItemPosition === 'bottom'" data-part="group" :class="ui.group({ class: props.ui?.group })">
              <ReuseCreateItemTemplate />
            </ComboboxGroup>
          </div>

          <slot name="content-bottom"></slot>
        </FocusScope>

        <ComboboxArrow v-if="props.arrow" v-bind="arrowProps" data-part="arrow" :class="ui.arrow({ class: props.ui?.arrow })" />
      </ComboboxContent>
    </ComboboxPortal>
  </ComboboxRoot>
</template>
