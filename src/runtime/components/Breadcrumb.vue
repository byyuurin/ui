<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { breadcrumb } from '../theme'
import type { ComponentAttrs, DynamicSlots, LinkProps } from '../types'

type SlotProps<T> = (props: { item: T, index: number, active?: boolean }) => any

export type BreadcrumbSlots<T extends { slot?: string }> = {
  'item'?: SlotProps<T>
  'item-prefix'?: SlotProps<T>
  'item-label'?: SlotProps<T>
  'item-suffix'?: SlotProps<T>
  'separator'?: (props?: {}) => any
} & DynamicSlots<T, SlotProps<T>>

export interface BreadcrumbItem extends Omit<LinkProps, 'raw' | 'custom'> {
  label?: string
  icon?: string
  slot?: string
}

export interface BreadcrumbProps<T> extends ComponentAttrs<typeof breadcrumb> {
  /**
   * The element or component this component should render as.
   * @default 'nav'
   */
  as?: PrimitiveProps['as']
  dir?: 'rtl' | 'ltr'
  items?: T[]
  /**
   * The icon to use as a separator.
   * @default app.icons.right
   */
  separatorIcon?: string
  /**
   * The key used to get the label from the item.
   * @default 'label'
   */
  labelKey?: string
}
</script>

<script setup lang="ts" generic="T extends BreadcrumbItem">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'
import { get, pickLinkProps } from '../utils'
import Link from './Link.vue'
import LinkBase from './LinkBase.vue'

const props = withDefaults(defineProps<BreadcrumbProps<T>>(), {
  as: 'nav',
  labelKey: 'label',
})

const slots = defineSlots<BreadcrumbSlots<T>>()

const { theme, createStyler } = useTheme()

const separatorIcon = computed(() => props.separatorIcon || (props.dir === 'rtl' ? theme.value.app.icons.left : theme.value.app.icons.right))

const style = computed(() => {
  const styler = createStyler(theme.value.breadcrumb)
  return styler(props)
})
</script>

<template>
  <Primitive :as="props.as" aria-label="breadcrumb" :class="style.root({ class: [props.class, props.ui?.root] })">
    <ol :class="style.list({ class: props.ui?.list })">
      <template v-for="(item, index) in props.items" :key="index">
        <li :class="style.item({ class: props.ui?.item })">
          <Link v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(item)" custom>
            <LinkBase
              v-bind="slotProps"
              as="span"
              :aria-current="active && (index === items!.length - 1) ? 'page' : undefined"
              :class="style.link({ class: props.ui?.link, active: index === items!.length - 1, disabled: item.disabled, to: !!item.to })"
            >
              <slot :name="item.slot || 'item'" :item="item" :index="index">
                <slot :name="`${item.slot || 'item'}-prefix`">
                  <span v-if="item.icon" :class="style.linkPrefixIcon({ class: [item.icon, props.ui?.linkPrefixIcon] })"></span>
                </slot>

                <span v-if="get(item, props.labelKey) || slots[`${item.slot || 'item'}-label`]" :class="style.linkLabel({ class: props.ui?.linkLabel })">
                  <slot :name="`${item.slot || 'item'}-label`" :item="item" :active="index === items!.length - 1" :index="index">
                    {{ get(item, props.labelKey) }}
                  </slot>
                </span>

                <slot :name="`${item.slot || 'item'}-suffix`" :item="item" :active="index === items!.length - 1" :index="index"></slot>
              </slot>
            </LinkBase>
          </Link>
        </li>

        <li v-if="index < items!.length - 1" role="presentation" aria-hidden="true" :class="style.separator({ class: props.ui?.separator })">
          <slot name="separator">
            <span :class="style.separatorIcon({ class: [separatorIcon, props.ui?.separatorIcon] })"></span>
          </slot>
        </li>
      </template>
    </ol>
  </Primitive>
</template>
