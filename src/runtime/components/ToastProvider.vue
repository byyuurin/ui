<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { ToastProviderProps as RekaToastProviderProps } from 'reka-ui'
import theme from '#build/ui/toast-provider'
import type { ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'
import type { StaticSlot } from '../types/utils'

type ThemeVariants = VariantProps<typeof theme>

export interface ToastProviderProps extends ComponentBaseProps, Omit<RekaToastProviderProps, 'swipeDirection'> {
  /**
   * The position on the screen to display the toasts.
   * @default "bottom-right"
   */
  position?: ThemeVariants['position']
  /**
   * Expand the toasts to show multiple toasts at once.
   * @default true
   */
  expand?: boolean
  /**
   * Whether to show the progress bar on all toasts.
   * @default true
   */
  progress?: boolean
  /**
   * Render the toaster in a portal.
   * @default true
   */
  portal?: boolean | string | HTMLElement
  /**
   * Maximum number of toasts to display at once.
   * @default 5
   */
  max?: number
  ui?: ComponentUIProps<typeof theme>
}

export interface ToasterSlots {
  default: StaticSlot
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { ToastPortal, ToastProvider as RekaToastProvider, ToastViewport, useForwardProps } from 'reka-ui'
import { computed, ref, toRef } from 'vue'
import { useAppConfig } from '#imports'
import { usePortal } from '../composables/usePortal'
import { provideToastMax, useToast } from '../composables/useToast'
import { omit, pick } from '../utils'
import { cv, merge } from '../utils/style'
import Toast from './Toast.vue'

const props = withDefaults(defineProps<ToastProviderProps>(), {
  expand: true,
  portal: true,
  duration: 5000,
  progress: true,
  max: 5,
})
defineSlots<ToasterSlots>()

const providerProps = useForwardProps(reactivePick(props, 'duration', 'label', 'swipeThreshold'))
const portalProps = usePortal(toRef(() => props.portal))

const { toasts, remove } = useToast()
provideToastMax(toRef(() => props.max))

const swipeDirection = computed(() => {
  switch (props.position) {
    case 'top-center':
      return 'up'
    case 'top-right':
    case 'bottom-right':
      return 'right'
    case 'bottom-center':
      return 'down'
    case 'top-left':
    case 'bottom-left':
      return 'left'
  }

  return 'right'
})

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.toastProvider))

  return styler({
    ...pick(props, ['position']),
    swipeDirection: swipeDirection.value,
  })
})

function onUpdateOpen(value: boolean, id: string | number) {
  if (value)
    return

  remove(id)
}

const hovered = ref(false)
const expanded = computed(() => props.expand || hovered.value)

const refs = ref<{ height: number }[]>([])

const height = computed(() => refs.value.reduce((acc, { height }) => acc + height + 16, 0))
const frontHeight = computed(() => refs.value[refs.value.length - 1]?.height || 0)

function getOffset(index: number) {
  return refs.value.slice(index + 1).reduce((acc, { height }) => acc + height + 16, 0)
}
</script>

<template>
  <RekaToastProvider :swipe-direction="swipeDirection" v-bind="providerProps">
    <slot></slot>

    <Toast
      v-for="(toast, index) of toasts"
      :key="toast.id"
      ref="refs"
      :progress="props.progress"
      v-bind="omit(toast, ['id', 'close'])"
      :data-expanded="expanded"
      :data-front="!expanded && index === toasts.length - 1"
      :style="{
        '--index': (index - toasts.length) + toasts.length,
        '--before': toasts.length - 1 - index,
        '--offset': getOffset(index),
        '--scale': expanded ? '1' : 'calc(1 - var(--before) * var(--scale-factor))',
        '--translate': expanded ? 'calc(var(--offset) * var(--translate-factor))' : 'calc(var(--before) * var(--gap))',
        '--transform': 'translateY(var(--translate)) scale(var(--scale))',
      }"
      data-part="base"
      :class="ui.base({ class: props.ui?.base })"
      @update:open="onUpdateOpen($event, toast.id)"
      @click="toast.onClick && toast.onClick(toast)"
    />

    <ToastPortal v-bind="portalProps">
      <ToastViewport
        :data-expanded="expanded"
        data-part="viewport"
        :class="ui.viewport({ class: [props.ui?.viewport, props.class] })"
        :style="{
          '--scale-factor': '0.05',
          '--translate-factor': position?.startsWith('top') ? '1px' : '-1px',
          '--gap': position?.startsWith('top') ? '16px' : '-16px',
          '--front-height': `${frontHeight}px`,
          '--height': `${height}px`,
        }"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
      />
    </ToastPortal>
  </RekaToastProvider>
</template>

<style>
@keyframes toast-collapsed-closed {
  from {
    transform: var(--transform);
  }
  to {
    transform: translateY(calc((var(--before) - var(--height)) * var(--gap)))
      scale(var(--scale));
  }
}

@keyframes toast-closed {
  from {
    transform: var(--transform);
  }
  to {
    transform: translateY(
      calc((var(--offset) - var(--height)) * var(--translate-factor))
    );
  }
}

@keyframes toast-slide-left {
  from {
    transform: translateX(0) translateY(var(--translate));
  }
  to {
    transform: translateX(-100%) translateY(var(--translate));
  }
}

@keyframes toast-slide-right {
  from {
    transform: translateX(0) translateY(var(--translate));
  }
  to {
    transform: translateX(100%) translateY(var(--translate));
  }
}
</style>
