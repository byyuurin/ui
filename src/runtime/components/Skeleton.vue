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
import { pick } from '../utils'
import { cv, merge } from '../utils/style'

const props = withDefaults(defineProps<SkeletonProps>(), {})

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.skeleton))
  return styler(pick(props, []))
})
</script>

<template>
  <Primitive
    :as="props.as"
    aria-busy="true"
    aria-label="loading"
    aria-live="polite"
    role="alert"
    data-part="base"
    :class="ui.base({ class: props.class })"
  >
    <slot></slot>
  </Primitive>
</template>
