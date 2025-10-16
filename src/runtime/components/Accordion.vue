<script lang="ts">
import type { AccordionRootEmits, AccordionRootProps, PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/accordion'
import type { ComponentBaseProps, ComponentUIProps, IconProps, RuntimeAppConfig } from '../types'
import type { DynamicSlots, GetItemKeys, StaticSlot } from '../types/utils'

export interface AccordionEmits extends AccordionRootEmits {}

export interface AccordionItem extends ComponentBaseProps {
  label?: string
  icon?: IconProps['name']
  trailingIcon?: IconProps['name']
  slot?: string
  content?: string
  /** A unique value for the accordion item. Defaults to the index. */
  value?: string
  disabled?: boolean
  ui?: Pick<ComponentUIProps<typeof theme>, 'item' | 'header' | 'trigger' | 'leadingIcon' | 'label' | 'trailingIcon' | 'content' | 'body'>
  [key: string]: any
}

type SlotProps<T extends AccordionItem> = StaticSlot<{ item: T, index: number, open: boolean }>

export type AccordionSlots<T extends AccordionItem = AccordionItem> = {
  default: SlotProps<T>
  leading: SlotProps<T>
  trailing: SlotProps<T>
  content: SlotProps<T>
  body: SlotProps<T>
} & DynamicSlots<T, 'body', { index: number, open: boolean }>

export interface AccordionProps<T extends AccordionItem = AccordionItem> extends ComponentBaseProps, Pick<AccordionRootProps, 'collapsible' | 'defaultValue' | 'modelValue' | 'type' | 'disabled' | 'unmountOnHide'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  items?: T[]
  /**
   * The icon displayed on the right side of the trigger.
   * @default app.icons.chevronDown
   */
  trailingIcon?: IconProps['name']
  /**
   * The key used to get the label from the item.
   * @default "label"
   */
  labelKey?: GetItemKeys<T>
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script setup lang="ts" generic="T extends AccordionItem">
import { reactivePick } from '@vueuse/core'
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { get } from '../utils'
import { cv, merge } from '../utils/style'
import Icon from './Icon.vue'

const props = withDefaults(defineProps<AccordionProps<T>>(), {
  type: 'single',
  collapsible: true,
  unmountOnHide: true,
  labelKey: 'label',
})

const emit = defineEmits<AccordionEmits>()
const slots = defineSlots<AccordionSlots<T>>()
const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'collapsible', 'defaultValue', 'disabled', 'modelValue', 'unmountOnHide'), emit)

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.accordion))
  return styler(props)
})
</script>

<template>
  <AccordionRoot v-bind="rootProps" :class="ui.root({ class: [props.ui?.root, props.class] })" data-part="root">
    <AccordionItem
      v-for="(item, index) in props.items"
      v-slot="{ open }"
      :key="index"
      :value="item.value || String(index)"
      :disabled="item.disabled"
      :class="ui.item({ class: [props.ui?.item, item.ui?.item, item.class] })"
      data-part="item"
    >
      <AccordionHeader as="div" :class="ui.header({ class: [props.ui?.header, item.ui?.header] })" data-part="header">
        <AccordionTrigger :class="ui.trigger({ class: [props.ui?.trigger, item.ui?.trigger], disabled: item.disabled })" data-part="trigger">
          <slot name="leading" v-bind="{ item, index, open }">
            <Icon v-if="item.icon" :name="item.icon" :class="ui.leadingIcon({ class: [props.ui?.leadingIcon, item.ui?.leadingIcon] })" data-part="leading-icon" />
          </slot>

          <span v-if="get(item, props.labelKey as string) || !!slots.default" :class="ui.label({ class: [props.ui?.label, item.ui?.label] })" data-part="label">
            <slot v-bind="{ item, index, open }">{{ get(item, props.labelKey as string) }}</slot>
          </span>

          <slot name="trailing" v-bind="{ item, index, open }">
            <Icon :name="item.trailingIcon || props.trailingIcon || appConfig.ui.icons.chevronDown" :class="ui.trailingIcon({ class: [props.ui?.trailingIcon, item.ui?.trailingIcon] })" data-part="trailing-icon" />
          </slot>
        </AccordionTrigger>
      </AccordionHeader>

      <AccordionContent
        v-if="item.content || !!slots.content || (item.slot && slots[item.slot as keyof AccordionSlots<T>]) || !!slots.body || (item.slot && slots[`${item.slot}-body` as keyof AccordionSlots<T>])"
        :class="ui.content({ class: [props.ui?.content, item.ui?.content] })"
        data-part="content"
      >
        <slot :name="((item.slot || 'content') as keyof AccordionSlots<T>)" :item="(item as Extract<T, { slot: string; }>)" :index="index" :open="open">
          <div :class="ui.body({ class: [props.ui?.body, item.ui?.body] })" data-part="body">
            <slot :name="((item.slot ? `${item.slot}-body` : 'body') as keyof AccordionSlots<T>)" :item="(item as Extract<T, { slot: string; }>)" :index="index" :open="open">
              {{ item.content }}
            </slot>
          </div>
        </slot>
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>

<style>
@keyframes accordion-up {
  from {
    height: var(--reka-accordion-content-height);
  }
  to {
    height: 0;
  }
}

@keyframes accordion-down {
  from {
    height: 0;
  }
  to {
    height: var(--reka-accordion-content-height);
  }
}
</style>
