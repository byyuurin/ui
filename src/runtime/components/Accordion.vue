<script lang="ts">
import type { AccordionRootEmits, AccordionRootProps } from 'reka-ui'
import theme from '#build/ui/accordion'
import type { ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'
import type { DynamicSlots } from '../types/utils'

export interface AccordionEmits extends AccordionRootEmits {}

export interface AccordionItem {
  label?: string
  icon?: string
  trailingIcon?: string
  slot?: string
  content?: string
  /** A unique value for the accordion item. Defaults to the index. */
  value?: string
  disabled?: boolean
  [key: string]: any
}

type SlotProps<T extends AccordionItem> = (props: { item: T, index: number, open: boolean }) => any

export type AccordionSlots<T extends AccordionItem = AccordionItem> = {
  default?: SlotProps<T>
  leading?: SlotProps<T>
  trailing?: SlotProps<T>
  content?: SlotProps<T>
  body?: SlotProps<T>
} & DynamicSlots<T, 'body', SlotProps<T>>

export interface AccordionProps<T extends AccordionItem = AccordionItem> extends ComponentBaseProps, Pick<AccordionRootProps, 'as' | 'collapsible' | 'defaultValue' | 'modelValue' | 'type' | 'disabled' | 'unmountOnHide'> {
  items?: T[]
  /**
   * The icon displayed on the right side of the trigger.
   * @default app.icons.chevronDown
   */
  trailingIcon?: string
  labelKey?: string
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
const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'collapsible', 'defaultValue', 'disabled', 'modelValue', 'type', 'unmountOnHide'), emit)

const appConfig = useAppConfig() as RuntimeAppConfig

const style = computed(() => {
  const ui = cv(merge(theme, appConfig.ui.accordion))
  return ui(props)
})
</script>

<template>
  <AccordionRoot v-bind="rootProps" :class="style.root({ class: [props.class, props.ui?.root] })" data-part="root">
    <AccordionItem
      v-for="(item, index) in props.items"
      v-slot="{ open }"
      :key="index"
      :value="item.value || String(index)"
      :disabled="item.disabled"
      :class="style.item({ class: props.ui?.item })"
      data-part="item"
    >
      <AccordionHeader :class="style.header({ class: props.ui?.header })" data-part="header">
        <AccordionTrigger :class="style.trigger({ class: props.ui?.trigger, disabled: item.disabled })" data-part="trigger">
          <slot name="leading" v-bind="{ item, index, open }">
            <Icon v-if="item.icon" :name="item.icon" :class="style.leadingIcon({ class: props.ui?.leadingIcon })" data-part="leading-icon" />
          </slot>

          <span v-if="get(item, props.labelKey) || slots.default" :class="style.label({ class: props.ui?.label })" data-part="label">
            <slot v-bind="{ item, index, open }">{{ get(item, props.labelKey) }}</slot>
          </span>

          <slot name="trailing" v-bind="{ item, index, open }">
            <Icon :name="item.trailingIcon || props.trailingIcon || appConfig.ui.icons.chevronDown" :class="style.trailingIcon({ class: props.ui?.trailingIcon })" data-part="trailing-icon" />
          </slot>
        </AccordionTrigger>
      </AccordionHeader>

      <AccordionContent
        v-if="item.content || slots.content || (item.slot && slots[item.slot as keyof AccordionSlots<T>]) || slots.body || (item.slot && slots[`${item.slot}-body` as keyof AccordionSlots<T>])"
        :class="style.content({ class: props.ui?.content })"
        data-part="content"
      >
        <slot :name="((item.slot || 'content') as keyof AccordionSlots<T>)" v-bind="{ item, index, open }">
          <div :class="style.body({ class: props.ui?.body })" data-part="body">
            <slot :name="((item.slot ? `${item.slot}-body` : 'body') as keyof AccordionSlots<T>)" v-bind="{ item, index, open }">
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
