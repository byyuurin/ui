<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { TabsRootEmits, TabsRootProps } from 'reka-ui'
import type { ComponentPublicInstance } from 'vue'
import theme from '#build/ui/tabs'
import type { AvatarProps, BadgeProps, ComponentBaseProps, ComponentStyler, ComponentUIProps, IconProps, RuntimeAppConfig } from '../types'
import type { DynamicSlots, ExtractItem, GetItemKeys, StaticSlot } from '../types/utils'

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

type ThemeVariants = VariantProps<typeof theme>

export interface TabsProps<T extends TabsItem = TabsItem> extends ComponentBaseProps, Pick<TabsRootProps<string | number>, 'defaultValue' | 'modelValue' | 'activationMode' | 'unmountOnHide'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: TabsRootProps<string | number>['as']
  items?: T[]
  /** @default "pill" */
  variant?: ThemeVariants['variant']
  /**
   * The orientation of the tabs.
   * @default "horizontal"
   */
  orientation?: ThemeVariants['orientation']
  /** @default "primary" */
  color?: ThemeVariants['color']
  /** @default "md" */
  size?: ThemeVariants['size']
  /**
   * The content of the tabs, can be disabled to prevent rendering the content.
   * @default true
   */
  content?: boolean
  /**
   * The key used to get the label from the item.
   * @default "label"
   */
  labelKey?: GetItemKeys<T>
  ui?: ComponentUIProps<typeof theme>
}

export interface TabsEmits extends TabsRootEmits<string | number> {}

export type TabsSlots<T extends TabsItem = TabsItem> = {
  'leading': StaticSlot<{ item: T, index: number, ui: ComponentStyler<typeof theme> }>
  'default': StaticSlot<{ item: T, index: number }>
  'trailing': StaticSlot<{ item: T, index: number, ui: ComponentStyler<typeof theme> }>
  'content': StaticSlot<{ item: T, index: number, ui: ComponentStyler<typeof theme> }>
  'list-leading': StaticSlot
  'list-trailing': StaticSlot
} & DynamicSlots<T, undefined, { index: number, ui: ComponentStyler<typeof theme> }>

</script>

<script lang="ts" setup generic="T extends TabsItem">
import { reactivePick } from '@vueuse/core'
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed, ref } from 'vue'
import { useAppConfig } from '#imports'
import { get, pick } from '../utils'
import { cv, merge } from '../utils/style'
import Avatar from './Avatar.vue'
import Badge from './Badge.vue'
import Icon from './Icon.vue'

const props = withDefaults(defineProps<TabsProps<T>>(), {
  content: true,
  unmountOnHide: true,
  defaultValue: '0',
  orientation: 'horizontal',
  labelKey: 'label',
})

const emit = defineEmits<TabsEmits>()
const slots = defineSlots<TabsSlots<T>>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'unmountOnHide'), emit)

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.tabs))
  return styler(pick(props, ['color', 'variant', 'size', 'orientation']))
})

const triggersRef = ref<ComponentPublicInstance[]>([])

defineExpose({
  triggersRef,
})
</script>

<template>
  <TabsRoot
    v-bind="rootProps"
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    :orientation="props.orientation"
    :activation-mode="props.activationMode"
    data-part="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
  >
    <TabsList data-part="list" :class="ui.list({ class: props.ui?.list })">
      <TabsIndicator data-part="indicator" :class="ui.indicator({ class: props.ui?.indicator })" />

      <slot name="list-leading">
      </slot>

      <TabsTrigger
        v-for="(item, index) of items"
        :ref="(el) => (triggersRef[index] = el as ComponentPublicInstance)"
        :key="index"
        :value="item.value ?? String(index)"
        :disabled="item.disabled"
        data-part="trigger"
        :class="ui.trigger({ class: [props.ui?.trigger, item.ui?.trigger] })"
      >
        <slot name="leading" :item="item" :index="index" :ui="ui">
          <Icon
            v-if="item.icon"
            :name="item.icon"
            data-part="leadingIcon"
            :class="ui.leadingIcon({ class: [props.ui?.leadingIcon, item.ui?.leadingIcon] })"
          />
          <Avatar
            v-else-if="item.avatar"
            :size="((item.ui?.leadingAvatarSize || props.ui?.leadingAvatarSize || ui.leadingAvatarSize()) as AvatarProps['size'])"
            v-bind="item.avatar"
            data-part="leadingAvatar"
            :class="ui.leadingAvatar({ class: [props.ui?.leadingAvatar, item.ui?.leadingAvatar] })"
          />
        </slot>

        <span v-if="get(item, props.labelKey as string) || !!slots.default" data-part="label" :class="ui.label({ class: [props.ui?.label, item.ui?.label] })">
          <slot :item="item" :index="index">{{ get(item, props.labelKey as string) }}</slot>
        </span>

        <slot name="trailing" :item="item" :index="index" :ui="ui">
          <Badge
            v-if="item.badge !== undefined"
            color="neutral"
            variant="outline"
            :size="((item.ui?.trailingBadgeSize || props.ui?.trailingBadgeSize || ui.trailingBadgeSize()) as BadgeProps['size'])"
            v-bind="(typeof item.badge === 'string' || typeof item.badge === 'number') ? { label: item.badge } : item.badge"
            data-part="trailingBadge"
            :class="ui.trailingBadge({ class: [props.ui?.trailingBadge, item.ui?.trailingBadge] })"
          />
        </slot>
      </TabsTrigger>

      <slot name="list-trailing"></slot>
    </TabsList>

    <template v-if="props.content">
      <TabsContent
        v-for="(item, index) of items"
        :key="index"
        :value="item.value ?? String(index)"
        data-part="content"
        :class="ui.content({ class: [props.ui?.content, item.ui?.content] })"
      >
        <slot :name="((item.slot || 'content') as 'content')" :item="(item as ExtractItem<T>)" :index="index" :ui="ui">
          {{ item.content }}
        </slot>
      </TabsContent>
    </template>
  </TabsRoot>
</template>
