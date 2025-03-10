<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { skeleton } from '../theme'
import type { ComponentAttrs } from '../types'

export interface SkeletonProps extends Omit<ComponentAttrs<typeof skeleton>, 'ui'>, Pick<PrimitiveProps, 'as'> {}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'

const props = withDefaults(defineProps<SkeletonProps>(), {})

const { theme, createStyler } = useTheme()
const styler = computed(() => {
  const styler = createStyler(theme.value.skeleton)
  return styler(props)
})
</script>

<template>
  <Primitive :as="props.as" :class="styler">
    <slot></slot>
  </Primitive>
</template>
