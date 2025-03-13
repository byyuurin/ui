<script setup lang="ts">
import type { CollapsibleProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<CollapsibleProps> = [
  { prop: 'disabled', value: false },
  { prop: 'unmountOnHide', value: true },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Collapsible"
    description="A collapsible element to toggle visibility of its content."
    :controls="controls"
  >
    <div>
      <UCollapsible class="flex flex-col gap-2" v-bind="attrs">
        <UButton class="justify-between" label="Open" trailing-icon="i-lucide-chevron-down" />

        <template #content>
          <Placeholder class="h-48" label="#content" />
        </template>
      </UCollapsible>
    </div>
  </ExampleView>
</template>
