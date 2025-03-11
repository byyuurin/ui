<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { TabsRootEmits, TabsRootProps } from 'reka-ui'
import type { tabs } from '../theme'
import type { ComponentAttrs, DynamicSlots } from '../types'

export interface TabsEmits extends TabsRootEmits<string | number> {}

type SlotProps<T> = (props: { item: T, index: number }) => any

export type TabsSlots<T extends { slot?: string }> = {
  prefix?: SlotProps<T>
  default?: SlotProps<T>
  suffix?: SlotProps<T>
  content?: SlotProps<T>
} & DynamicSlots<T, SlotProps<T>>

export interface TabsItem {
  label?: string
  icon?: string
  slot?: string
  content?: string
  /** A unique value for the tab item. Defaults to the index. */
  value?: string | number
  disabled?: boolean
}

type TabsVariants = VariantProps<typeof tabs>

export interface TabsProps<T> extends ComponentAttrs<typeof tabs>, Pick<TabsRootProps<string | number>, 'defaultValue' | 'modelValue' | 'activationMode' | 'unmountOnHide'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: TabsRootProps<string | number>['as']
  items?: T[]
  variant?: TabsVariants['variant']
  orientation?: TabsVariants['orientation']
  size?: TabsVariants['size']
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
}
</script>

<script lang="ts" setup generic="T extends TabsItem">
import { reactivePick } from '@vueuse/core'
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'
import { get } from '../utils'

const props = withDefaults(defineProps<TabsProps<T>>(), {
  defaultValue: '0',
  variant: 'solid',
  orientation: 'horizontal',
  evenly: true,
  content: true,
  labelKey: 'label',
})

const emit = defineEmits<TabsEmits>()
const slots = defineSlots<TabsSlots<T>>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'modelValue', 'defaultValue', 'orientation', 'activationMode', 'unmountOnHide'), emit)

const { theme, createStyler } = useTheme()
const style = computed(() => {
  const styler = createStyler(theme.value.tabs)
  return styler(props)
})
</script>

<template>
  <TabsRoot v-bind="rootProps" :class="style.root({ class: [props.class, props.ui?.root] })">
    <TabsList :class="style.list({ class: props.ui?.list })">
      <TabsIndicator :class="style.indicator({ class: props.ui?.indicator })" />

      <TabsTrigger
        v-for="(item, index) of items"
        :key="index"
        :value="item.value || String(index)"
        :disabled="item.disabled"
        :class="style.trigger({ class: props.ui?.trigger })"
      >
        <slot name="prefix" :item="item" :index="index">
          <span v-if="item.icon" :class="style.prefixIcon({ class: [item.icon, props.ui?.prefixIcon] })"></span>
        </slot>

        <span v-if="get(item, props.labelKey) || slots.default" :class="style.label({ class: props.ui?.label })">
          <slot :item="item" :index="index">{{ get(item, props.labelKey) }}</slot>
        </span>

        <slot name="suffix" :item="item" :index="index"></slot>
      </TabsTrigger>
    </TabsList>

    <template v-if="props.content">
      <TabsContent
        v-for="(item, index) of items"
        :key="index"
        :value="item.value || String(index)"
        :class="style.content({ class: props.ui?.content })"
      >
        <slot :name="item.slot || 'content'" :item="item" :index="index">
          {{ item.content }}
        </slot>
      </TabsContent>
    </template>
  </TabsRoot>
</template>
