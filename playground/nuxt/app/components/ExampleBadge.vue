<script setup lang="ts">
import type { BadgeProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<BadgeProps> = [
  { prop: 'text', value: '1' },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'position', value: 'top-right', options: ['top-left', 'bottom-left', 'top-right', 'bottom-right'] },
  { prop: 'inset', value: false },
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
        <UButton icon="i-lucide-mail" :ui="{ base: 'ui-ui-cb' }" />
      </UBadge>
    </div>
  </ExampleView>
</template>
