<script setup lang="ts">
import type { BadgeProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const icon = 'i-carbon-logo-youtube'

const controls: ControlItems<BadgeProps> = [
  { prop: 'label', value: '', placeholder: 'Text' },
  { prop: 'variant', value: 'solid', options: ['solid', 'outline', 'soft'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Badge"
    description="A short text to represent a status or a category."
    :controls="controls"
  >
    <div class="flex flex-wrap items-start gap-4">
      <UBadge v-bind="attrs" label="" :icon="icon" />
      <UBadge v-bind="attrs" :label="attrs.label || 'Text'" />
      <UBadge v-bind="attrs" :label="attrs.label || 'Text'" :prefix-icon="icon" />
      <UBadge v-bind="attrs" :label="attrs.label || 'Text'" :suffix-icon="icon" />
    </div>
    <div class="py-4">
      <UBadge v-bind="attrs" :label="attrs.label || 'Text'">
        <template #prefix>
          <Placeholder label="#prefix" />
        </template>

        <template #default>
          <Placeholder label="#default" />
        </template>

        <template #suffix>
          <Placeholder label="#suffix" />
        </template>
      </UBadge>
    </div>
  </ExampleView>
</template>
