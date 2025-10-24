<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { AccordionRootProps, NavigationMenuContentEmits, NavigationMenuContentProps, NavigationMenuRootEmits, NavigationMenuRootProps } from 'reka-ui'
import theme from '#build/ui/navigation-menu'
import type { AvatarProps, BadgeProps, ComponentBaseProps, ComponentStyler, ComponentUIProps, IconProps, LinkProps, PopoverProps, RuntimeAppConfig, TooltipProps } from '../types'
import type { ArrayOrNested, DynamicSlots, EmitsToProps, GetItemKeys, MergeTypes, NestedItem, StaticSlot } from '../types/utils'

export interface NavigationMenuChildItem extends Omit<NavigationMenuItem, 'type' | 'ui'> {
  /** Description is only used when `orientation` is `horizontal`. */
  description?: string
  [key: string]: any
}

export interface NavigationMenuItem extends ComponentBaseProps, Omit<LinkProps, 'type' | 'raw' | 'custom'> {
  label?: string
  icon?: IconProps['name']
  avatar?: AvatarProps
  /**
   * Display a chip on the item.
   * `{ size: 'xs', variant: 'outline' }`
   */
  badge?: string | number | BadgeProps
  /**
   * Display a tooltip on the item when the menu is collapsed with the label of the item.
   *
   * This has priority over the global `tooltip` prop.
   */
  tooltip?: boolean | TooltipProps
  /**
   * Display a popover on the item when the menu is collapsed with the children list.
   *
   * This has priority over the global `popover` prop.
   */
  popover?: boolean | PopoverProps
  trailingIcon?: IconProps['name']
  /**
   * The type of the item.
   *
   * The `label` type is only displayed in `vertical` orientation.
   *
   * The `trigger` type is used to force the item to be collapsible when its a link in `vertical` orientation.
   * @default "link"
   */
  type?: 'label' | 'trigger' | 'link'
  slot?: string
  /**
   * The value of the item. Avoid using `index` as the value to prevent conflicts in horizontal orientation with Reka UI.
   * @default `item-${index}`
   */
  value?: string
  children?: NavigationMenuChildItem[]
  defaultOpen?: boolean
  open?: boolean
  onSelect?: (e: Event) => void
  ui?: Pick<ComponentUIProps<typeof theme>, 'item' | 'linkLeadingAvatarSize' | 'linkLeadingAvatar' | 'linkLeadingIcon' | 'linkLabel' | 'linkLabelExternalIcon' | 'linkTrailing' | 'linkTrailingBadgeSize' | 'linkTrailingBadge' | 'linkTrailingIcon' | 'label' | 'link' | 'content' | 'childList' | 'childLabel' | 'childItem' | 'childLink' | 'childLinkIcon' | 'childLinkWrapper' | 'childLinkLabel' | 'childLinkLabelExternalIcon' | 'childLinkDescription'>
  [key: string]: any
}

type ThemeVariants = VariantProps<typeof theme>

