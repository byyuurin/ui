<script lang="ts">
import type { TooltipArrowProps, TooltipContentProps, TooltipRootEmits, TooltipRootProps } from 'reka-ui'
import type { tooltip } from '../theme'
import type { ComponentAttrs } from '../types'

export interface TooltipEmits extends TooltipRootEmits {}

export interface TooltipSlots {
  default?: (props: { open: boolean }) => any
  content?: (props: {}) => any
}

export interface TooltipProps extends ComponentAttrs<typeof tooltip>, TooltipRootProps {
  text?: string
  content?: Omit<TooltipContentProps, 'as' | 'asChild'>
  arrow?: boolean | Omit<TooltipArrowProps, 'as' | 'asChild'>
  /** @default true */
  portal?: boolean
}
</script>

<script lang="ts" setup>
import { reactivePick } from '@vueuse/core'
import { defu } from 'defu'
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed, toRef } from 'vue'
import { useTheme } from '../composables/useTheme'

const props = withDefaults(defineProps<TooltipProps>(), {
  portal: true,
})
const emit = defineEmits<TooltipEmits>()
const slots = defineSlots<TooltipSlots>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'defaultOpen', 'open', 'delayDuration', 'disableHoverableContent', 'disableClosingTrigger', 'disabled', 'ignoreNonKeyboardFocus'), emit)

const contentDefaults: TooltipContentProps = {
  side: 'bottom',
  sideOffset: 8,
  collisionPadding: 8,
}

const contentProps = toRef(() => defu(props.content, contentDefaults) as TooltipContentProps)

const arrowProps = toRef(() => props.arrow as TooltipArrowProps)

const { generateStyle } = useTheme()
const style = computed(() => generateStyle('tooltip', props))
</script>

<template>
  <TooltipRoot v-slot="{ open }" v-bind="rootProps">
    <TooltipTrigger v-if="slots.default" as-child :class="props.class">
      <slot :open="open">
      </slot>
    </TooltipTrigger>

    <TooltipPortal :disabled="!props.portal">
      <TooltipContent v-bind="contentProps" :class="style.content({ class: [!slots.default && props.class, props.ui?.content] })">
        <slot name="content">
          <span v-if="props.text" :class="style.text({ class: props.ui?.text })">{{ props.text }}</span>
        </slot>

        <TooltipArrow v-if="props.arrow" v-bind="arrowProps" :class="style.arrow({ class: props.ui?.arrow })" />
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>
