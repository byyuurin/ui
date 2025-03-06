<script setup lang="ts">
import type { BadgeProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<BadgeProps> = [
  { prop: 'text', value: '1' },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'position', value: 'top-right', options: ['top-left', 'bottom-left', 'top-right', 'bottom-right'] },
  { prop: 'inset', value: false, description: 'When `true`, keep the badge inside the component for rounded elements.' },
  { prop: 'standalone', value: false, description: 'When `true`, render the badge relatively to the parent.' },
  { prop: 'show', value: true },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Badge"
    description="An indicator of a numeric value or a state."
    :controls="controls"
  >
    <div class="flex flex-wrap gap-4 items-start">
      <UBadge v-bind="attrs">
        <UButton class="ui-base" icon="i-lucide-mail" />
      </UBadge>
    </div>
  </ExampleView>
</template>
