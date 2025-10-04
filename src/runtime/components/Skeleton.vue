<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import { useAppConfig } from '#imports'
import type { ComponentBaseProps, RuntimeAppConfig } from '../types'

export interface SkeletonProps extends ComponentBaseProps {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import theme from '#build/ui/skeleton'
import { cv, merge } from '../utils/style'

const props = withDefaults(defineProps<SkeletonProps>(), {})

const appConfig = useAppConfig() as RuntimeAppConfig
const style = computed(() => {
  const ui = cv(merge(theme, appConfig.ui.skeleton))
  return ui(props)
})
</script>

<template>
  <Primitive :as="props.as" :class="style.base()" data-part="base">
    <slot></slot>
  </Primitive>
</template>
