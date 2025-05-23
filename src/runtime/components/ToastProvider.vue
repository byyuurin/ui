<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { ToastProviderProps as RekaToastProviderProps } from 'reka-ui'
import type { toastProvider } from '../theme'
import type { ComponentAttrs, ToastProps } from '../types'

export interface ToastState extends Omit<ToastProps, 'defaultOpen'> {
  id: string | number
  onClick?: (toast: ToastState) => void
}

export interface ToasterSlots {
  default?: (props?: {}) => any
}

type ToasterVariants = VariantProps<typeof toastProvider>

export interface ToastProviderProps extends ComponentAttrs<typeof toastProvider>, Omit<RekaToastProviderProps, 'swipeDirection'> {
  /** @default "bottom-right" */
  position?: ToasterVariants['position']
  /**
   * Expand the toasts to show multiple toasts at once.
   * @default true
   */
  expand?: boolean
  /**
   * Render the toaster in a portal.
   * @default true
   */
  portal?: boolean
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { ToastPortal, ToastProvider, ToastViewport, useForwardProps } from 'reka-ui'
import { computed, ref } from 'vue'
import { useTheme } from '../composables/useTheme'
import { useToast } from '../composables/useToast'
import { omit } from '../utils'
import Toast from './Toast.vue'

const props = withDefaults(defineProps<ToastProviderProps>(), {
  position: 'bottom-right',
  expand: true,
  portal: true,
  duration: 5000,
})
defineSlots<ToasterSlots>()

const providerProps = useForwardProps(reactivePick(props, 'duration', 'label', 'swipeThreshold'))

const { toasts, remove } = useToast()

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

  console.warn(`[ToastProvider] Unknown position "${props.position}"`)

  return 'right'
})

const { generateStyle } = useTheme()
const style = computed(() => generateStyle('toastProvider', {
  ...props,
  swipeDirection: swipeDirection.value,
  clickable: false,
}))

function onUpdateOpen(value: boolean, id: string | number) {
  if (value)
    return

  remove(id)
}

const hovered = ref(false)
const expanded = computed(() => props.expand || hovered.value)

const refs = ref<{ height: number }[]>([])

const height = computed(() => refs.value.reduce((sum, { height }) => sum + height + 16, 0))
const frontHeight = computed(() => refs.value[refs.value.length - 1]?.height || 0)

function getOffset(index: number) {
  return refs.value.slice(index + 1).reduce((acc, { height }) => acc + height + 16, 0)
}
</script>

<template>
  <ToastProvider :swipe-direction="swipeDirection" v-bind="providerProps">
    <slot></slot>

    <Toast
      v-for="(toast, index) of toasts"
      :key="toast.id"
      ref="refs"
      v-bind="omit(toast, ['id'])"
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
      :class="style.base({ clickable: !!(toast.onClick) })"
      data-part="base"
      @update:open="onUpdateOpen($event, toast.id)"
      @click="toast.onClick && toast.onClick(toast)"
    />

    <ToastPortal :disabled="!portal">
      <ToastViewport
        :data-expanded="expanded"
        :class="style.viewport({ class: [props.class, props.ui?.viewport] })"
        data-part="viewport"
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
  </ToastProvider>
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
