<script setup lang="ts">
import type { ChipProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<ChipProps> = [
  { prop: 'color', value: 'error', options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] },
  { prop: 'size', value: '3xl', options: ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] },
  { prop: 'position', value: 'top-right', options: ['top-left', 'bottom-left', 'top-right', 'bottom-right'] },
  { prop: 'text', value: '1' },
  { prop: 'inset', value: false, description: 'When `true`, keep the badge inside the component for rounded elements.' },
  { prop: 'standalone', value: false, description: 'When `true`, render the badge relatively to the parent.' },
  { prop: 'show', value: true },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Chip"
    description="An indicator of a numeric value or a state."
    :controls="controls"
  >
    <div class="flex flex-wrap gap-4 items-start">
      <UChip v-bind="attrs">
        <UButton variant="subtle" color="neutral" icon="i-lucide-mail" />
      </UChip>
    </div>
  </ExampleView>
</template>
