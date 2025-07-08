<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { AccordionRootProps, NavigationMenuContentEmits, NavigationMenuContentProps, NavigationMenuRootEmits, NavigationMenuRootProps } from 'reka-ui'
import type { navigationMenu } from '../theme'
import type { ArrayOrNested, ChipProps, ComponentAttrs, DynamicSlots, EmitsToProps, LinkProps, MergeTypes, NestedItem, PopoverProps, TooltipProps } from '../types'

export interface NavigationMenuChildItem extends Omit<NavigationMenuItem, 'children' | 'type'> {
  /** Description is only used when `orientation` is `horizontal`. */
  description?: string
  [key: string]: any
}

export interface NavigationMenuItem extends Omit<LinkProps, 'type' | 'raw' | 'custom'> {
  label?: string
  icon?: string
  /**
   * Display a chip on the item.
   * `{ size: 'xs', variant: 'outline' }`
   */
  chip?: string | number | ChipProps
  /**
   * Display a tooltip on the item when the menu is collapsed with the label of the item.
   * This has priority over the global `tooltip` prop.
   */
  tooltip?: boolean | TooltipProps
  /**
   * Display a popover on the item when the menu is collapsed with the children list.
   * This has priority over the global `popover` prop.
   */
  popover?: boolean | PopoverProps
  trailingIcon?: string
  /**
   * The type of the item.
   * The `label` type only works on `vertical` orientation.
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
  ui?: Pick<ComponentAttrs<typeof navigationMenu>['ui'] & {}, 'item' | 'linkLeadingIcon' | 'linkLabel' | 'linkLabelExternalIcon' | 'linkTrailing' | 'linkTrailingChip' | 'linkTrailingIcon' | 'label' | 'link' | 'content' | 'childList' | 'childLabel' | 'childItem' | 'childLink' | 'childLinkIcon' | 'childLinkWrapper' | 'childLinkLabel' | 'childLinkLabelExternalIcon' | 'childLinkDescription'>
  class?: ComponentAttrs<typeof navigationMenu>['class']
  [key: string]: any
}

export interface NavigationMenuEmits extends NavigationMenuRootEmits {}

type SlotProps<T extends NavigationMenuItem> = (props: { item: T, index: number, active?: boolean }) => any

export type NavigationMenuSlots<
  T extends ArrayOrNested<NavigationMenuItem> = ArrayOrNested<NavigationMenuItem>,
  I extends NestedItem<T> = NestedItem<T>,
> = {
  'item': SlotProps<I>
  'item-leading': SlotProps<I>
  'item-label': SlotProps<I>
  'item-trailing': SlotProps<I>
  'item-content': SlotProps<I>
  'list-leading': (props?: {}) => any
  'list-trailing': (props?: {}) => any
} & DynamicSlots<MergeTypes<I>, 'leading' | 'label' | 'trailing' | 'content', SlotProps<I>>

type NavigationMenuVariants = VariantProps<typeof navigationMenu>

export interface NavigationMenuProps<T extends ArrayOrNested<NavigationMenuItem> = ArrayOrNested<NavigationMenuItem>> extends
  ComponentAttrs<typeof navigationMenu>,
  Pick<NavigationMenuRootProps, 'as' | 'modelValue' | 'defaultValue' | 'delayDuration' | 'disableClickTrigger' | 'disableHoverTrigger' | 'skipDelayDuration' | 'disablePointerLeaveClose' | 'unmountOnHide'>,
  Pick<AccordionRootProps, 'disabled' | 'type' | 'collapsible'> {
  /**
   * The icon displayed to open the menu.
   * @default app.icons.chevronDown
   */
  trailingIcon?: string
  /**
   * The icon displayed when the item is an external link.
   * Set to `false` to hide the external icon.
   * @default app.icons.external
   */
  externalIcon?: boolean | string
  items?: T
  variant?: NavigationMenuVariants['variant']
  /**
   * The orientation of the menu.
   * @default 'horizontal'
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
   * `{ delayDuration: 0, content: { side: 'right' } }`{lang="ts-type"}
   * @default true
   */
  tooltip?: boolean | TooltipProps
  /**
   * Display a popover on the items when the menu is collapsed with the children list.
   * `{ mode: 'hover', content: { side: 'right', align: 'start', alignOffset: 2 } }`{lang="ts-type"}
   * @default true
   */
  popover?: boolean | PopoverProps
  /** Display a line next to the active item. */
  highlight?: boolean
  /** The content of the menu. */
  content?: Omit<NavigationMenuContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<NavigationMenuContentEmits>>
  /**
   * The orientation of the content.
   * Only works when `orientation` is `horizontal`.
   * @default 'horizontal'
   */
  contentOrientation?: NavigationMenuVariants['contentOrientation']
  /**
   * Display an arrow alongside the menu.
   * @default false
   */
  arrow?: boolean
  /**
   * The key used to get the label from the item.
   * @default 'label'
   */
  labelKey?: string
}
</script>

