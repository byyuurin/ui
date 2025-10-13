<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { DropdownMenuArrowProps, DropdownMenuContentEmits, DropdownMenuContentProps, DropdownMenuRootEmits, DropdownMenuRootProps } from 'reka-ui'
import theme from '#build/ui/dropdown-menu'
import type { AvatarProps, ComponentBaseProps, ComponentUIProps, IconProps, KbdProps, LinkProps, RuntimeAppConfig } from '../types'
import type { ArrayOrNested, DynamicSlots, EmitsToProps, MergeTypes, NestedItem } from '../types/utils'

export interface DropdownMenuItem extends Omit<LinkProps, 'type' | 'raw' | 'custom' | 'underline'> {
  icon?: IconProps['name']
  avatar?: AvatarProps
  content?: Omit<DropdownMenuContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<DropdownMenuContentEmits>>
  kbds?: Array<string | KbdProps['value']>
  /**
   * The item type.
   * @default 'link'
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
  ui?: Pick<ComponentUIProps<typeof theme>, 'item' | 'label' | 'separator' | 'itemLeadingIcon' | 'itemLeadingAvatarSize' | 'itemLeadingAvatar' | 'itemLabel' | 'itemLabelExternalIcon' | 'itemTrailing' | 'itemTrailingIcon' | 'itemTrailingKbds' | 'itemTrailingKbdsSize'>
  [key: string]: any
}

type SlotProps<T extends DropdownMenuItem> = (props: { item: T, active?: boolean, index: number }) => any

export type DropdownMenuSlots<
  T extends ArrayOrNested<DropdownMenuItem> = ArrayOrNested<DropdownMenuItem>,
  I extends NestedItem<T> = NestedItem<T>,
> = {
  'default'?: (props: { open: boolean }) => any
  'item'?: SlotProps<I>
  'item-leading'?: SlotProps<I>
  'item-label'?: SlotProps<I>
  'item-trailing'?: SlotProps<I>
} & DynamicSlots<MergeTypes<I>, 'leading' | 'label' | 'trailing', SlotProps<I>>

export interface DropdownMenuEmits extends DropdownMenuRootEmits {}

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
  checkedIcon?: string
  /**
   * The icon displayed when an item is loading.
   * @default app.icons.loading
   */
  loadingIcon?: string
  /**
   * The icon displayed when the item is an external link.
   * Set to `false` to hide the external icon.
   * @default app.icons.external
   */
  externalIcon?: boolean | string
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
  portal?: boolean
  /**
   * The key used to get the label from the item.
   * @default "label"
   */
  labelKey?: keyof NestedItem<T>
  disabled?: boolean
  ui?: ComponentUIProps<typeof theme>
}
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
})
const emit = defineEmits<DropdownMenuEmits>()
const slots = defineSlots<DropdownMenuSlots<T>>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'defaultOpen', 'open', 'modal'), emit)
const contentProps = toRef(() => ({ side: 'bottom', sideOffset: 8, collisionPadding: 8, ...props.content }) as DropdownMenuContentProps)
const arrowProps = toRef(() => props.arrow as DropdownMenuArrowProps)
const proxySlots = omit(slots, ['default'])

const appConfig = useAppConfig() as RuntimeAppConfig
const style = computed(() => {
  const ui = cv(merge(theme, appConfig.ui.dropdownMenu))
  return ui(props)
})
</script>

<template>
  <DropdownMenuRoot v-slot="{ open }" v-bind="rootProps">
    <DropdownMenuTrigger v-if="slots.default" as-child :class="props.class" :disabled="props.disabled">
      <slot :open="open"></slot>
    </DropdownMenuTrigger>

    <DropdownMenuContent
      :class="style.content({ class: [!slots.default && props.class, props.ui?.content] })"
      :ui="props.ui"
      v-bind="contentProps"
      :size="props.size"
      :items="props.items"
      :portal="props.portal"
      :label-key="(props.labelKey as keyof NestedItem<T>)"
      :checked-icon="props.checkedIcon"
      :loading-icon="props.loadingIcon"
      :external-icon="props.externalIcon"
      data-part="content"
    >
      <template v-for="(_, name) in proxySlots" #[name]="slotProps">
        <slot :name="(name as keyof DropdownMenuSlots<T>)" v-bind="slotProps"></slot>
      </template>

      <DropdownMenuArrow v-if="props.arrow" v-bind="arrowProps" :class="style.arrow({ class: props.ui?.arrow })" data-part="arrow" />
    </DropdownMenuContent>
  </DropdownMenuRoot>
</template>
