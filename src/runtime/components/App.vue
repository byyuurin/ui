<script lang="ts">
import type { UserConfig } from '@unocss/core'
import type { ConfigProviderProps, TooltipProviderProps } from 'reka-ui'
import type { ThemeExtension, ToasterProps } from '../types'

export interface AppSlots {
  default: (props?: {}) => any
}

export interface AppProps extends Omit<ConfigProviderProps, 'useId' | 'dir' | 'locale'> {
  unoConfig?: UserConfig
  ui?: ThemeExtension
  tooltip?: TooltipProviderProps
  toaster?: ToasterProps
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { ConfigProvider, TooltipProvider, useForwardProps } from 'reka-ui'
import { computed, shallowRef, toRef, useId } from 'vue'
import type { ModalStateProvideValue } from '../app/injections'
import { provideModalState, provideThemeExtension, provideUnoConfig } from '../app/injections'
import ModalProvider from './ModalProvider.vue'
import Toaster from './Toaster.vue'

const props = withDefaults(defineProps<AppProps>(), {
  unoConfig: () => ({}),
  ui: () => ({}),
})

defineSlots<AppSlots>()

const configProviderProps = useForwardProps(reactivePick(props, 'scrollBody'))
const tooltipProps = toRef(() => props.tooltip)
const toasterProps = toRef(() => props.toaster)

const modalState = shallowRef<ModalStateProvideValue>({
  component: 'div',
  props: {},
})

const themeExtension = computed(() => props.ui)

provideModalState(modalState)
provideUnoConfig(props.unoConfig)
provideThemeExtension(themeExtension)
</script>

<template>
  <ConfigProvider :use-id="useId" v-bind="configProviderProps">
    <TooltipProvider v-bind="tooltipProps">
      <Toaster v-if="props.toaster !== null" v-bind="toasterProps">
        <slot></slot>
      </Toaster>
      <slot v-else></slot>
    </TooltipProvider>
    <ModalProvider />
  </ConfigProvider>
</template>
