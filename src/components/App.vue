<script lang="ts">
import type { ConfigProviderProps, TooltipProviderProps } from 'reka-ui'

export interface AppProps extends Omit<ConfigProviderProps, 'useId' | 'dir' | 'locale'> {
  tooltip?: TooltipProviderProps
}

export interface AppSlots {
  default: (props?: Record<string, unknown>) => any
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { ConfigProvider, TooltipProvider, useForwardProps } from 'reka-ui'
import { toRef, useId } from 'vue'

const props = defineProps<AppProps>()
defineSlots<AppSlots>()

const configProviderProps = useForwardProps(reactivePick(props, 'scrollBody'))
const tooltipProps = toRef(() => props.tooltip)
</script>

<template>
  <ConfigProvider :use-id="useId" v-bind="configProviderProps">
    <TooltipProvider v-bind="tooltipProps">
      <slot></slot>
    </TooltipProvider>
  </ConfigProvider>
</template>
