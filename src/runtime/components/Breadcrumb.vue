<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/breadcrumb'
import type { ComponentBaseProps, ComponentUIProps, LinkProps, RuntimeAppConfig } from '../types'
import type { DynamicSlots } from '../types/utils'

export interface BreadcrumbItem extends Omit<LinkProps, 'raw' | 'custom' | 'underline'> {
  label?: string
  icon?: string
  slot?: string
  [key: string]: any
}

type SlotProps<T extends BreadcrumbItem> = (props: { item: T, index: number, active?: boolean }) => any

export type BreadcrumbSlots<T extends BreadcrumbItem = BreadcrumbItem> = {
  'item'?: SlotProps<T>
  'item-leading'?: SlotProps<T>
  'item-label'?: SlotProps<T>
  'item-trailing'?: SlotProps<T>
  'separator'?: any
} & DynamicSlots<T, 'leading' | 'label' | 'trailing', SlotProps<T>>

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
  labelKey?: string
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

const style = computed(() => {
  const ui = cv(merge(theme, appConfig.ui.breadcrumb))
  return ui(props)
})
</script>

<template>
  <Primitive :as="props.as" aria-label="breadcrumb" :class="style.root({ class: [props.class, props.ui?.root] })" data-part="root">
    <ol :class="style.list({ class: props.ui?.list })" data-part="list">
      <template v-for="(item, index) in props.items" :key="index">
        <li :class="style.item({ class: props.ui?.item })" data-part="item">
          <Link v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(item)" custom>
            <LinkBase
              v-bind="slotProps"
              as="span"
              :aria-current="active && (index === items!.length - 1) ? 'page' : undefined"
              :class="style.link({ class: props.ui?.link, active: index === items!.length - 1, disabled: item.disabled, to: !!item.to })"
              data-part="link"
            >
              <slot :name="((item.slot || 'item') as keyof BreadcrumbSlots<T>)" :item="item" :index="index">
                <slot :name="(`${item.slot || 'item'}-leading` as keyof BreadcrumbSlots<T>)" :item="item" :active="index === items!.length - 1" :index="index">
                  <span v-if="item.icon" :class="style.linkLeadingIcon({ class: [item.icon, props.ui?.linkLeadingIcon] })" data-part="link-leading-icon"></span>
                </slot>

                <span v-if="get(item, props.labelKey) || slots[(`${item.slot || 'item'}-label` as keyof BreadcrumbSlots<T>)]" :class="style.linkLabel({ class: props.ui?.linkLabel })" data-part="link-label">
                  <slot :name="(`${item.slot || 'item'}-label` as keyof BreadcrumbSlots<T>)" :item="item" :active="index === items!.length - 1" :index="index">
                    {{ get(item, props.labelKey) }}
                  </slot>
                </span>

                <slot :name="(`${item.slot || 'item'}-trailing` as keyof BreadcrumbSlots<T>)" :item="item" :active="index === items!.length - 1" :index="index"></slot>
              </slot>
            </LinkBase>
          </Link>
        </li>

        <li v-if="index < items!.length - 1" role="presentation" aria-hidden="true" :class="style.separator({ class: props.ui?.separator })" data-part="separator">
          <slot name="separator">
            <Icon :name="separatorIcon" :class="style.separatorIcon({ class: props.ui?.separatorIcon })" data-part="separator-icon" />
          </slot>
        </li>
      </template>
    </ol>
  </Primitive>
</template>
