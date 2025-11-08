<script lang="ts">
import type { ScrollAreaRootProps } from 'reka-ui'
import theme from '#build/ui/scroll-area'
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

const props = withDefaults(defineProps<ScrollAreaProps>(), {
  scrollHideDelay: 150,
})
const rootRef = ref<InstanceType<typeof ScrollAreaRoot>>()
const rootProps = reactivePick(props, 'type', 'dir', 'scrollHideDelay')

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.scrollArea))
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
    :class="ui.root({ class: [props.class, props.ui?.root] })"
    data-part="root"
  >
    <ScrollAreaViewport :class="ui.viewport({ class: props.ui?.viewport })" data-part="viewport">
      <slot></slot>
    </ScrollAreaViewport>

    <ScrollAreaScrollbar
      key="scrollbar-horizontal"
      orientation="horizontal"
      :class="ui.scrollbar({ class: props.ui?.scrollbar })"
      data-part="scrollbar"
    >
      <ScrollAreaThumb :class="ui.thumb({ class: props.ui?.thumb })" data-part="thumb" />
    </ScrollAreaScrollbar>
    <ScrollAreaScrollbar
      key="scrollbar-vertical"
      orientation="vertical"
      :class="ui.scrollbar({ class: props.ui?.scrollbar })"
      data-part="scrollbar"
    >
      <ScrollAreaThumb :class="ui.thumb({ class: props.ui?.thumb })" data-part="thumb" />
    </ScrollAreaScrollbar>
    <ScrollAreaCorner
      key="corner"
      :class="ui.corner({ class: props.ui?.corner })"
      data-part="corner"
    />
  </ScrollAreaRoot>
</template>
