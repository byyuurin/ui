<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { DropdownMenuArrowProps, DropdownMenuContentEmits, DropdownMenuContentProps, DropdownMenuRootEmits, DropdownMenuRootProps } from 'reka-ui'
import theme from '#build/ui/dropdown-menu'
import type { AvatarProps, ComponentBaseProps, ComponentStyler, ComponentUIProps, IconProps, KbdProps, LinkProps, RuntimeAppConfig } from '../types'
import type { ArrayOrNested, DynamicSlots, EmitsToProps, GetItemKeys, MergeTypes, NestedItem, StaticSlot } from '../types/utils'

export interface DropdownMenuItem extends Omit<LinkProps, 'type' | 'raw' | 'custom'> {
  label?: string
  description?: string
  icon?: IconProps['name']
  color?: ThemeVariants['color']
  avatar?: AvatarProps
  content?: Omit<DropdownMenuContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<DropdownMenuContentEmits>>
  kbds?: KbdProps['value'][] | KbdProps[]
  /**
   * The item type.
   * @default "link"
   */
  type?: 'label' | 'separator' | 'link' | 'checkbox'
  slot?: string
  loading?: boolean
  disabled?: boolean
  checked?: boolean
  open?: boolean
  defaultOpen?: boolean
  children?: ArrayOrNested<DropdownMenuItem>
  onSelect?: (e: Event) => void
  onUpdateChecked?: (checked: boolean) => void
  ui?: Pick<ComponentUIProps<typeof theme>, 'item' | 'label' | 'separator' | 'itemLeadingIcon' | 'itemLeadingAvatarSize' | 'itemLeadingAvatar' | 'itemWrapper' | 'itemLabel' | 'itemDescription' | 'itemLabelExternalIcon' | 'itemTrailing' | 'itemTrailingIcon' | 'itemTrailingKbds' | 'itemTrailingKbdsSize'>
  [key: string]: any
}

type ThemeVariants = VariantProps<typeof theme>

export interface DropdownMenuProps<
  T extends ArrayOrNested<DropdownMenuItem> = ArrayOrNested<DropdownMenuItem>,
> extends ComponentBaseProps, Omit<DropdownMenuRootProps, 'dir'> {
  /** @default "md" */
  size?: ThemeVariants['size']
  items?: T
  /**
   * The icon displayed when an item is checked.
   * @default app.icons.check
   */
  checkedIcon?: IconProps['name']
  /**
   * The icon displayed when an item is loading.
   * @default app.icons.loading
   */
  loadingIcon?: IconProps['name']
  /**
   * The icon displayed when the item is an external link.
   *
   * Set to `false` to hide the external icon.
   * @default app.icons.external
   */
  externalIcon?: boolean | IconProps['name']
  /**
   * The content of the menu.
   * @default { side: 'bottom', sideOffset: 8, collisionPadding: 8 }
   */
  content?: Omit<DropdownMenuContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<DropdownMenuContentEmits>>
  /**
   * Display an arrow alongside the menu.
   * @default false
   */
  arrow?: boolean | Omit<DropdownMenuArrowProps, 'as' | 'asChild'>
  /**
   * Render the menu in a portal.
   * @default true
   */
  portal?: boolean | string | HTMLElement
  /**
   * The key used to get the label from the item.
   * @default "label"
   */
  labelKey?: GetItemKeys<T>
  /**
   * The key used to get the description from the item.
   * @default "description"
   */
  descriptionKey?: GetItemKeys<T>
  disabled?: boolean
  ui?: ComponentUIProps<typeof theme>
}

export interface DropdownMenuEmits extends DropdownMenuRootEmits {}

export type DropdownMenuSlots<
  A extends ArrayOrNested<DropdownMenuItem> = ArrayOrNested<DropdownMenuItem>,
  T extends NestedItem<A> = NestedItem<A>,
> = {
  'default': StaticSlot<{ open: boolean }>
  'item': StaticSlot<{ item: T, active?: boolean, index: number, ui: ComponentStyler<typeof theme> }>
  'item-leading': StaticSlot<{ item: T, active?: boolean, index: number, ui: ComponentStyler<typeof theme> }>
  'item-label': StaticSlot<{ item: T, active?: boolean, index: number }>
  'item-description': StaticSlot<{ item: T, active?: boolean, index: number }>
  'item-trailing': StaticSlot<{ item: T, active?: boolean, index: number, ui: ComponentStyler<typeof theme> }>
  'content-top': StaticSlot
  'content-bottom': StaticSlot
}
& DynamicSlots<MergeTypes<T>, 'label' | 'description', { active?: boolean, index: number }>
& DynamicSlots<MergeTypes<T>, 'leading' | 'trailing', { active?: boolean, index: number, ui: ComponentStyler<typeof theme> }>

</script>

<script setup lang="ts" generic="T extends ArrayOrNested<DropdownMenuItem>">
import { reactivePick } from '@vueuse/core'
import { DropdownMenuArrow, DropdownMenuRoot, DropdownMenuTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed, toRef } from 'vue'
import { useAppConfig } from '#imports'
import { omit } from '../utils'
import { cv, merge } from '../utils/style'
import DropdownMenuContent from './DropdownMenuContent.vue'

const props = withDefaults(defineProps<DropdownMenuProps<T>>(), {
  portal: true,
  modal: true,
  externalIcon: true,
  labelKey: 'label',
  descriptionKey: 'description',
})
const emit = defineEmits<DropdownMenuEmits>()
const slots = defineSlots<DropdownMenuSlots<T>>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'defaultOpen', 'open', 'modal'), emit)
const contentProps = toRef(() => ({ side: 'bottom', sideOffset: 8, collisionPadding: 8, ...props.content }) as DropdownMenuContentProps)
const arrowProps = toRef(() => props.arrow as DropdownMenuArrowProps)
const getProxySlots = () => omit(slots, ['default'])

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.dropdownMenu))
  return styler(props)
})
</script>

<template>
  <DropdownMenuRoot v-slot="{ open }" v-bind="rootProps">
    <DropdownMenuTrigger v-if="!!slots.default" as-child :class="props.class" :disabled="props.disabled">
      <slot :open="open"></slot>
    </DropdownMenuTrigger>

    <DropdownMenuContent
      v-bind="contentProps"
      :size="props.size"
      :items="props.items"
      :portal="props.portal"
      :label-key="(props.labelKey as keyof NestedItem<T>)"
      :description-key="(props.descriptionKey as keyof NestedItem<T>)"
      :checked-icon="props.checkedIcon"
      :loading-icon="props.loadingIcon"
      :external-icon="props.externalIcon"
      :ui="ui"
      :ui-override="props.ui"
      :class="ui.content({ class: [props.ui?.content, !slots.default && props.class] })"
      data-part="content"
    >
      <template v-for="(_, name) in getProxySlots()" #[name]="slotProps">
        <slot :name="(name as keyof DropdownMenuSlots<T>)" v-bind="slotProps"></slot>
      </template>

      <DropdownMenuArrow v-if="props.arrow" v-bind="arrowProps" :class="ui.arrow({ class: props.ui?.arrow })" data-part="arrow" />
    </DropdownMenuContent>
  </DropdownMenuRoot>
</template>
