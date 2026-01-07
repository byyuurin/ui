<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { TreeItemProps, TreeItemSelectEvent, TreeItemToggleEvent, TreeRootEmits, TreeRootProps } from 'reka-ui'
import type { ComponentPublicInstance } from 'vue'
import theme from '#build/ui/tree'
import type { ComponentBaseProps, ComponentStyler, ComponentUIProps, IconProps, RuntimeAppConfig } from '../types'
import type { DynamicSlots, ExtractItem, GetItemKeys, StaticSlot } from '../types/utils'

export interface TreeItem extends ComponentBaseProps {
  icon?: IconProps['name']
  label?: string
  trailingIcon?: IconProps['name']
  defaultExpanded?: boolean
  disabled?: boolean
  slot?: string
  children?: TreeItem[]
  onToggle?: (e: TreeItemToggleEvent<TreeItem>) => void
  onSelect?: (e: TreeItemSelectEvent<TreeItem>) => void
  ui?: Pick<ComponentUIProps<typeof theme>, 'item' | 'itemWithChildren' | 'link' | 'linkLeadingIcon' | 'linkLabel' | 'linkTrailing' | 'linkTrailingIcon' | 'listWithChildren'>
  [key: string]: any
}

type ThemeVariants = VariantProps<typeof theme>

export interface TreeProps<T extends TreeItem[] = TreeItem[], M extends boolean = false> extends ComponentBaseProps, Pick<TreeRootProps<T>, 'expanded' | 'defaultExpanded' | 'selectionBehavior' | 'propagateSelect' | 'disabled' | 'bubbleSelect'> {
  /**
   * The element or component this component should render as.
   * @default "ul"
   */
  as?: TreeRootProps<T>['as'] | { root?: TreeRootProps<T>['as'], link: TreeItemProps<T>['as'] }
  /** @default "primary" */
  color?: ThemeVariants['color']
  /** @default "md" */
  size?: ThemeVariants['size']
  /** This function is passed the index of each item and should return a unique key for that item */
  getKey?: (val: T[number]) => string
  /**
   * The key used to get the label from the item.
   * @default "label"
   */
  labelKey?: GetItemKeys<T>
  /**
   * The icon displayed on the right side of a parent node.
   * @default app.icons.chevronDown
   */
  trailingIcon?: IconProps['name']
  /**
   * The icon displayed when a parent node is expanded.
   * @default app.icons.folderOpen
   */
  expandedIcon?: IconProps['name']
  /**
   * The icon displayed when a parent node is collapsed.
   * @default app.icons.folder
   */
  collapsedIcon?: IconProps['name']
  items?: T
  /** The controlled value of the Tree. Can be bind as `v-model`. */
  modelValue?: M extends true ? T[number][] : T[number]
  /** The value of the Tree when initially rendered. Use when you do not need to control the state of the Tree. */
  defaultValue?: M extends true ? T[number][] : T[number]
  /** Whether multiple options can be selected or not. */
  multiple?: M & boolean
  /**
   * Use nested DOM structure (children inside parents) vs flattened structure (all items at same level).
   * @default true
   */
  nested?: boolean
  onSelect?: (e: TreeItemSelectEvent<T[number]>, item: T[number]) => void
  onToggle?: (e: TreeItemToggleEvent<T[number]>, item: T[number]) => void
  ui?: ComponentUIProps<typeof theme>
}

export type TreeEmits<T extends TreeItem[] = TreeItem[], M extends boolean = false> = TreeRootEmits<T[number], M>

type SlotProps<T extends TreeItem> = StaticSlot<{
  item: T
  index: number
  level: number
  expanded: boolean
  selected: boolean
  indeterminate: boolean | undefined
  handleSelect: () => void
  handleToggle: () => void
  ui: ComponentStyler<typeof theme>
}>

export type TreeSlots<T extends TreeItem[] = TreeItem[]> = {
  'item-wrapper': SlotProps<T[number]>
  'item': SlotProps<T[number]>
  'item-leading': SlotProps<T[number]>
  'item-label': SlotProps<T[number]>
  'item-trailing': SlotProps<T[number]>
} & DynamicSlots<T[number], undefined, {
  index: number
  level: number
  expanded: boolean
  ui: ComponentStyler<typeof theme>
  selected: boolean
  indeterminate: boolean | undefined
  handleSelect: () => void
  handleToggle: () => void
}>

</script>