export interface NavigationMenuProps<T extends ArrayOrNested<NavigationMenuItem> = ArrayOrNested<NavigationMenuItem>> extends
  ComponentBaseProps,
  Pick<NavigationMenuRootProps, 'modelValue' | 'defaultValue' | 'delayDuration' | 'disableClickTrigger' | 'disableHoverTrigger' | 'skipDelayDuration' | 'disablePointerLeaveClose' | 'unmountOnHide'>,
  Pick<AccordionRootProps, 'disabled' | 'type' | 'collapsible'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: NavigationMenuRootProps['as']
  /**
   * The icon displayed to open the menu.
   * @default app.icons.chevronDown
   */
  trailingIcon?: IconProps['name']
  /**
   * The icon displayed when the item is an external link.
   * Set to `false` to hide the external icon.
   * @default app.icons.external
   */
  externalIcon?: boolean | IconProps['name']
  items?: T
  /** @default "primary" */
  color?: ThemeVariants['color']
  /** @default "pill" */
  variant?: ThemeVariants['variant']
  /**
   * The orientation of the menu.
   * @default "horizontal"
   */
  orientation?: NavigationMenuRootProps['orientation']
  /**
   * Collapse the navigation menu to only show icons.
   * Only works when `orientation` is `vertical`.
   * @default false
   */
  collapsed?: boolean
  /**
   * Display a tooltip on the items when the menu is collapsed with the label of the item.
   * @default true
   */
  tooltip?: boolean | TooltipProps
  /**
   * Display a popover on the items when the menu is collapsed with the children list.
   * @default true
   */
  popover?: boolean | PopoverProps
  /** Display a line next to the active item. */
  highlight?: boolean
  /** @default "primary" */
  highlightColor?: ThemeVariants['color']
  /** The content of the menu. */
  content?: Omit<NavigationMenuContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<NavigationMenuContentEmits>>
  /**
   * The orientation of the content.
   * Only works when `orientation` is `horizontal`.
   * @default "horizontal"
   */
  contentOrientation?: ThemeVariants['contentOrientation']
  /**
   * Display an arrow alongside the menu.
   * @default false
   */
  arrow?: boolean
  /**
   * The key used to get the label from the item.
   * @default "label"
   */
  labelKey?: GetItemKeys<T>
  ui?: ComponentUIProps<typeof theme>
}

export interface NavigationMenuEmits extends NavigationMenuRootEmits {}

type SlotProps<T extends NavigationMenuItem> = StaticSlot<{ item: T, index: number, active: boolean, ui: ComponentStyler<typeof theme> }>

export type NavigationMenuSlots<
  A extends ArrayOrNested<NavigationMenuItem> = ArrayOrNested<NavigationMenuItem>,
  T extends NestedItem<A> = NestedItem<A>,
> = {
  'item': SlotProps<T>
  'item-leading': SlotProps<T>
  'item-label': StaticSlot<{ item: T, index: number, active: boolean }>
  'item-trailing': SlotProps<T>
  'item-content': SlotProps<T> & { close?: () => void }
  'list-leading': StaticSlot
  'list-trailing': StaticSlot
}
& DynamicSlots<MergeTypes<T>, 'label', { index: number, active: boolean }>
& DynamicSlots<MergeTypes<T>, 'leading' | 'trailing' | 'content', { index: number, active: boolean, ui: ComponentStyler<typeof theme> }>

</script>

<script setup lang="ts" generic="T extends ArrayOrNested<NavigationMenuItem>">
import { createReusableTemplate, reactivePick } from '@vueuse/core'
import { defu } from 'defu'
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuRoot, NavigationMenuTrigger, NavigationMenuViewport, useForwardPropsEmits } from 'reka-ui'
import { computed, toRef } from 'vue'
import { useAppConfig } from '#imports'
import { get, isArrayOfArray, pickLinkProps } from '../utils'
import { cv, merge } from '../utils/style'
import Avatar from './Avatar.vue'
import Badge from './Badge.vue'
import Icon from './Icon.vue'
import Link from './Link.vue'
import LinkBase from './LinkBase.vue'
import Popover from './Popover.vue'
import Tooltip from './Tooltip.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<NavigationMenuProps<T>>(), {
  orientation: 'horizontal',
  contentOrientation: 'horizontal',
  type: 'multiple',
  labelKey: 'label',
  delayDuration: 0,
  externalIcon: true,
  collapsible: true,
  unmountOnHide: true,
  tooltip: true,
  popover: true,
})

const emit = defineEmits<NavigationMenuEmits>()
const slots = defineSlots<NavigationMenuSlots<T>>()

const rootProps = useForwardPropsEmits(computed(() => ({
  as: props.as,
  modelValue: props.modelValue,
  defaultValue: props.defaultValue,
  delayDuration: props.delayDuration,
  skipDelayDuration: props.skipDelayDuration,
  orientation: props.orientation,
  disableClickTrigger: props.disableClickTrigger,
  disableHoverTrigger: props.disableHoverTrigger,
  disablePointerLeaveClose: props.disablePointerLeaveClose,
  unmountOnHide: props.unmountOnHide,
})), emit)

