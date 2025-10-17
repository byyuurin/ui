<script setup lang="ts">
import { computed } from 'vue'
import type { Overlay } from '../composables/useOverlay'
import { useOverlay } from '../composables/useOverlay'

const { overlays, unmount, close } = useOverlay()
const mountedOverlays = computed(() => overlays.filter((overlay) => overlay.isMounted))

function onAfterLeave(id: Overlay['id']) {
  close(id)
  unmount(id)
}

function onClose(id: Overlay['id'], value: any) {
  close(id, value)
}
</script>

<template>
  <component
    :is="overlay.component"
    v-for="overlay in mountedOverlays"
    :key="overlay.id"
    v-bind="overlay.props"
    v-model:open="overlay.isOpen"
    @close="onClose(overlay.id, $event)"
    @after-leave="onAfterLeave(overlay.id)"
  />
</template>
