<script lang="ts">
import type { AccordionRootEmits, AccordionRootProps, PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/accordion'
import type { ComponentBaseProps, ComponentStyler, ComponentUIProps, IconProps, RuntimeAppConfig } from '../types'
import type { DynamicSlots, ExtractItem, GetItemKeys, StaticSlot } from '../types/utils'

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

export interface AccordionEmits extends AccordionRootEmits {}

type SlotProps<T extends AccordionItem> = StaticSlot<{ item: T, index: number, open: boolean, ui: ComponentStyler<typeof theme> }>

export type AccordionSlots<T extends AccordionItem = AccordionItem> = {
  default: StaticSlot<{ item: T, index: number, open: boolean }>
  leading: SlotProps<T>
  trailing: SlotProps<T>
  content: SlotProps<T>
  body: SlotProps<T>
} & DynamicSlots<T, 'body', { index: number, open: boolean, ui: ComponentStyler<typeof theme> }>

</script>

<script setup lang="ts" generic="T extends AccordionItem">
import { reactivePick } from '@vueuse/core'
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { get, pick } from '../utils'
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
  return styler(pick(props, ['disabled']))
})
</script>

<template>
  <AccordionRoot v-bind="rootProps" data-part="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <AccordionItem
      v-for="(item, index) in props.items"
      v-slot="{ open }"
      :key="index"
      :value="item.value || String(index)"
      :disabled="item.disabled"
      data-part="item"
      :class="ui.item({ class: [props.ui?.item, item.ui?.item, item.class] })"
    >
      <AccordionHeader as="div" data-part="header" :class="ui.header({ class: [props.ui?.header, item.ui?.header] })">
        <AccordionTrigger data-part="trigger" :class="ui.trigger({ class: [props.ui?.trigger, item.ui?.trigger], disabled: item.disabled })">
          <slot name="leading" v-bind="{ item, index, open, ui }">
            <Icon v-if="item.icon" :name="item.icon" data-part="leadingIcon" :class="ui.leadingIcon({ class: [props.ui?.leadingIcon, item.ui?.leadingIcon] })" />
          </slot>

          <span v-if="get(item, props.labelKey as string) || !!slots.default" data-part="label" :class="ui.label({ class: [props.ui?.label, item.ui?.label] })">
            <slot v-bind="{ item, index, open }">{{ get(item, props.labelKey as string) }}</slot>
          </span>

          <slot name="trailing" v-bind="{ item, index, open, ui }">
            <Icon :name="item.trailingIcon || props.trailingIcon || appConfig.ui.icons.chevronDown" data-part="trailingIcon" :class="ui.trailingIcon({ class: [props.ui?.trailingIcon, item.ui?.trailingIcon] })" />
          </slot>
        </AccordionTrigger>
      </AccordionHeader>

      <AccordionContent
        v-if="item.content || !!slots.content || (item.slot && slots[item.slot as keyof AccordionSlots<T>]) || !!slots.body || (item.slot && slots[`${item.slot}-body` as keyof AccordionSlots<T>])"
        data-part="content"
        :class="ui.content({ class: [props.ui?.content, item.ui?.content] })"
      >
        <slot :name="((item.slot || 'content') as keyof AccordionSlots<T>)" :item="(item as ExtractItem<T>)" :index="index" :open="open" :ui="ui">
          <div data-part="body" :class="ui.body({ class: [props.ui?.body, item.ui?.body] })">
            <slot :name="((item.slot ? `${item.slot}-body` : 'body') as keyof AccordionSlots<T>)" :item="(item as ExtractItem<T>)" :index="index" :open="open" :ui="ui">
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
