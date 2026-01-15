<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { ContextMenuContentEmits, ContextMenuContentProps, ContextMenuRootEmits, ContextMenuRootProps } from 'reka-ui'
import theme from '#build/ui/context-menu'
import type { AvatarProps, ComponentBaseProps, ComponentStyler, ComponentUIProps, IconProps, KbdProps, LinkProps, RuntimeAppConfig } from '../types'
import type { ArrayOrNested, DynamicSlots, EmitsToProps, GetItemKeys, MergeTypes, NestedItem, StaticSlot } from '../types/utils'

type ThemeVariants = VariantProps<typeof theme>

export interface ContextMenuItem extends Omit<LinkProps, 'type' | 'raw' | 'custom'>, ComponentBaseProps {
  label?: string
  description?: string
  icon?: IconProps['name']
  color?: ThemeVariants['color']
  avatar?: AvatarProps
  content?: Omit<ContextMenuContentProps, 'as' | 'asChild' | 'forceMount'> & ComponentBaseProps & Partial<EmitsToProps<ContextMenuContentEmits>>
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
  children?: ArrayOrNested<ContextMenuItem>
  onSelect?: (e: Event) => void
  onUpdateChecked?: (checked: boolean) => void
  ui?: Pick<ComponentUIProps<typeof theme>, 'content' | 'item' | 'label' | 'separator' | 'itemLeadingIcon' | 'itemLeadingAvatarSize' | 'itemLeadingAvatar' | 'itemWrapper' | 'itemLabel' | 'itemDescription' | 'itemLabelExternalIcon' | 'itemTrailing' | 'itemTrailingIcon' | 'itemTrailingKbds' | 'itemTrailingKbdsSize'>
  [key: string]: any
}

export interface ContextMenuProps<T extends ArrayOrNested<ContextMenuItem> = ArrayOrNested<ContextMenuItem>> extends ComponentBaseProps, Omit<ContextMenuRootProps, 'dir'> {
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
  /** The content of the menu. */
  content?: Omit<ContextMenuContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<ContextMenuContentEmits>>
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

export interface ContextMenuEmits extends ContextMenuRootEmits {}

export type ContextMenuSlots<
  A extends ArrayOrNested<ContextMenuItem> = ArrayOrNested<ContextMenuItem>,
  T extends NestedItem<A> = NestedItem<A>,
> = {
  'default': StaticSlot
  'item': StaticSlot<{ item: T, active?: boolean, index: number, ui: ComponentStyler<typeof theme> }>
  'item-leading': StaticSlot<{ item: T, active?: boolean, index: number, ui: ComponentStyler<typeof theme> }>
  'item-label': StaticSlot<{ item: T, active?: boolean, index: number }>
  'item-description': StaticSlot<{ item: T, active?: boolean, index: number }>
  'item-trailing': StaticSlot<{ item: T, active?: boolean, index: number, ui: ComponentStyler<typeof theme> }>
  'content-top': StaticSlot<{ sub: boolean }>
  'content-bottom': StaticSlot<{ sub: boolean }>
}
& DynamicSlots<MergeTypes<T>, 'label' | 'description', { active?: boolean, index: number }>
& DynamicSlots<MergeTypes<T>, 'leading' | 'trailing', { active?: boolean, index: number, ui: ComponentStyler<typeof theme> }>
</script>

<script setup lang="ts" generic="T extends ArrayOrNested<ContextMenuItem>">
import { reactivePick } from '@vueuse/core'
import { ContextMenuRoot, ContextMenuTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed, toRef } from 'vue'
import { useAppConfig } from '#imports'
import { omit, pick } from '../utils'
import { cv, merge } from '../utils/style'
import ContextMenuContent from './ContextMenuContent.vue'

const props = withDefaults(defineProps<ContextMenuProps<T>>(), {
  portal: true,
  modal: true,
  externalIcon: true,
  labelKey: 'label',
  descriptionKey: 'description',
})

const emit = defineEmits<ContextMenuEmits>()
const slots = defineSlots<ContextMenuSlots<T>>()

const appConfig = useAppConfig() as RuntimeAppConfig

const rootProps = useForwardPropsEmits(reactivePick(props, 'modal'), emit)
const contentProps = toRef(() => props.content)
const getProxySlots = () => omit(slots, ['default'])

const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.contextMenu))
  return styler(pick(props, ['size']))
})

</script>

<template>
  <ContextMenuRoot v-bind="rootProps">
    <ContextMenuTrigger v-if="!!slots.default" as-child :disabled="props.disabled" :class="props.class">
      <slot></slot>
    </ContextMenuTrigger>

    <ContextMenuContent
      v-bind="contentProps"
      :items="props.items"
      :portal="props.portal"
      :label-key="props.labelKey"
      :description-key="props.descriptionKey"
      :checked-icon="props.checkedIcon"
      :loading-icon="props.loadingIcon"
      :external-icon="props.externalIcon"
      :ui="ui"
      :ui-override="props.ui"
      :class="ui.content({ class: [props.ui?.content, !slots.default && props.class] })"
    >
      <template v-for="(_, name) in getProxySlots()" #[name]="slotProps">
        <slot :name="(name as keyof ContextMenuSlots<T>)" v-bind="slotProps"></slot>
      </template>
    </ContextMenuContent>
  </ContextMenuRoot>
</template>
