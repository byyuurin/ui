<script lang="ts">
import type { TooltipArrowProps, TooltipContentEmits, TooltipContentProps, TooltipRootEmits, TooltipRootProps, TooltipTriggerProps } from 'reka-ui'
import theme from '#build/ui/tooltip'
import type { ComponentBaseProps, ComponentStyler, ComponentUIProps, KbdProps, RuntimeAppConfig } from '../types'
import type { EmitsToProps, StaticSlot } from '../types/utils'

export interface TooltipProps extends ComponentBaseProps, TooltipRootProps {
  /** The text content of the tooltip. */
  text?: string
  /** The keyboard keys to display in the tooltip. */
  kbds?: KbdProps['value'][] | KbdProps[]
  /** The content of the tooltip. */
  content?: Omit<TooltipContentProps, 'as' | 'asChild'> & Partial<EmitsToProps<TooltipContentEmits>>
  /**
   * Display an arrow alongside the tooltip.
   * @default false
   */
  arrow?: boolean | Omit<TooltipArrowProps, 'as' | 'asChild'>
  /**
   * Render the tooltip in a portal.
   * @default true
   */
  portal?: boolean | string | HTMLElement
  /**
   * The reference (or anchor) element that is being referred to for positioning.
   *
   * If not provided will use the current component as anchor.
   */
  reference?: TooltipTriggerProps['reference']
  ui?: ComponentUIProps<typeof theme>
}

export interface TooltipEmits extends TooltipRootEmits {}

export interface TooltipSlots {
  default: StaticSlot<{ open: boolean }>
  content: StaticSlot<{ ui: ComponentStyler<typeof theme> }>
}
</script>

<script lang="ts" setup>
import { reactivePick } from '@vueuse/core'
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed, toRef } from 'vue'
import { useAppConfig } from '#imports'
import { usePortal } from '../composables/usePortal'
import { cv, merge } from '../utils/style'
import Kbd from './Kbd.vue'

const props = withDefaults(defineProps<TooltipProps>(), {
  portal: true,
})
const emit = defineEmits<TooltipEmits>()
const slots = defineSlots<TooltipSlots>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'defaultOpen', 'open', 'delayDuration', 'disableHoverableContent', 'disableClosingTrigger', 'ignoreNonKeyboardFocus'), emit)
const portalProps = usePortal(toRef(() => props.portal))
const contentProps = toRef(() => ({ side: 'bottom', sideOffset: 8, collisionPadding: 8, ...props.content }) as TooltipContentProps)
const arrowProps = toRef(() => props.arrow as TooltipArrowProps)

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.tooltip))
  return styler(props)
})
</script>

<template>
  <TooltipRoot v-slot="{ open }" v-bind="rootProps" :disabled="!(props.text || props.kbds?.length || !!slots.content) || props.disabled">
    <TooltipTrigger v-if="!!slots.default" as-child :class="props.class">
      <slot :open="open">
      </slot>
    </TooltipTrigger>

    <TooltipPortal v-bind="portalProps">
      <TooltipContent v-bind="contentProps" :class="ui.content({ class: [props.ui?.content, !slots.default && props.class] })" data-part="content">
        <slot name="content" :ui="ui">
          <span v-if="props.text" :class="ui.text({ class: props.ui?.text })" data-part="text">{{ props.text }}</span>

          <span v-if="props.kbds?.length" :class="ui.kbds({ class: props.ui?.kbds })" data-part="kbds">
            <Kbd
              v-for="(kbd, index) in props.kbds"
              :key="index"
              :size="((props.ui?.kbdsSize || ui.kbdsSize()) as KbdProps['size'])"
              v-bind="typeof kbd === 'string' ? { value: kbd } : kbd"
            />
          </span>
        </slot>

        <TooltipArrow v-if="props.arrow" v-bind="arrowProps" :class="ui.arrow({ class: props.ui?.arrow })" data-part="arrow" />
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>
