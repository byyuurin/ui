<script lang="ts">
import type { ConfigProviderProps, TooltipProviderProps } from 'reka-ui'
import type { Locale, Messages, ToastProviderProps } from '../types'
import type { MaybeNull, StaticSlot } from '../types/utils'

export interface AppProps<T extends Messages = Messages> extends Omit<ConfigProviderProps, 'useId' | 'locale'> {
  toaster?: MaybeNull<ToastProviderProps>
  tooltip?: TooltipProviderProps
  locale?: Locale<T>
  portal?: boolean | string | HTMLElement
}

export interface AppSlots {
  default: StaticSlot
}
</script>

<script setup lang="ts" generic="T extends Messages">
import { reactivePick } from '@vueuse/core'
import { ConfigProvider, TooltipProvider, useForwardProps } from 'reka-ui'
import { toRef, useId } from 'vue'
import { provideLocaleContext } from '../composables/useLocale'
import { providePortalTarget } from '../composables/usePortal'
import OverlayProvider from './OverlayProvider.vue'
import ToastProvider from './ToastProvider.vue'

const props = withDefaults(defineProps<AppProps<T>>(), {
  portal: 'body',
})

defineSlots<AppSlots>()

const configProviderProps = useForwardProps(reactivePick(props, 'scrollBody'))
const tooltipProps = toRef(() => props.tooltip)
const toastProviderProps = toRef(() => props.toaster)

const locale = toRef(() => props.locale)
provideLocaleContext(locale)

const portal = toRef(() => props.portal)
providePortalTarget(portal)
</script>

<template>
  <ConfigProvider :use-id="() => (useId() as string)" :dir="props.dir || locale?.dir" :locale="locale?.code" v-bind="configProviderProps">
    <TooltipProvider v-bind="tooltipProps">
      <ToastProvider v-if="props.toaster !== null" v-bind="toastProviderProps">
        <slot></slot>
      </ToastProvider>
      <slot v-else></slot>

      <OverlayProvider />
    </TooltipProvider>
  </ConfigProvider>
</template>
