<script lang="ts">
import type { HoverCardRootProps, PopoverArrowProps, PopoverContentEmits, PopoverContentProps, PopoverRootEmits, PopoverRootProps } from 'reka-ui'
import type { popover } from '../theme'
import type { ComponentAttrs, EmitsToProps } from '../types'

export interface PopoverEmits extends PopoverRootEmits {}

export interface PopoverSlots {
  default?: (props: { open: boolean }) => any
  content?: (props?: {}) => any
}

export interface PopoverProps extends ComponentAttrs<typeof popover>, PopoverRootProps, Pick<HoverCardRootProps, 'openDelay' | 'closeDelay'> {
  /**
   * The display mode of the popover.
   * @default "click"
   */
  mode?: 'click' | 'hover'
  /** @default { side: 'bottom', sideOffset: 8, collisionPadding: 8 } */
  content?: Omit<PopoverContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<PopoverContentEmits>>
  arrow?: boolean | Omit<PopoverArrowProps, 'as' | 'asChild'>
  /** @default true */
  portal?: boolean
  /**
   * When `false`, the popover will not close when clicking outside or pressing escape.
   * @default true
   */
  dismissible?: boolean
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { defu } from 'defu'
import { useForwardPropsEmits } from 'reka-ui'
import { HoverCard, Popover } from 'reka-ui/namespaced'
import { computed, toRef } from 'vue'
import { useTheme } from '../composables/useTheme'

const props = withDefaults(defineProps<PopoverProps>(), {
  mode: 'click',
  portal: true,
  openDelay: 0,
  closeDelay: 0,
  dismissible: true,
})
const emit = defineEmits<PopoverEmits>()
const slots = defineSlots<PopoverSlots>()

const pick = props.mode === 'hover'
  ? reactivePick(props, 'defaultOpen', 'open', 'openDelay', 'closeDelay')
  : reactivePick(props, 'defaultOpen', 'open', 'modal')

const rootProps = useForwardPropsEmits(pick, emit)
const contentProps = toRef(() => defu(props.content, { side: 'bottom', sideOffset: 8, collisionPadding: 8 }) as PopoverContentProps)

const contentEvents = computed(() => {
  if (props.dismissible)
    return {}

  return {
    pointerDownOutside: (e: Event) => e.preventDefault(),
    interactOutside: (e: Event) => e.preventDefault(),
    escapeKeyDown: (e: Event) => e.preventDefault(),
  }
})

const arrowProps = toRef(() => props.arrow as PopoverArrowProps)

const Component = computed(() => props.mode === 'hover' ? HoverCard : Popover)

const { generateStyle } = useTheme()
const style = computed(() => generateStyle('popover', props))
</script>

<template>
  <Component.Root v-slot="{ open }" v-bind="rootProps">
    <Component.Trigger v-if="!!slots.default" as-child :class="props.class">
      <slot :open="open"></slot>
    </Component.Trigger>

    <Component.Portal :disabled="!portal">
      <Component.Content
        v-bind="contentProps"
        :class="style.content({ class: [!slots.default && props.class, props.ui?.content] })"
        data-part="content"
        v-on="contentEvents"
      >
        <slot name="content"></slot>

        <Component.Arrow v-if="!!arrow" v-bind="arrowProps" :class="style.arrow({ class: props.ui?.arrow })" data-part="arrow" />
      </Component.Content>
    </Component.Portal>
  </Component.Root>
</template>