<script setup lang="ts" generic="T extends TreeItem[], M extends boolean = false">
import { createReusableTemplate, reactivePick } from '@vueuse/core'
import { defu } from 'defu'
import { TreeItem, TreeRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, shallowRef } from 'vue'
import { useAppConfig } from '#imports'
import { get, pick } from '../utils'
import { cv, merge } from '../utils/style'
import Icon from './Icon.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TreeProps<T, M>>(), {
  labelKey: 'label',
  nested: true,
})

const emit = defineEmits<TreeEmits<T, M>>()
const slots = defineSlots<TreeSlots<T>>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'items', 'expanded', 'disabled', 'propagateSelect', 'bubbleSelect'), emit)

const as = computed(() => {
  if (typeof props.as === 'string' || (props.as && 'render' in props.as && typeof props.as?.render === 'function'))
    return { root: props.as, link: 'button' }

  return defu(props.as, { root: 'ul', link: 'button' })
})

const flattenedPaddingFormula = computed(() => {
  const sizeConfig = {
    xs: { base: 2, perLevel: 5.5 }, // px-2, ms-4 + ps-1.5
    sm: { base: 2.5, perLevel: 6 }, // px-2.5, ms-4.5 + ps-1.5
    md: { base: 2.5, perLevel: 6.5 }, // px-2.5, ms-5 + ps-1.5
    lg: { base: 3, perLevel: 7 }, // px-3, ms-5.5 + ps-1.5
    xl: { base: 3, perLevel: 7.5 }, // px-3, ms-6 + ps-1.5
  }
  const config = sizeConfig[props.size || 'md']
  return (level: number) => `calc(var(--spacing) * ${(level - 1) * config.perLevel + config.base})`
})

const { define: DefineTreeTemplate, reuse: ReuseTreeTemplate } = createReusableTemplate<{ items?: TreeItem[], level: number }, TreeSlots<T>>()

const { define: DefineItemTemplate, reuse: ReuseItemTemplate } = createReusableTemplate<{ item: TreeItem, index: number, level: number }, TreeSlots<T>>({
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
  },
})

const rootRef = shallowRef<ComponentPublicInstance>()

function getItemLabel<Item extends T[number]>(item: Item): string {
  return get(item, props.labelKey as string)
}

function getItemKey<Item extends T[number]>(item: Item): string {
  return props.getKey
    ? props.getKey(item) || getItemLabel(item)
    : getItemLabel(item)
}

function getDefaultOpenedItems(item: T[number]): string[] {
  const currentItem = item.defaultExpanded ? getItemKey(item) : null
  const childItems = item.children?.flatMap((child: T[number]) => getDefaultOpenedItems(child)) ?? []

  return [currentItem, ...childItems].filter(Boolean) as string[]
}

const appConfig = useAppConfig() as RuntimeAppConfig

const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.tree))
  return styler(pick(props, ['color', 'size']))
})

const defaultExpanded = computed(() => props.defaultExpanded ?? props.items?.flatMap((item) => getDefaultOpenedItems(item)))

defineExpose({
  get $el() {
    return rootRef.value?.$el as HTMLElement
  },
})

function onUpdate(value: M extends true ? Array<T[number]> : T[number]) {
  emit('update:modelValue', props.multiple && !Array.isArray(value) ? [value] : value)
}
</script>

