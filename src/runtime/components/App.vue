<script lang="ts">
import type { UserConfig } from '@unocss/core'
import type { ConfigProviderProps, TooltipProviderProps } from 'reka-ui'
import type { Messages, ThemeExtension, ToastProviderProps } from '../types'
import type { Locale } from '../utils'

export interface AppSlots {
  default: (props?: {}) => any
}

export interface AppProps extends Omit<ConfigProviderProps, 'useId' | 'dir' | 'locale'> {
  unoConfig?: UserConfig
  ui?: ThemeExtension
  toaster?: ToastProviderProps
  tooltip?: TooltipProviderProps
  locale?: Locale<Messages>
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { ConfigProvider, TooltipProvider, useForwardProps } from 'reka-ui'
import { shallowRef, toRef, useId } from 'vue'
import type { ModalStateProvideValue } from '../app/injections'
import { provideLocaleContext, provideModalState, provideThemeExtension, provideUnoConfig } from '../app/injections'
import ModalProvider from './ModalProvider.vue'
import ToastProvider from './ToastProvider.vue'

const props = withDefaults(defineProps<AppProps>(), {
  unoConfig: () => ({}),
  ui: () => ({}),
})

defineSlots<AppSlots>()

const configProviderProps = useForwardProps(reactivePick(props, 'scrollBody'))
const tooltipProps = toRef(() => props.tooltip)
const toastProviderProps = toRef(() => props.toaster)

const modalState = shallowRef<ModalStateProvideValue>({
  component: 'div',
  props: {},
})

provideModalState(modalState)
provideUnoConfig(() => props.unoConfig)
provideThemeExtension(() => props.ui)

const locale = toRef(() => props.locale)
provideLocaleContext(locale)
</script>

<template>
  <ConfigProvider :use-id="useId" :dir="locale?.dir" :locale="locale?.code" v-bind="configProviderProps">
    <TooltipProvider v-bind="tooltipProps">
      <ToastProvider v-if="props.toaster !== null" v-bind="toastProviderProps">
        <slot></slot>
      </ToastProvider>
      <slot v-else></slot>
    </TooltipProvider>
    <ModalProvider />
  </ConfigProvider>
</template>
