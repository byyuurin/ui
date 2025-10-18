<script lang="ts">
import type { HoverCardRootProps, HoverCardTriggerProps, PopoverArrowProps, PopoverContentEmits, PopoverContentProps, PopoverRootEmits, PopoverRootProps } from 'reka-ui'
import theme from '#build/ui/popover'
import type { ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'
import type { EmitsToProps, StaticSlot } from '../types/utils'

export interface PopoverEmits extends PopoverRootEmits {
  'close-prevent': []
}

type PopoverMode = 'click' | 'hover'

export interface PopoverSlots<M extends PopoverMode = PopoverMode> {
  default: StaticSlot<{ open: boolean }>
  content: StaticSlot<[M] extends ['hover'] ? undefined : { close: () => void }>
  anchor: StaticSlot<[M] extends ['hover'] ? undefined : { close: () => void }>
}

export interface PopoverProps<M extends PopoverMode = PopoverMode> extends ComponentBaseProps, PopoverRootProps, Pick<HoverCardRootProps, 'openDelay' | 'closeDelay'> {
  /**
   * The display mode of the popover.
   * @default "click"
   */
  mode?: M
  /**
   * The content of the popover.
   * @default { side: 'bottom', sideOffset: 8, collisionPadding: 8 }
   */
  content?: Omit<PopoverContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<PopoverContentEmits>>
  /**
   * Display an arrow alongside the popover.
   * @default false
   */
  arrow?: boolean | Omit<PopoverArrowProps, 'as' | 'asChild'>
  /**
   * Render the popover in a portal.
   * @default true
   */
  portal?: boolean | string | HTMLElement
  /**
   * The reference (or anchor) element that is being referred to for positioning.
   *
   * If not provided will use the current component as anchor.
   */
  reference?: HoverCardTriggerProps['reference']
  /**
   * When `false`, the popover will not close when clicking outside or pressing escape.
   * @default true
   */
  dismissible?: boolean
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script setup lang="ts" generic="M extends PopoverMode">
import { reactivePick } from '@vueuse/core'
import { defu } from 'defu'
import { useForwardPropsEmits } from 'reka-ui'
import { HoverCard, Popover } from 'reka-ui/namespaced'
import { computed, toRef } from 'vue'
import { useAppConfig } from '#imports'
import { usePortal } from '../composables/usePortal'
import { cv, merge } from '../utils/style'

const props = withDefaults(defineProps<PopoverProps<M>>(), {
  mode: 'click' as never,
  portal: true,
  dismissible: true,
  openDelay: 0,
  closeDelay: 0,
})
const emit = defineEmits<PopoverEmits>()
const slots = defineSlots<PopoverSlots<M>>()

const pick = props.mode === 'hover'
  ? reactivePick(props, 'defaultOpen', 'open', 'openDelay', 'closeDelay')
  : reactivePick(props, 'defaultOpen', 'open', 'modal')

const rootProps = useForwardPropsEmits(pick, emit)
const portalProps = usePortal(toRef(() => props.portal))
const contentProps = toRef(() => defu(props.content, { side: 'bottom', sideOffset: 8, collisionPadding: 8 }) as PopoverContentProps)

const contentEvents = computed(() => {
  if (props.dismissible)
    return {}

  const events = ['pointerDownOutside', 'interactOutside', 'escapeKeyDown']

  return events.reduce((acc, curr) => {
    acc[curr] = (e: Event) => {
      e.preventDefault()
      emit('close-prevent')
    }

    return acc
  }, {} as Record<typeof events[number], (e: Event) => void>)
})

const arrowProps = toRef(() => props.arrow as PopoverArrowProps)

const Component = computed(() => props.mode === 'hover' ? HoverCard : Popover)

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.popover))
  return styler(props)
})
</script>

<template>
  <Component.Root v-slot="{ open, close }: { open: boolean, close?: () => void }" v-bind="rootProps">
    <Component.Trigger v-if="!!slots.default || !!props.reference" :reference="props.reference" as-child :class="props.class">
      <slot :open="open"></slot>
    </Component.Trigger>

    <Component.Anchor v-if="'Anchor' in Component && !!slots.anchor" as-child>
      <slot name="anchor" v-bind="((close ? { close } : {}) as any)"></slot>
    </Component.Anchor>

    <Component.Portal v-bind="portalProps">
      <Component.Content
        v-bind="contentProps"
        :class="ui.content({ class: [props.ui?.content, !slots.default && props.class] })"
        data-part="content"
        v-on="contentEvents"
      >
        <slot name="content" v-bind="((close ? { close } : {}) as any)"></slot>

        <Component.Arrow v-if="!!props.arrow" v-bind="arrowProps" :class="ui.arrow({ class: props.ui?.arrow })" data-part="arrow" />
      </Component.Content>
    </Component.Portal>
  </Component.Root>
</template>
