<script setup lang="ts">
import type { PaginationProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const page = ref(1)

const controls: ControlItems<PaginationProps> = [
  { prop: 'variant', value: 'outline', options: ['solid', 'outline', 'soft', 'soft-outline', 'ghost', 'link'] },
  { prop: 'activeVariant', value: 'solid', options: ['solid', 'outline', 'soft', 'soft-outline', 'ghost', 'link'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'siblingCount', value: 2 },
  { prop: 'itemsPerPage', value: 10 },
  { prop: 'total', value: 100 },
  { prop: 'showControls', value: true },
  { prop: 'showEdges', value: false },
  { prop: 'disabled', value: false },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Pagination"
    description="A list of buttons or links to navigate through pages."
    :controls="controls"
  >
    <div>
      <UPagination v-bind="attrs" v-model:page="page" />
    </div>
  </ExampleView>
</template>
