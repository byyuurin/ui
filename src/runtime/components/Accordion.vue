<script lang="ts">
import type { AccordionRootEmits, AccordionRootProps } from 'reka-ui'
import type { accordion } from '../theme'
import type { ComponentAttrs, DynamicSlots } from '../types'

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

export interface AccordionProps<T extends AccordionItem = AccordionItem> extends ComponentAttrs<typeof accordion>, Pick<AccordionRootProps, 'as' | 'collapsible' | 'defaultValue' | 'modelValue' | 'type' | 'disabled' | 'unmountOnHide'> {
  items?: T[]
  /**
   * The icon displayed on the right side of the trigger.
   * @default app.icons.chevronDown
   */
  trailingIcon?: string
  labelKey?: string
}
</script>

<script setup lang="ts" generic="T extends AccordionItem">
import { reactivePick } from '@vueuse/core'
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'
import { get } from '../utils'

const props = withDefaults(defineProps<AccordionProps<T>>(), {
  type: 'single',
  collapsible: true,
  unmountOnHide: true,
  labelKey: 'label',
})

const emit = defineEmits<AccordionEmits>()
const slots = defineSlots<AccordionSlots<T>>()
const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'collapsible', 'defaultValue', 'disabled', 'modelValue', 'type', 'unmountOnHide'), emit)

const { theme, generateStyle } = useTheme()
const style = computed(() => generateStyle('accordion', props))
</script>

<template>
  <AccordionRoot v-bind="rootProps" :class="style.root({ class: [props.class, props.ui?.root] })">
    <AccordionItem
      v-for="(item, index) in props.items"
      v-slot="{ open }"
      :key="index"
      :value="item.value || String(index)"
      :disabled="item.disabled"
      :class="style.item({ class: props.ui?.item })"
    >
      <AccordionHeader :class="style.header({ class: props.ui?.header })">
        <AccordionTrigger :class="style.trigger({ class: props.ui?.trigger, disabled: item.disabled })">
          <slot name="leading" v-bind="{ item, index, open }">
            <span v-if="item.icon" :class="style.leadingIcon({ class: [item.icon, props.ui?.leadingIcon] })"></span>
          </slot>

          <span v-if="get(item, props.labelKey) || slots.default" :class="style.label({ class: props.ui?.label })">
            <slot v-bind="{ item, index, open }">{{ get(item, props.labelKey) }}</slot>
          </span>

          <slot name="trailing" v-bind="{ item, index, open }">
            <span :class="style.trailingIcon({ class: [item.trailingIcon || props.trailingIcon || theme.app.icons.chevronDown, props.ui?.trailingIcon] })"></span>
          </slot>
        </AccordionTrigger>
      </AccordionHeader>

      <AccordionContent
        v-if="item.content || slots.content || (item.slot && slots[item.slot as keyof AccordionSlots<T>]) || slots.body || (item.slot && slots[`${item.slot}-body` as keyof AccordionSlots<T>])"
        :class="style.content({ class: props.ui?.content })"
      >
        <slot :name="((item.slot || 'content') as keyof AccordionSlots<T>)" v-bind="{ item, index, open }">
          <div :class="style.body({ class: props.ui?.body })">
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
