<script lang="ts">
import type { ScrollAreaRootProps } from 'reka-ui'
import type { scrollArea } from '../theme'
import type { ComponentAttrs } from '../types'

export interface ScrollAreaProps extends ComponentAttrs<typeof scrollArea>, Pick<ScrollAreaRootProps, 'type' | 'dir' | 'scrollHideDelay'> {}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { ScrollAreaCorner, ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'reka-ui'
import { computed, ref } from 'vue'
import { useTheme } from '../composables'

const props = withDefaults(defineProps<ScrollAreaProps>(), {})
const rootRef = ref<InstanceType<typeof ScrollAreaRoot>>()
const rootProps = reactivePick(props, 'type', 'dir', 'scrollHideDelay')

const { theme, createStyler } = useTheme()

const style = computed(() => {
  const styler = createStyler(theme.value.scrollArea)
  return styler(props)
})

defineExpose({
  scrollTop,
  scrollTopLeft,
})

function scrollTop() {
  rootRef.value?.scrollTop()
}

function scrollTopLeft() {
  rootRef.value?.scrollTopLeft()
}
</script>

<template>
  <ScrollAreaRoot
    ref="rootRef"
    v-bind="rootProps"
    :class="style.root({ class: [props.class, props.ui?.root] })"
  >
    <ScrollAreaViewport :class="style.viewport({ class: props.ui?.viewport })">
      <slot></slot>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar
      :class="style.scrollbar({ class: props.ui?.scrollbar })"
      orientation="horizontal"
    >
      <ScrollAreaThumb :class="style.thumb({ class: props.ui?.thumb })" />
    </ScrollAreaScrollbar>
    <ScrollAreaScrollbar
      :class="style.scrollbar({ class: props.ui?.scrollbar })"
      orientation="vertical"
    >
      <ScrollAreaThumb :class="style.thumb({ class: props.ui?.thumb })" />
    </ScrollAreaScrollbar>
    <ScrollAreaCorner :class="style.corner({ class: props.ui?.corner })" />
  </ScrollAreaRoot>
</template>
