<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/breadcrumb'
import type { AvatarProps, ComponentBaseProps, ComponentUIProps, IconProps, LinkProps, RuntimeAppConfig } from '../types'
import type { DynamicSlots, GetItemKeys, StaticSlot } from '../types/utils'

export interface BreadcrumbItem extends Omit<LinkProps, 'raw' | 'custom'> {
  label?: string
  icon?: IconProps['name']
  avatar?: AvatarProps
  slot?: string
  ui?: Pick<ComponentUIProps<typeof theme>, 'item' | 'link' | 'linkLeadingIcon' | 'linkLeadingAvatar' | 'linkLabel' | 'separator' | 'separatorIcon'>
  [key: string]: any
}

type SlotProps<T extends BreadcrumbItem> = StaticSlot<{ item: T, index: number, active?: boolean }>

export type BreadcrumbSlots<T extends BreadcrumbItem = BreadcrumbItem> = {
  'item': SlotProps<T>
  'item-leading': SlotProps<T>
  'item-label': SlotProps<T>
  'item-trailing': SlotProps<T>
  'separator': StaticSlot
} & DynamicSlots<T, 'leading' | 'label' | 'trailing', { index: number, active?: boolean }>

export interface BreadcrumbProps<T extends BreadcrumbItem = BreadcrumbItem> extends ComponentBaseProps {
  /**
   * The element or component this component should render as.
   * @default "nav"
   */
  as?: PrimitiveProps['as']
  items?: T[]
  /**
   * The icon to use as a separator.
   * @default app.icons.chevronRight
   */
  separatorIcon?: string
  /**
   * The key used to get the label from the item.
   * @default "label"
   */
  labelKey?: GetItemKeys<T>
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script setup lang="ts" generic="T extends BreadcrumbItem">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { get, pickLinkProps } from '../utils'
import { cv, merge } from '../utils/style'
import Avatar from './Avatar.vue'
import Icon from './Icon.vue'
import Link from './Link.vue'
import LinkBase from './LinkBase.vue'

const props = withDefaults(defineProps<BreadcrumbProps<T>>(), {
  as: 'nav',
  labelKey: 'label',
})

const slots = defineSlots<BreadcrumbSlots<T>>()

const { dir } = useLocale()
const appConfig = useAppConfig() as RuntimeAppConfig

const separatorIcon = computed(() => props.separatorIcon || (dir.value === 'rtl' ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight))

const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.breadcrumb))
  return styler(props)
})
</script>

<template>
  <Primitive :as="props.as" aria-label="breadcrumb" :class="ui.root({ class: [props.ui?.root, props.class] })" data-part="root">
    <ol :class="ui.list({ class: props.ui?.list })" data-part="list">
      <template v-for="(item, index) in props.items" :key="index">
        <li :class="ui.item({ class: [props.ui?.item, item.ui?.item] })" data-part="item">
          <Link v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(item)" custom>
            <LinkBase
              v-bind="slotProps"
              as="span"
              :aria-current="active && (index === items!.length - 1) ? 'page' : undefined"
              :class="ui.link({ class: [props.ui?.link, item.ui?.link, item.class], active: index === items!.length - 1, disabled: item.disabled, to: !!item.to })"
              data-part="link"
            >
              <slot :name="((item.slot || 'item') as keyof BreadcrumbSlots<T>)" :item="(item as Extract<T, { slot: string; }>)" :index="index">
                <slot :name="(`${item.slot || 'item'}-leading` as keyof BreadcrumbSlots<T>)" :item="(item as Extract<T, { slot: string; }>)" :active="index === items!.length - 1" :index="index">
                  <Icon
                    v-if="item.icon"
                    :name="item.icon"
                    :class="ui.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, item.ui?.linkLeadingIcon], active: index === items!.length - 1 })"
                    data-part="link-leading-icon"
                  />
                  <Avatar
                    v-else-if="item.avatar"
                    :size="((props.ui?.linkLeadingAvatarSize || ui.linkLeadingAvatarSize()) as AvatarProps['size'])"
                    v-bind="item.avatar"
                    :class="ui.linkLeadingAvatar({ class: [props.ui?.linkLeadingAvatar, item.ui?.linkLeadingAvatar], active: index === items!.length - 1 })"
                    data-part="link-leading-avatar"
                  />
                </slot>

                <span v-if="get(item, props.labelKey as string) || slots[(`${item.slot || 'item'}-label` as keyof BreadcrumbSlots<T>)]" :class="ui.linkLabel({ class: [props.ui?.linkLabel, item.ui?.linkLabel] })" data-part="link-label">
                  <slot :name="(`${item.slot || 'item'}-label` as keyof BreadcrumbSlots<T>)" :item="(item as Extract<T, { slot: string; }>)" :active="index === items!.length - 1" :index="index">
                    {{ get(item, props.labelKey as string) }}
                  </slot>
                </span>

                <slot :name="(`${item.slot || 'item'}-trailing` as keyof BreadcrumbSlots<T>)" :item="(item as Extract<T, { slot: string; }>)" :active="index === items!.length - 1" :index="index"></slot>
              </slot>
            </LinkBase>
          </Link>
        </li>

        <li v-if="index < items!.length - 1" role="presentation" aria-hidden="true" :class="ui.separator({ class: [props.ui?.separator, item.ui?.separator] })" data-part="separator">
          <slot name="separator">
            <Icon :name="separatorIcon" :class="ui.separatorIcon({ class: [props.ui?.separatorIcon, item.ui?.separatorIcon] })" data-part="separator-icon" />
          </slot>
        </li>
      </template>
    </ol>
  </Primitive>
</template>
