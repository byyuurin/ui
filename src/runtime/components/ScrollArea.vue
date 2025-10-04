<script lang="ts">
import type { ScrollAreaRootProps } from 'reka-ui'
import theme from '#build/ui/scroll-area'
import { transitionProps } from '../../theme/scroll-area'
import type { ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'

export interface ScrollAreaProps extends ComponentBaseProps, Pick<ScrollAreaRootProps, 'type' | 'dir' | 'scrollHideDelay'> {
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { ScrollAreaCorner, ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'reka-ui'
import { computed, ref } from 'vue'
import { useAppConfig } from '#imports'
import { cv, merge } from '../utils/style'

const props = withDefaults(defineProps<ScrollAreaProps>(), {})
const rootRef = ref<InstanceType<typeof ScrollAreaRoot>>()
const rootProps = reactivePick(props, 'type', 'dir', 'scrollHideDelay')

const appConfig = useAppConfig() as RuntimeAppConfig
const style = computed(() => {
  const ui = cv(merge(theme, appConfig.ui.scrollArea))
  return ui(props)
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
    data-part="root"
  >
    <ScrollAreaViewport :class="style.viewport({ class: props.ui?.viewport })" data-part="viewport">
      <slot></slot>
    </ScrollAreaViewport>

    <TransitionGroup v-bind="transitionProps">
      <ScrollAreaScrollbar
        key="scrollbar-horizontal"
        orientation="horizontal"
        :class="style.scrollbar({ class: props.ui?.scrollbar })"
        data-part="scrollbar"
      >
        <ScrollAreaThumb :class="style.thumb({ class: props.ui?.thumb })" data-part="thumb" />
      </ScrollAreaScrollbar>
      <ScrollAreaScrollbar
        key="scrollbar-vertical"
        orientation="vertical"
        :class="style.scrollbar({ class: props.ui?.scrollbar })"
        data-part="scrollbar"
      >
        <ScrollAreaThumb :class="style.thumb({ class: props.ui?.thumb })" data-part="thumb" />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner
        key="corner"
        :class="style.corner({ class: props.ui?.corner })"
        data-part="corner"
      />
    </TransitionGroup>
  </ScrollAreaRoot>
</template>
