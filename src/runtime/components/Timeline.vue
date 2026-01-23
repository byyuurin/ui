<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/timeline'
import type { AvatarProps, ComponentBaseProps, ComponentUIProps, IconProps, RuntimeAppConfig } from '../types'
import type { DynamicSlots, ExtractItem, StaticSlot } from '../types/utils'

export interface TimelineItem {
  date?: string
  title?: string
  description?: string
  icon?: IconProps['name']
  avatar?: AvatarProps
  value?: string | number
  slot?: string
  class?: ComponentBaseProps['class']
  ui?: Pick<ComponentUIProps<typeof theme>, 'item' | 'container' | 'indicator' | 'separator' | 'wrapper' | 'date' | 'title' | 'description'>
  [key: string]: any
}

type ThemeVariants = VariantProps<typeof theme>

export interface TimelineProps<T extends TimelineItem = TimelineItem> extends ComponentBaseProps {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  items: T[]
  /** @default "md" */
  size?: ThemeVariants['size']
  /** @default "primary" */
  color?: ThemeVariants['color']
  /**
   * The orientation of the Timeline.
   * @default "vertical"
   */
  orientation?: ThemeVariants['orientation']
  defaultValue?: string | number
  modelValue?: string | number
  reverse?: boolean
  ui?: ComponentUIProps<typeof theme>
}

export interface TimelineEmits {
  'update:model-value': [value: string | number]
}

export type TimelineSlots<T extends TimelineItem = TimelineItem> = {
  indicator: StaticSlot<{ item: T }>
  wrapper: StaticSlot<{ item: T }>
  date: StaticSlot<{ item: T }>
  title: StaticSlot<{ item: T }>
  description: StaticSlot<{ item: T }>
} & DynamicSlots<T, 'indicator' | 'wrapper' | 'date' | 'title' | 'description', { item: T }>

</script>

<script setup lang="ts" generic="T extends TimelineItem">
import { useVModel } from '@vueuse/core'
import { Primitive, Separator } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { pick } from '../utils'
import { cv, merge } from '../utils/style'
import Avatar from './Avatar.vue'

const props = withDefaults(defineProps<TimelineProps<T>>(), {
  orientation: 'vertical',
})

const emit = defineEmits<TimelineEmits>()
const slots = defineSlots<TimelineSlots<T>>()

const modelValue = useVModel(props, 'modelValue', emit)

const currentStepIndex = computed(() => {
  const value = modelValue.value ?? props.defaultValue

  if (typeof value === 'string')
    return props.items.findIndex((item) => item.value === value) ?? -1

  if (props.reverse)
    return value == null ? -1 : props.items.length - 1 - value

  return value ?? -1
})

function getItemState(index: number): 'active' | 'completed' | undefined {
  if (currentStepIndex.value === -1)
    return undefined

  if (index === currentStepIndex.value)
    return 'active'

  if (props.reverse)
    return index > currentStepIndex.value ? 'completed' : undefined

  return index < currentStepIndex.value ? 'completed' : undefined
}

const appConfig = useAppConfig() as RuntimeAppConfig

const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.timeline))
  return styler(pick(props, ['orientation', 'size', 'color', 'reverse']))
})
</script>

<template>
  <Primitive :as="props.as" :data-orientation="props.orientation" data-part="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div
      v-for="(item, index) in props.items"
      :key="item.value ?? index"
      data-part="item"
      :class="ui.item({ class: [props.ui?.item, item.ui?.item, item.class] })"
      :data-state="getItemState(index)"
    >
      <div data-part="container" :class="ui.container({ class: [props.ui?.container, item.ui?.container] })">
        <Avatar
          :size="props.size"
          :icon="item.icon"
          v-bind="typeof item.avatar === 'object' ? item.avatar : {}"
          :ui="{
            icon: ui.indicatorIcon({ class: props.ui?.indicatorIcon }),
            fallback: ui.indicatorFallback({ class: props.ui?.indicatorFallback }),
          }"
          data-part="indicator"
          :class="ui.indicator({ class: [props.ui?.indicator, item.ui?.indicator] })"
        >
          <slot :name="((item.slot ? `${item.slot}-indicator` : 'indicator') as keyof TimelineSlots<T>)" :item="(item as ExtractItem<T>)"></slot>
        </Avatar>

        <Separator
          v-if="index < items.length - 1"
          :orientation="props.orientation"
          data-part="separator"
          :class="ui.separator({ class: [props.ui?.separator, item.ui?.separator] })"
        />
      </div>

      <div data-part="wrapper" :class="ui.wrapper({ class: [props.ui?.wrapper, item.ui?.wrapper] })">
        <slot :name="((item.slot ? `${item.slot}-wrapper` : 'wrapper') as keyof TimelineSlots<T>)" :item="(item as ExtractItem<T>)">
          <div v-if="item.date || !!slots[(item.slot ? `${item.slot}-date` : 'date') as keyof TimelineSlots<T>]" data-part="date" :class="ui.date({ class: [props.ui?.date, item.ui?.date] })">
            <slot :name="((item.slot ? `${item.slot}-date` : 'date') as keyof TimelineSlots<T>)" :item="(item as ExtractItem<T>)">
              {{ item.date }}
            </slot>
          </div>
          <div v-if="item.title || !!slots[(item.slot ? `${item.slot}-title` : 'title') as keyof TimelineSlots<T>]" data-part="title" :class="ui.title({ class: [props.ui?.title, item.ui?.title] })">
            <slot :name="((item.slot ? `${item.slot}-title` : 'title') as keyof TimelineSlots<T>)" :item="(item as ExtractItem<T>)">
              {{ item.title }}
            </slot>
          </div>
          <div v-if="item.description || !!slots[(item.slot ? `${item.slot}-description` : 'description') as keyof TimelineSlots<T>]" data-part="description" :class="ui.description({ class: [props.ui?.description, item.ui?.description] })">
            <slot :name="((item.slot ? `${item.slot}-description` : 'description') as keyof TimelineSlots<T>)" :item="(item as ExtractItem<T>)">
              {{ item.description }}
            </slot>
          </div>
        </slot>
      </div>
    </div>
  </Primitive>
</template>
