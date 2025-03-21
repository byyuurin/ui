<script lang="ts">
import type { ScrollAreaRootProps } from 'reka-ui'
import type { scrollArea } from '../theme'
import { transitionProps } from '../theme/scroll-area'
import type { ComponentAttrs } from '../types'

export interface ScrollAreaProps extends ComponentAttrs<typeof scrollArea>, Pick<ScrollAreaRootProps, 'type' | 'dir' | 'scrollHideDelay'> {}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { ScrollAreaCorner, ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'reka-ui'
import { computed, ref } from 'vue'
import { useTheme } from '../composables/useTheme'

const props = withDefaults(defineProps<ScrollAreaProps>(), {})
const rootRef = ref<InstanceType<typeof ScrollAreaRoot>>()
const rootProps = reactivePick(props, 'type', 'dir', 'scrollHideDelay')

const { generateStyle } = useTheme()
const style = computed(() => generateStyle('scrollArea', props))

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

    <TransitionGroup v-bind="transitionProps">
      <ScrollAreaScrollbar
        key="scrollbar-horizontal"
        :class="style.scrollbar({ class: props.ui?.scrollbar })"
        orientation="horizontal"
      >
        <ScrollAreaThumb :class="style.thumb({ class: props.ui?.thumb })" />
      </ScrollAreaScrollbar>
      <ScrollAreaScrollbar
        key="scrollbar-vertical"
        :class="style.scrollbar({ class: props.ui?.scrollbar })"
        orientation="vertical"
      >
        <ScrollAreaThumb :class="style.thumb({ class: props.ui?.thumb })" />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner
        key="corner"
        :class="style.corner({ class: props.ui?.corner })"
      />
    </TransitionGroup>
  </ScrollAreaRoot>
</template>
