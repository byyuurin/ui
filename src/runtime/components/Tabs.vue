<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { TabsRootEmits, TabsRootProps } from 'reka-ui'
import theme from '#build/ui/tabs'
import type { AvatarProps, BadgeProps, ComponentBaseProps, ComponentUIProps, IconProps, RuntimeAppConfig } from '../types'
import type { DynamicSlots } from '../types/utils'

export interface TabsEmits extends TabsRootEmits<string | number> {}

export interface TabsItem {
  label?: string
  icon?: IconProps['name']
  avatar?: AvatarProps
  /** Display a badge on the item. */
  badge?: string | number | BadgeProps
  slot?: string
  content?: string
  /** A unique value for the tab item. Defaults to the index. */
  value?: string | number
  disabled?: boolean
  ui?: Pick<ComponentUIProps<typeof theme>, 'trigger' | 'leadingIcon' | 'leadingAvatar' | 'leadingAvatarSize' | 'label' | 'trailingBadge' | 'trailingBadgeSize' | 'content'>
  [key: string]: any
}

type SlotProps<T extends TabsItem> = (props: { item: T, index: number }) => any

export type TabsSlots<T extends TabsItem = TabsItem> = {
  'leading'?: SlotProps<T>
  'default'?: SlotProps<T>
  'trailing'?: SlotProps<T>
  'content'?: SlotProps<T>
  'list-leading': any
  'list-trailing': any
} & DynamicSlots<T, undefined, SlotProps<T>>

type ThemeVariants = VariantProps<typeof theme>

export interface TabsProps<T extends TabsItem = TabsItem> extends ComponentBaseProps, Pick<TabsRootProps<string | number>, 'defaultValue' | 'modelValue' | 'activationMode' | 'unmountOnHide'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: TabsRootProps<string | number>['as']
  items?: T[]
  variant?: ThemeVariants['variant']
  orientation?: ThemeVariants['orientation']
  color?: ThemeVariants['color']
  size?: ThemeVariants['size']
  /** @default true */
  evenly?: boolean
  /**
   * The content of the tabs, can be disabled to prevent rendering the content.
   * @default true
   */
  content?: boolean
  /**
   * The key used to get the label from the item.
   * @default "label"
   */
  labelKey?: string
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script lang="ts" setup generic="T extends TabsItem">
import { reactivePick } from '@vueuse/core'
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { get } from '../utils'
import { cv, merge } from '../utils/style'
import Avatar from './Avatar.vue'
import Badge from './Badge.vue'
import Icon from './Icon.vue'

const props = withDefaults(defineProps<TabsProps<T>>(), {
  defaultValue: '0',
  orientation: 'horizontal',
  evenly: true,
  content: true,
  labelKey: 'label',
})

const emit = defineEmits<TabsEmits>()
const slots = defineSlots<TabsSlots<T>>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'modelValue', 'defaultValue', 'orientation', 'activationMode', 'unmountOnHide'), emit)

const appConfig = useAppConfig() as RuntimeAppConfig
const style = computed(() => {
  const ui = cv(merge(theme, appConfig.ui.tabs))
  return ui(props)
})
</script>

<template>
  <TabsRoot v-bind="rootProps" :class="style.root({ class: [props.class, props.ui?.root] })" data-part="root">
    <TabsList :class="style.list({ class: props.ui?.list })" data-part="list">
      <TabsIndicator :class="style.indicator({ class: props.ui?.indicator })" data-part="indicator" />

      <slot name="list-leading"></slot>

      <TabsTrigger
        v-for="(item, index) of items"
        :key="index"
        :value="item.value || String(index)"
        :disabled="item.disabled"
        :class="style.trigger({ class: props.ui?.trigger })"
        data-part="trigger"
      >
        <slot name="leading" :item="item" :index="index">
          <Icon
            v-if="item.icon"
            :name="item.icon"
            :class="style.leadingIcon({ class: props.ui?.leadingIcon })"
            data-part="leading-icon"
          />
          <Avatar
            v-else-if="item.avatar"
            :size="((item.ui?.leadingAvatarSize || props.ui?.leadingAvatarSize || style.leadingAvatarSize()) as AvatarProps['size'])"
            v-bind="item.avatar"
            :class="style.leadingAvatar({ class: [props.ui?.leadingAvatar, item.ui?.leadingAvatar] })"
            data-part="leading-avatar"
          />
        </slot>

        <span v-if="get(item, props.labelKey) || slots.default" :class="style.label({ class: props.ui?.label })" data-part="label">
          <slot :item="item" :index="index">{{ get(item, props.labelKey) }}</slot>
        </span>

        <slot name="trailing" :item="item" :index="index">
          <Badge
            v-if="item.badge != null"
            color="neutral"
            variant="outline"
            :size="((item.ui?.trailingBadgeSize || props.ui?.trailingBadgeSize || style.trailingBadgeSize()) as BadgeProps['size'])"
            v-bind="(typeof item.badge === 'string' || typeof item.badge === 'number') ? { label: String(item.badge) } : item.badge"
            :class="style.trailingBadge({ class: [props.ui?.trailingBadge, item.ui?.trailingBadge] })"
            data-part="trailing-badge"
          />
        </slot>
      </TabsTrigger>

      <slot name="list-trailing"></slot>
    </TabsList>

    <template v-if="props.content">
      <TabsContent
        v-for="(item, index) of items"
        :key="index"
        :value="item.value || String(index)"
        :class="style.content({ class: props.ui?.content })"
        data-part="content"
      >
        <slot :name="((item.slot || 'content') as keyof TabsSlots<T>)" :item="(item as Extract<T, { slot: string }>)" :index="index">
          {{ item.content }}
        </slot>
      </TabsContent>
    </template>
  </TabsRoot>
</template>
