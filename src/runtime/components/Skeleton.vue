<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { skeleton } from '../theme'
import type { ComponentAttrs } from '../types'

export interface SkeletonProps extends Omit<ComponentAttrs<typeof skeleton>, 'ui'> {
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
import { useTheme } from '../composables/useTheme'

const props = withDefaults(defineProps<SkeletonProps>(), {})

const { generateStyle } = useTheme()
const styler = computed(() => generateStyle('skeleton', props))
</script>

<template>
  <Primitive :as="props.as" :class="styler" data-part="base">
    <slot></slot>
  </Primitive>
</template>