const accordionProps = useForwardPropsEmits(reactivePick(props, 'collapsible', 'disabled', 'type', 'unmountOnHide'), emit)
const contentProps = toRef(() => props.content)
const tooltipProps = toRef(() => defu(typeof props.tooltip === 'boolean' ? {} : props.tooltip, { delayDuration: 0, content: { side: 'right' } }) as TooltipProps)
const popoverProps = toRef(() => defu(typeof props.popover === 'boolean' ? {} : props.popover, { mode: 'hover', content: { side: 'right', align: 'start', alignOffset: 2 } }) as PopoverProps)

const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate<{ item: NavigationMenuItem, index: number, active?: boolean }>()
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: NavigationMenuItem, index: number, level?: number }>({
  props: {
    item: Object,
    index: Number,
    level: Number,
  },
})

const lists = computed<NavigationMenuItem[][]>(
  () => props.items?.length
    ? isArrayOfArray(props.items)
      ? props.items
      : [props.items]
    : [],
)

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.navigationMenu))
  return styler({
    ...props,
    contentOrientation: props.orientation === 'vertical' ? undefined : props.contentOrientation,
    highlightColor: props.highlightColor || props.color,
  })
})

function getAccordionDefaultValue(list: NavigationMenuItem[], level = 0) {
  const indexes = list.reduce((acc: string[], item, index) => {
    if (item.defaultOpen || item.open)
      acc.push(item.value || (level > 0 ? `item-${level}-${index}` : `item-${index}`))

    return acc
  }, [])

  return props.type === 'single' ? indexes[0] : indexes
}
</script>

