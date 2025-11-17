<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/breadcrumb'
import type { AvatarProps, ComponentBaseProps, ComponentStyler, ComponentUIProps, IconProps, LinkProps, RuntimeAppConfig } from '../types'
import type { DynamicSlots, ExtractItem, GetItemKeys, StaticSlot } from '../types/utils'

export interface BreadcrumbItem extends Omit<LinkProps, 'raw' | 'custom'> {
  label?: string
  icon?: IconProps['name']
  avatar?: AvatarProps
  slot?: string
  ui?: Pick<ComponentUIProps<typeof theme>, 'item' | 'link' | 'linkLeadingIcon' | 'linkLeadingAvatar' | 'linkLabel' | 'separator' | 'separatorIcon'>
  [key: string]: any
}

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

export type BreadcrumbSlots<T extends BreadcrumbItem = BreadcrumbItem> = {
  'item': StaticSlot<{ item: T, index: number, active: boolean, ui: ComponentStyler<typeof theme> }>
  'item-leading': StaticSlot<{ item: T, index: number, active: boolean, ui: ComponentStyler<typeof theme> }>
  'item-label': StaticSlot<{ item: T, index: number, active: boolean }>
  'item-trailing': StaticSlot<{ item: T, index: number, active: boolean }>
  'separator': StaticSlot<{ ui: ComponentStyler<typeof theme> }>
}
& DynamicSlots<T, 'label' | 'trailing', { index: number, active: boolean }>
& DynamicSlots<T, 'leading', { index: number, active?: boolean, ui: ComponentStyler<typeof theme> }>

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
              :aria-current="(item.active ?? active) && (index === items!.length - 1) ? 'page' : undefined"
              :class="ui.link({ class: [props.ui?.link, item.ui?.link, item.class], active: item.active ?? index === items!.length - 1, disabled: item.disabled, to: !!item.to })"
              data-part="link"
            >
              <slot :name="((item.slot || 'item') as keyof BreadcrumbSlots<T>)" :item="(item as ExtractItem<T>)" :index="index" :active="item.active ?? index === items!.length - 1" :ui="ui">
                <slot :name="(`${item.slot || 'item'}-leading` as keyof BreadcrumbSlots<T>)" :item="(item as ExtractItem<T>)" :active="item.active ?? index === items!.length - 1" :index="index" :ui="ui">
                  <Icon
                    v-if="item.icon"
                    :name="item.icon"
                    :class="ui.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, item.ui?.linkLeadingIcon], active: item.active ?? index === items!.length - 1 })"
                    data-part="linkLeadingIcon"
                  />
                  <Avatar
                    v-else-if="item.avatar"
                    :size="((props.ui?.linkLeadingAvatarSize || ui.linkLeadingAvatarSize()) as AvatarProps['size'])"
                    v-bind="item.avatar"
                    :class="ui.linkLeadingAvatar({ class: [props.ui?.linkLeadingAvatar, item.ui?.linkLeadingAvatar], active: item.active ?? index === items!.length - 1 })"
                    data-part="linkLeadingAvatar"
                  />
                </slot>

                <span v-if="get(item, props.labelKey as string) || slots[(`${item.slot || 'item'}-label` as keyof BreadcrumbSlots<T>)]" :class="ui.linkLabel({ class: [props.ui?.linkLabel, item.ui?.linkLabel] })" data-part="linkLabel">
                  <slot :name="(`${item.slot || 'item'}-label` as keyof DynamicSlots<T, 'label'>)" :item="(item as ExtractItem<T>)" :active="item.active ?? index === items!.length - 1" :index="index">
                    {{ get(item, props.labelKey as string) }}
                  </slot>
                </span>

                <slot :name="(`${item.slot || 'item'}-trailing` as keyof DynamicSlots<T, 'trailing'>)" :item="(item as ExtractItem<T>)" :active="item.active ?? index === items!.length - 1" :index="index"></slot>
              </slot>
            </LinkBase>
          </Link>
        </li>

        <li v-if="index < items!.length - 1" role="presentation" aria-hidden="true" :class="ui.separator({ class: [props.ui?.separator, item.ui?.separator] })" data-part="separator">
          <slot name="separator" :ui="ui">
            <Icon :name="separatorIcon" :class="ui.separatorIcon({ class: [props.ui?.separatorIcon, item.ui?.separatorIcon] })" data-part="separatorIcon" />
          </slot>
        </li>
      </template>
    </ol>
  </Primitive>
</template>
