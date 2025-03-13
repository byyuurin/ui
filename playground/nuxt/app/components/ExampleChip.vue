<script setup lang="ts">
import type { ChipProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const icon = 'i-carbon-logo-youtube'

const controls: ControlItems<ChipProps> = [
  { prop: 'label', value: '', placeholder: 'Text' },
  { prop: 'variant', value: 'solid', options: ['solid', 'outline', 'soft', 'soft-outline'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Chip"
    description="A short text to represent a status or a category."
    :controls="controls"
  >
    <div class="flex flex-wrap items-start gap-4">
      <UChip v-bind="attrs" label="" :icon="icon" />
      <UChip v-bind="attrs" :label="attrs.label || 'Text'" />
      <UChip v-bind="attrs" :label="attrs.label || 'Text'" :leading-icon="icon" />
      <UChip v-bind="attrs" :label="attrs.label || 'Text'" :trailing-icon="icon" />
    </div>
    <div class="py-4">
      <UChip v-bind="attrs" :label="attrs.label || 'Text'">
        <template #leading>
          <Placeholder label="#leading" />
        </template>

        <template #default>
          <Placeholder label="#default" />
        </template>

        <template #trailing>
          <Placeholder label="#trailing" />
        </template>
      </UChip>
    </div>
  </ExampleView>
</template>