<template>
  <DefineLinkTemplate v-slot="{ item, active, index }">
    <slot :name="((item.slot || 'item') as keyof NavigationMenuSlots<T>)" :item="item" :index="index" :active="active" :ui="ui">
      <slot :name="(`${item.slot || 'item'}-leading` as keyof NavigationMenuSlots<T>)" :item="item" :active="active" :index="index" :ui="ui">
        <Avatar
          v-if="item.avatar"
          :size="((item.ui?.linkLeadingAvatarSize || props.ui?.linkLeadingAvatarSize || ui.linkLeadingAvatarSize()) as AvatarProps['size'])"
          v-bind="item.avatar"
          :class="ui.linkLeadingAvatar({ class: [props.ui?.linkLeadingAvatar, item.ui?.linkLeadingAvatar], active, disabled: item.disabled })"
          data-part="link-leading-avatar"
        />
        <Icon
          v-else-if="item.icon"
          :name="item.icon"
          :class="ui.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, item.ui?.linkLeadingIcon], active, disabled: !!item.disabled })"
          data-part="link-leading-icon"
        />
      </slot>

      <span
        v-if="(!props.collapsed || props.orientation !== 'vertical') && (get(item, props.labelKey as string) || slots[(`${item.slot || 'item'}-label` as keyof NavigationMenuSlots<T>)])"
        :class="ui.linkLabel({ class: [props.ui?.linkLabel, item.ui?.linkLabel] })"
        data-part="link-label"
      >
        <slot :name="(`${item.slot || 'item'}-label` as keyof NavigationMenuSlots<T>)" :item="item" :active="active" :index="index">
          {{ get(item, props.labelKey as string) }}
        </slot>

        <Icon
          v-if="item.target === '_blank' && props.externalIcon !== false"
          :name="typeof props.externalIcon === 'string' ? props.externalIcon : appConfig.ui.icons.external"
          :class="ui.linkLabelExternalIcon({ class: [props.ui?.linkLabelExternalIcon, item.ui?.linkLabelExternalIcon], active })"
          data-part="link-label-external-icon"
        />
      </span>

      <component
        :is="props.orientation === 'vertical' && item.children?.length && !props.collapsed ? AccordionTrigger : 'span'"
        v-if="(!props.collapsed || props.orientation !== 'vertical') && (item.badge !== undefined || (orientation === 'horizontal' && (item.children?.length || !!slots[`${item.slot || 'item'}-content` as keyof NavigationMenuSlots<T>])) || (orientation === 'vertical' && item.children?.length) || item.trailingIcon || !!slots[`${item.slot || 'item'}-trailing` as keyof NavigationMenuSlots<T>])"
        as="span"
        :class="ui.linkTrailing({ class: [props.ui?.linkTrailing, item.ui?.linkTrailing] })"
        data-part="link-trailing"
        @click.stop.prevent
      >
        <slot :name="(`${item.slot || 'item'}-trailing` as keyof NavigationMenuSlots<T>)" :item="item" :active="active" :index="index" :ui="ui">
          <Badge
            v-if="item.badge !== undefined"
            color="neutral"
            variant="outline"
            :size="((item.ui?.linkTrailingBadgeSize || props.ui?.linkTrailingBadgeSize || ui.linkTrailingBadgeSize()) as BadgeProps['size'])"
            v-bind="(typeof item.badge === 'string' || typeof item.badge === 'number') ? { label: item.badge } : item.badge"
            :class="ui.linkTrailingBadge({ class: [props.ui?.linkTrailingBadge, item.ui?.linkTrailingBadge] })"
            data-part="link-trailing-badge"
          />

          <Icon
            v-if="(orientation === 'horizontal' && (item.children?.length || !!slots[`${item.slot || 'item'}-content` as keyof NavigationMenuSlots<T>])) || (orientation === 'vertical' && item.children?.length)"
            :name="item.trailingIcon || props.trailingIcon || appConfig.ui.icons.chevronDown"
            :class="ui.linkTrailingIcon({ class: [props.ui?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })"
            data-part="link-trailing-icon"
          />
          <Icon
            v-else-if="item.trailingIcon"
            :name="item.trailingIcon"
            :class="ui.linkTrailingIcon({ class: [props.ui?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })"
            data-part="link-trailing-icon"
          />
        </slot>
      </component>
    </slot>
  </DefineLinkTemplate>

  <DefineItemTemplate v-slot="{ item, index, level = 0 }">
    <component
      :is="(props.orientation === 'vertical' && !props.collapsed) ? AccordionItem : NavigationMenuItem"
      as="li"
      :value="item.value || (level > 0 ? `item-${level}-${index}` : `item-${index}`)"
    >
      <div v-if="props.orientation === 'vertical' && item.type === 'label' && !props.collapsed" :class="ui.label({ class: [props.ui?.label, item.ui?.label, item.class] })" data-part="label">
        <ReuseLinkTemplate :item="item" :index="index" />
      </div>
      <Link
        v-else-if="item.type !== 'label'"
        v-slot="{ active, ...slotProps }"
        v-bind="(props.orientation === 'vertical' && item.children?.length && !props.collapsed && item.type === 'trigger') ? {} : pickLinkProps(item as Omit<NavigationMenuItem, 'type'>)"
        custom
      >
        <component
          :is="
            (props.orientation === 'horizontal' && (item.children?.length || slots[(`${item.slot || 'item'}-content` as keyof NavigationMenuSlots<T>)]))
              ? NavigationMenuTrigger
              : ((orientation === 'vertical' && item.children?.length && !collapsed && !(slotProps as any).href) ? AccordionTrigger : NavigationMenuLink)
          "
          :active="active || item.active"
          :disabled="item.disabled"
          as-child
          @select="item.onSelect"
        >
          <Popover
            v-if="props.orientation === 'vertical' && props.collapsed && item.children?.length && (!!props.popover || !!item.popover)"
            v-bind="{ ...popoverProps, ...(typeof item.popover === 'boolean' ? {} : (item.popover || {})) }"
            :ui="{ content: ui.content({ class: [props.ui?.content, item.ui?.content] }) }"
            data-part="content"
          >
            <LinkBase
              v-bind="slotProps"
              :class="ui.link({
                class: [props.ui?.link, item.ui?.link, item.class],
                active: active || item.active,
                disabled: item.disabled,
                level: level > 0,
              })"
              data-part="link"
            >
              <ReuseLinkTemplate :item="item" :active="active || item.active" :index="index" />
            </LinkBase>

            <template #content="{ close }">
              <slot :name="(`${item.slot || 'item'}-content` as keyof NavigationMenuSlots<T>)" :item="item" :active="active || item.active" :index="index" :ui="ui" :close="close">
                <ul :class="ui.childList({ class: [props.ui?.childList, item.ui?.childList] })" data-part="child-list">
                  <li :class="ui.childLabel({ class: [props.ui?.childLabel, item.ui?.childLabel] })" data-part="child-label">
                    {{ get(item, props.labelKey as string) }}
                  </li>
                  <li v-for="(childItem, childIndex) in item.children" :key="childIndex" :class="ui.childItem({ class: [props.ui?.childItem, item.ui?.childItem] })" data-part="child-item">
                    <Link v-slot="{ active: childActive, ...childSlotProps }" v-bind="pickLinkProps(childItem)" custom>
                      <NavigationMenuLink :active="childActive" as-child @select="childItem.onSelect">
                        <LinkBase v-bind="childSlotProps" :class="ui.childLink({ class: [props.ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })" data-part="child-link">
                          <Icon v-if="childItem.icon" :name="childItem.icon" :class="ui.childLinkIcon({ class: [props.ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })" data-part="child-link-icon" />

                          <span :class="ui.childLinkLabel({ class: [props.ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })" data-part="child-link-label">
                            {{ get(childItem, props.labelKey as string) }}

                            <Icon v-if="childItem.target === '_blank' && props.externalIcon !== false" :name="typeof props.externalIcon === 'string' ? props.externalIcon : appConfig.ui.icons.external" :class="ui.childLinkLabelExternalIcon({ class: [props.ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })" data-part="child-link-label-external-icon" />
                          </span>
                        </LinkBase>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                </ul>
              </slot>
            </template>
          </Popover>
          <Tooltip v-else-if="props.orientation === 'vertical' && props.collapsed && (!!props.tooltip || !!item.tooltip)" :text="get(item, props.labelKey as string)" v-bind="{ ...tooltipProps, ...(typeof item.tooltip === 'boolean' ? {} : item.tooltip || {}) }">
            <LinkBase v-bind="slotProps" :class="ui.link({ class: [props.ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: item.disabled, level: level > 0 })" data-part="link">
              <ReuseLinkTemplate :item="item" :active="active || item.active" :index="index" />
            </LinkBase>
          </Tooltip>
          <LinkBase v-else v-bind="slotProps" :class="ui.link({ class: [props.ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: item.disabled, level: props.orientation === 'horizontal' || level > 0 })" data-part="link">
            <ReuseLinkTemplate :item="item" :active="active || item.active" :index="index" />
          </LinkBase>
        </component>

        <NavigationMenuContent
          v-if="props.orientation === 'horizontal' && (item.children?.length || slots[(`${item.slot || 'item'}-content` as keyof NavigationMenuSlots<T>)])"
          v-bind="contentProps"
          :class="ui.content({ class: [props.ui?.content, item.ui?.content] })"
          data-part="content"
        >
          <slot :name="(`${item.slot || 'item'}-content` as keyof NavigationMenuSlots<T>)" :item="item" :active="active" :index="index" :ui="ui">
            <ul :class="ui.childList({ class: [props.ui?.childList, item.ui?.childList] })" data-part="child-list">
              <li v-for="(childItem, childIndex) in item.children" :key="childIndex" :class="ui.childItem({ class: [props.ui?.childItem, item.ui?.childItem] })" data-part="child-item">
                <Link v-slot="{ active: childActive, ...childSlotProps }" v-bind="pickLinkProps(childItem)" custom>
                  <NavigationMenuLink :active="childActive" as-child @select="childItem.onSelect">
                    <LinkBase v-bind="childSlotProps" :class="ui.childLink({ class: [props.ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })" data-part="child-link">
                      <Icon v-if="childItem.icon" :name="childItem.icon" :class="ui.childLinkIcon({ class: [props.ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })" data-part="child-link-icon" />

                      <div :class="ui.childLinkWrapper({ class: [props.ui?.childLinkWrapper, item.ui?.childLinkWrapper] })" data-part="child-link-wrapper">
                        <p :class="ui.childLinkLabel({ class: [props.ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })" data-part="child-link-label">
                          {{ get(childItem, props.labelKey as string) }}

                          <Icon v-if="childItem.target === '_blank' && props.externalIcon !== false" :name="typeof props.externalIcon === 'string' ? props.externalIcon : appConfig.ui.icons.external" :class="ui.childLinkLabelExternalIcon({ class: [props.ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })" data-part="child-link-label-external-icon" />
                        </p>
                        <p v-if="childItem.description" :class="ui.childLinkDescription({ class: [props.ui?.childLinkDescription, item.ui?.childLinkDescription], active: childActive })" data-part="child-link-description">
                          {{ childItem.description }}
                        </p>
                      </div>
                    </LinkBase>
                  </NavigationMenuLink>
                </Link>
              </li>
            </ul>
          </slot>
        </NavigationMenuContent>
      </Link>

      <AccordionContent v-if="props.orientation === 'vertical' && item.children?.length && !props.collapsed" :class="ui.content({ class: [props.ui?.content, item.ui?.content] })" data-part="content">
        <AccordionRoot
          v-bind="({ ...accordionProps, defaultValue: getAccordionDefaultValue(item.children, level + 1) } as AccordionRootProps)"
          as="ul"
          :class="ui.childList({ class: [props.ui?.childList, item.ui?.childList] })"
          data-part="child-list"
        >
          <ReuseItemTemplate
            v-for="(childItem, childIndex) in item.children"
            :key="childIndex"
            :item="childItem"
            :index="childIndex"
            :level="level + 1"
            :class="ui.childItem({ class: [props.ui?.childItem, item.ui?.childItem] })"
            data-part="child-item"
          />
        </AccordionRoot>
      </AccordionContent>
    </component>
  </DefineItemTemplate>

  <NavigationMenuRoot
    v-bind="{ ...rootProps, ...$attrs }"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    :data-collapsed="props.collapsed"
    data-part="root"
  >
    <slot name="list-leading"></slot>

    <template v-for="(list, listIndex) in lists" :key="`list-${listIndex}`">
      <component
        v-bind="props.orientation === 'vertical' && !props.collapsed ? { ...accordionProps, defaultValue: getAccordionDefaultValue(list) } : {}"
        :is="props.orientation === 'vertical' && !props.collapsed ? AccordionRoot : NavigationMenuList"
        as="ul"
        :class="ui.list({ class: props.ui?.list })"
        data-part="list"
      >
        <ReuseItemTemplate v-for="(item, index) in list" :key="`list-${listIndex}-${index}`" :item="item" :index="index" :class="ui.item({ class: [props.ui?.item, item.ui?.item] })" data-part="item" />
      </component>

      <div v-if="props.orientation === 'vertical' && listIndex < lists.length - 1" :class="ui.separator({ class: props.ui?.separator })" data-part="separator"></div>
    </template>

    <slot name="list-trailing"></slot>

    <div v-if="props.orientation === 'horizontal'" :class="ui.viewportWrapper({ class: props.ui?.viewportWrapper })" data-part="viewport-wrapper">
      <NavigationMenuIndicator v-if="props.arrow" :class="ui.indicator({ class: props.ui?.indicator })" data-part="indicator">
        <div :class="ui.arrow({ class: props.ui?.arrow })" data-part="arrow"></div>
      </NavigationMenuIndicator>

      <NavigationMenuViewport :class="ui.viewport({ class: props.ui?.viewport })" data-part="viewport" />
    </div>
  </NavigationMenuRoot>
</template>