<template>
  <DefineItemTemplate v-slot="{ item, index, level }">
    <li
      role="presentation"
      :class="props.nested && level > 1 ? ui.itemWithChildren({ class: [props.ui?.itemWithChildren, item.ui?.itemWithChildren] }) : ui.item({ class: [props.ui?.item, item.ui?.item] })"
      :data-part="props.nested && level > 1 ? 'itemWithChildren' : 'item'"
    >
      <TreeItem
        v-slot="{ isExpanded, isSelected, isIndeterminate, handleSelect, handleToggle }"
        :level="level"
        :value="item"
        as-child
        @toggle="(item.onToggle ?? props.onToggle)?.($event, item)"
        @select="(item.onSelect ?? props.onSelect)?.($event, item)"
      >
        <slot
          :name="(`${item.slot ?? 'item'}-wrapper` as keyof TreeSlots<T>)"
          v-bind="{ index, level, expanded: isExpanded, selected: isSelected, indeterminate: isIndeterminate, handleSelect, handleToggle, ui }"
          :item="(item as ExtractItem<T>)"
        >
          <component
            :is="as.link"
            :type="as.link === 'button' ? 'button' : undefined"
            :disabled="item.disabled || props.disabled"
            :class="ui.link({ class: [props.ui?.link, item.ui?.link, item.class], selected: isSelected, disabled: item.disabled || props.disabled })"
            data-part="link"
            :style="!props.nested && level > 1 ? { paddingLeft: flattenedPaddingFormula(level) } : undefined"
          >
            <slot
              :name="((item.slot || 'item') as keyof TreeSlots<T>)"
              v-bind="{ index, level, expanded: isExpanded, selected: isSelected, indeterminate: isIndeterminate, handleSelect, handleToggle, ui }"
              :item="(item as ExtractItem<T>)"
            >
              <slot
                :name="(`${item.slot || 'item'}-leading` as keyof TreeSlots<T>)"
                v-bind="{ index, level, expanded: isExpanded, selected: isSelected, indeterminate: isIndeterminate, handleSelect, handleToggle, ui }"
                :item="(item as ExtractItem<T>)"
              >
                <Icon
                  v-if="item.icon"
                  :name="item.icon"
                  :class="ui.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, item.ui?.linkLeadingIcon] })"
                  data-part="linkLeadingIcon"
                />
                <Icon
                  v-else-if="item.children?.length"
                  :name="isExpanded ? (props.expandedIcon ?? appConfig.ui.icons.folderOpen) : (props.collapsedIcon ?? appConfig.ui.icons.folder)"
                  :class="ui.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, item.ui?.linkLeadingIcon] })"
                  data-part="linkLeadingIcon"
                />
              </slot>

              <span v-if="getItemLabel(item) || slots[(`${item.slot || 'item'}-label` as keyof TreeSlots<T>)]" :class="ui.linkLabel({ class: [props.ui?.linkLabel, item.ui?.linkLabel] })" data-part="linkLabel">
                <slot
                  :name="(`${item.slot || 'item'}-label` as keyof TreeSlots<T>)"
                  v-bind="{ index, level, expanded: isExpanded, selected: isSelected, indeterminate: isIndeterminate, handleSelect, handleToggle, ui }"
                  :item="(item as ExtractItem<T>)"
                >
                  {{ getItemLabel(item) }}
                </slot>
              </span>

              <span
                v-if="item.trailingIcon || item.children?.length || slots[(`${item.slot || 'item'}-trailing` as keyof TreeSlots<T>)]"
                :class="ui.linkTrailing({ class: [props.ui?.linkTrailing, item.ui?.linkTrailing] })"
                data-part="linkTrailing"
              >
                <slot
                  :name="(`${item.slot || 'item'}-trailing` as keyof TreeSlots<T>)"
                  v-bind="{ index, level, expanded: isExpanded, selected: isSelected, indeterminate: isIndeterminate, handleSelect, handleToggle, ui }"
                  :item="(item as ExtractItem<T>)"
                >
                  <Icon
                    v-if="item.trailingIcon"
                    :name="item.trailingIcon"
                    :class="ui.linkTrailingIcon({ class: [props.trailingIcon, item.ui?.linkTrailingIcon] })"
                    data-part="linkTrailingIcon"
                  />
                  <Icon
                    v-else-if="item.children?.length"
                    :name="props.trailingIcon ?? appConfig.ui.icons.chevronDown"
                    :class="ui.linkTrailingIcon({ class: [props.ui?.linkTrailingIcon, item.ui?.linkTrailingIcon] })"
                    data-part="linkTrailingIcon"
                  />
                </slot>
              </span>
            </slot>
          </component>
        </slot>

        <ul
          v-if="props.nested && item.children?.length && isExpanded"
          role="group"
          :class="ui.listWithChildren({ class: [props.ui?.listWithChildren, item.ui?.listWithChildren] })"
          data-part="listWithChildren"
        >
          <ReuseTreeTemplate :items="item.children" :level="level + 1" />
        </ul>
      </TreeItem>
    </li>
  </DefineItemTemplate>

  <DefineTreeTemplate v-slot="{ items, level }">
    <ReuseItemTemplate v-for="(item, index) in items" :key="`${level}-${index}`" :item="item" :index="index" :level="level" />
  </DefineTreeTemplate>

  <TreeRoot
    ref="rootRef"
    v-slot="{ flattenItems }"
    v-bind="{ ...rootProps, ...$attrs }"
    :as="as.root"
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    :get-key="getItemKey"
    :default-expanded="defaultExpanded"
    :selection-behavior="props.selectionBehavior"
    :multiple="props.multiple"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    data-part="root"
    @update:model-value="onUpdate"
  >
    <template v-if="!props.nested">
      <ReuseItemTemplate
        v-for="(item, index) in flattenItems"
        :key="item._id"
        :item="item.value"
        :index="index"
        :level="item.level"
      />
    </template>
    <ReuseTreeTemplate v-else :items="props.items" :level="1" />
  </TreeRoot>
</template>
