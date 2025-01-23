<script lang="ts">
import type { ConfigProviderProps, TooltipProviderProps } from 'reka-ui'
import type { ToasterProps } from '../types'

export interface AppProps extends Omit<ConfigProviderProps, 'useId' | 'dir' | 'locale'> {
  tooltip?: TooltipProviderProps
  toaster?: ToasterProps
}

export interface AppSlots {
  default: (props?: Record<string, unknown>) => any
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { ConfigProvider, TooltipProvider, useForwardProps } from 'reka-ui'
import { shallowRef, toRef, useId } from 'vue'
import type { ModalState } from '../composables/useModal'
import { provideModalState } from '../composables/useModal'
import ModalProvider from './ModalProvider.vue'
import Toaster from './Toaster.vue'

const props = defineProps<AppProps>()
defineSlots<AppSlots>()

const configProviderProps = useForwardProps(reactivePick(props, 'scrollBody'))
const tooltipProps = toRef(() => props.tooltip)
const toasterProps = toRef(() => props.toaster)

const modalState = shallowRef<ModalState>({
  component: 'div',
  props: {},
})

provideModalState(modalState)
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
