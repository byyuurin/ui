<script setup lang="ts">
import { computed } from 'vue'
import type { OverlayComponentState } from '../composables/useOverlay'
import { useOverlay } from '../composables/useOverlay'

const { overlays, unmount, close } = useOverlay()
const mountedOverlays = computed(() => overlays.filter((overlay) => overlay.isMounted))

function onOverlayUnmount(id: OverlayComponentState['id']) {
  close(id)
  unmount(id)
}

function onClose(id: OverlayComponentState['id'], value: any) {
  close(id, value)
}
</script>

<template>
  <component
    :is="overlay.component"
    v-for="overlay in mountedOverlays"
    :key="overlay.id"
    v-bind="overlay.props"
    v-model:open="overlay.modelValue"
    @close="onClose(overlay.id, $event)"
    @after-leave="onOverlayUnmount(overlay.id)"
  />
</template>