<script setup lang="ts" generic="T extends ArrayOrNested<NavigationMenuItem>">
import { createReusableTemplate, reactivePick } from '@vueuse/core'
import { defu } from 'defu'
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuRoot, NavigationMenuTrigger, NavigationMenuViewport, useForwardPropsEmits } from 'reka-ui'
import { computed, toRef } from 'vue'
import { useTheme } from '../composables/useTheme'
import { get, isArrayOfArray, pickLinkProps } from '../utils'
import Chip from './Chip.vue'
import Link from './Link.vue'
import LinkBase from './LinkBase.vue'
import Popover from './Popover.vue'
import Tooltip from './Tooltip.vue'

const props = withDefaults(defineProps<NavigationMenuProps<T>>(), {
  orientation: 'horizontal',
  contentOrientation: 'horizontal',
  externalIcon: true,
  delayDuration: 0,
  type: 'multiple',
  collapsible: true,
  unmountOnHide: true,
  labelKey: 'label',
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

const lists = computed<NavigationMenuItem[][]>(() => props.items?.length ? (isArrayOfArray(props.items) ? props.items : [props.items]) : [])

const { theme, generateStyle } = useTheme()
const style = computed(() => generateStyle('navigationMenu', props))

function getAccordionDefaultValue(list: NavigationMenuItem[], level = 0) {
  const indexes = list.reduce((result: string[], item, index) => {
    if (item.defaultOpen || item.open)
      result.push(item.value || (level > 0 ? `item-${level}-${index}` : `item-${index}`))

    return result
  }, [])

  return props.type === 'single' ? indexes[0] : indexes
}
</script>

<template>
  <DefineLinkTemplate v-slot="{ item, active, index }">
    <slot :name="((item.slot || 'item') as keyof NavigationMenuSlots<T>)" :item="item" :index="index">
      <slot :name="(`${item.slot || 'item'}-leading` as keyof NavigationMenuSlots<T>)" :item="item" :active="active" :index="index">
        <i v-if="item.icon" :class="style.linkLeadingIcon({ class: [item.icon, props.ui?.linkLeadingIcon], active, disabled: !!item.disabled })" data-part="link-leading-icon"></i>
      </slot>

      <span
        v-if="(!props.collapsed || props.orientation !== 'vertical') && (get(item, props.labelKey) || slots[(`${item.slot || 'item'}-label` as keyof NavigationMenuSlots<T>)])"
        :class="style.linkLabel({ class: props.ui?.linkLabel })"
        data-part="link-label"
      >
        <slot :name="(`${item.slot || 'item'}-label` as keyof NavigationMenuSlots<T>)" :item="item" :active="active" :index="index">
          {{ get(item, props.labelKey) }}
        </slot>

        <i
          v-if="item.target === '_blank' && props.externalIcon !== false"
          :class="style.linkLabelExternalIcon({
            class: [typeof props.externalIcon === 'string' ? props.externalIcon : theme.app.icons.external, props.ui?.linkLabelExternalIcon],
            active,
          })"
          data-part="link-label-external-icon"
        ></i>
      </span>

      <component :is="orientation === 'vertical' && item.children?.length && !collapsed ? AccordionTrigger : 'span'" v-if="(!collapsed || orientation !== 'vertical') && (item.chip || (orientation === 'horizontal' && (item.children?.length || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as keyof NavigationMenuSlots<T>])) || (orientation === 'vertical' && item.children?.length) || item.trailingIcon || !!slots[(item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof NavigationMenuSlots<T>])" as="span" :class="style.linkTrailing({ class: [props.ui?.linkTrailing, item.ui?.linkTrailing] })" @click.stop.prevent>
        <slot :name="((item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof NavigationMenuSlots<T>)" :item="item" :active="active" :index="index">
          <Chip
            v-if="item.chip"
            variant="outline"
            v-bind="(typeof item.chip === 'string' || typeof item.chip === 'number') ? { label: String(item.chip) } : item.chip"
            :class="style.linkTrailingChip({ class: [props.ui?.linkTrailingChip, item.ui?.linkTrailingChip] })"
          />

          <i v-if="(orientation === 'horizontal' && (item.children?.length || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as keyof NavigationMenuSlots<T>])) || (orientation === 'vertical' && item.children?.length)" :class="style.linkTrailingIcon({ class: [item.trailingIcon || props.trailingIcon || theme.app.icons.chevronDown, props.ui?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })"></i>
          <i v-else-if="item.trailingIcon" :class="style.linkTrailingIcon({ class: [item.trailingIcon, props.ui?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })"></i>
        </slot>
      </component>
    </slot>
  </DefineLinkTemplate>

  <DefineItemTemplate v-slot="{ item, index, level = 0 }">
    <component
      :is="(props.orientation === 'vertical' && !props.collapsed) ? AccordionItem : NavigationMenuItem"
      as="li"
      :value="item.value || String(level > 0 ? `item-${level}-${index}` : `item-${index}`)"
    >
      <div v-if="props.orientation === 'vertical' && item.type === 'label' && !props.collapsed" :class="style.label({ class: [props.ui?.label, item.class] })" data-part="label">
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
          as-child
          :active="active || item.active"
          :disabled="item.disabled"
          @select="item.onSelect"
        >
          <Popover
            v-if="props.orientation === 'vertical' && props.collapsed && item.children?.length && (!!props.popover || !!item.popover)"
            v-bind="{ ...popoverProps, ...(typeof item.popover === 'boolean' ? {} : (item.popover || {})) }"
            :ui="{ content: style.content({ class: [props.ui?.content, item.ui?.content] }) }"
            data-part="content"
          >
            <LinkBase
              v-bind="slotProps"
              :class="style.link({
                class: [props.ui?.link, item.ui?.link, item.class],
                active: active || item.active,
                disabled: !!item.disabled,
                level: level > 0,
              })"
              data-part="link"
            >
              <ReuseLinkTemplate :item="item" :active="active || item.active" :index="index" />
            </LinkBase>

            <template #content>
              <slot :name="(`${item.slot || 'item'}-content` as keyof NavigationMenuSlots<T>)" :item="item" :active="active || item.active" :index="index">
                <ul :class="style.childList({ class: [props.ui?.childList, item.ui?.childList] })" data-part="child-list">
                  <li :class="style.childLabel({ class: [props.ui?.childLabel, item.ui?.childLabel] })">
                    {{ get(item, props.labelKey) }}
                  </li>
                  <li v-for="(childItem, childIndex) in item.children" :key="childIndex" :class="style.childItem({ class: [props.ui?.childItem, item.ui?.childItem] })" data-part="child-item">
                    <Link v-slot="{ active: childActive, ...childSlotProps }" v-bind="pickLinkProps(childItem)" custom>
                      <NavigationMenuLink as-child :active="childActive" @select="childItem.onSelect">
                        <LinkBase v-bind="childSlotProps" :class="style.childLink({ class: [props.ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })" data-part="child-link">
                          <i v-if="childItem.icon" :class="style.childLinkIcon({ class: [childItem.icon, props.ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })" data-part="child-link-icon"></i>

                          <span :class="style.childLinkLabel({ class: [props.ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })" data-part="child-link-label">
                            {{ get(childItem, props.labelKey) }}

                            <i v-if="childItem.target === '_blank' && props.externalIcon !== false" :class="style.childLinkLabelExternalIcon({ class: [typeof props.externalIcon === 'string' ? props.externalIcon : theme.app.icons.external, style.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })" data-part="child-link-label-external-icon"></i>
                          </span>
                        </LinkBase>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                </ul>
              </slot>
            </template>
          </Popover>
          <Tooltip v-else-if="props.orientation === 'vertical' && props.collapsed && (!!props.tooltip || !!item.tooltip)" :text="get(item, props.labelKey)" v-bind="{ ...tooltipProps, ...(typeof item.tooltip === 'boolean' ? {} : item.tooltip || {}) }">
            <LinkBase v-bind="slotProps" :class="style.link({ class: [props.ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })" data-part="link">
              <ReuseLinkTemplate :item="item" :active="active || item.active" :index="index" />
            </LinkBase>
          </Tooltip>
          <LinkBase v-else v-bind="slotProps" :class="style.link({ class: [props.ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: props.orientation === 'horizontal' || level > 0 })" data-part="link">
            <ReuseLinkTemplate :item="item" :active="active || item.active" :index="index" />
          </LinkBase>
        </component>

        <NavigationMenuContent
          v-if="props.orientation === 'horizontal' && (item.children?.length || slots[(`${item.slot || 'item'}-content` as keyof NavigationMenuSlots<T>)])"
          v-bind="contentProps"
          :class="style.content({ class: [props.ui?.content, item.ui?.content] })"
          data-part="content"
        >
          <slot :name="(`${item.slot || 'item'}-content` as keyof NavigationMenuSlots<T>)" :item="item" :active="active" :index="index">
            <ul :class="style.childList({ class: [props.ui?.childList, item.ui?.childList] })" data-part="child-list">
              <li v-for="(childItem, childIndex) in item.children" :key="childIndex" :class="style.childItem({ class: [props.ui?.childItem, item.ui?.childItem] })" data-part="child-item">
                <Link v-slot="{ active: childActive, ...childSlotProps }" v-bind="pickLinkProps(childItem)" custom>
                  <NavigationMenuLink as-child :active="childActive" @select="childItem.onSelect">
                    <LinkBase v-bind="childSlotProps" :class="style.childLink({ class: [props.ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })" data-part="child-link">
                      <i v-if="childItem.icon" :class="style.childLinkIcon({ class: [childItem.icon, props.ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })" data-part="child-link-icon"></i>

                      <div :class="style.childLinkWrapper({ class: [props.ui?.childLinkWrapper, item.ui?.childLinkWrapper] })" data-part="child-link-wrapper">
                        <p :class="style.childLinkLabel({ class: [props.ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })" data-part="child-link-label">
                          {{ get(childItem, props.labelKey) }}

                          <i v-if="childItem.target === '_blank' && props.externalIcon !== false" :class="style.childLinkLabelExternalIcon({ class: [typeof props.externalIcon === 'string' ? props.externalIcon : theme.app.icons.external, style.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })" data-part="child-link-label-external-icon"></i>
                        </p>
                        <p v-if="childItem.description" :class="style.childLinkDescription({ class: [props.ui?.childLinkDescription, item.ui?.childLinkDescription], active: childActive })" data-part="child-link-description">
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

      <AccordionContent v-if="props.orientation === 'vertical' && item.children?.length && !props.collapsed" :class="style.content({ class: [props.ui?.content, item.ui?.content] })" data-part="content">
        <AccordionRoot
          v-bind="({ ...accordionProps, defaultValue: getAccordionDefaultValue(item.children, level + 1) } as AccordionRootProps)"
          as="ul"
          :class="style.childList({ class: [props.ui?.childList, item.ui?.childList] })"
          data-part="child-list"
        >
          <ReuseItemTemplate
            v-for="(childItem, childIndex) in item.children"
            :key="childIndex"
            :item="childItem"
            :index="childIndex"
            :level="level + 1"
            :class="style.childItem({ class: [props.ui?.childItem, item.ui?.childItem] })"
            data-part="child-item"
          />
        </AccordionRoot>
      </AccordionContent>
    </component>
  </DefineItemTemplate>

  <NavigationMenuRoot
    v-bind="rootProps"
    :class="style.root({ class: [props.ui?.root, props.class] })"
    :data-collapsed="props.collapsed"
    data-part="root"
  >
    <slot name="list-leading"></slot>

    <template v-for="(list, listIndex) in lists" :key="`list-${listIndex}`">
      <component
        v-bind="props.orientation === 'vertical' && !props.collapsed ? { ...accordionProps, defaultValue: getAccordionDefaultValue(list) } : {}"
        :is="props.orientation === 'vertical' && !props.collapsed ? AccordionRoot : NavigationMenuList"
        as="ul"
        :class="style.list({ class: props.ui?.list })"
        data-part="list"
      >
        <ReuseItemTemplate v-for="(item, index) in list" :key="`list-${listIndex}-${index}`" :item="item" :index="index" :class="style.item({ class: [props.ui?.item, item.ui?.item] })" data-part="item" />
      </component>

      <div v-if="props.orientation === 'vertical' && listIndex < lists.length - 1" :class="style.separator({ class: props.ui?.separator })" data-part="separator"></div>
    </template>

    <slot name="list-trailing"></slot>

    <div v-if="props.orientation === 'horizontal'" :class="style.viewportWrapper({ class: props.ui?.viewportWrapper })" data-part="viewport-wrapper">
      <NavigationMenuIndicator v-if="props.arrow" :class="style.indicator({ class: props.ui?.indicator })" data-part="indicator">
        <div :class="style.arrow({ class: props.ui?.arrow })" data-part="arrow"></div>
      </NavigationMenuIndicator>

      <NavigationMenuViewport :class="style.viewport({ class: props.ui?.viewport })" data-part="viewport" />
    </div>
  </NavigationMenuRoot>
</template>
