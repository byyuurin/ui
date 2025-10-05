<script setup lang="ts">
import type { BadgeProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const icon = 'i-carbon-logo-youtube'

const controls: ControlItems<BadgeProps> = [
  { prop: 'label', value: '', placeholder: 'Text' },
  { prop: 'variant', value: 'solid', options: ['solid', 'outline', 'soft', 'soft-outline'] },
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
      <UBadge v-bind="attrs" :label="attrs.label || 'Text'" :leading-icon="icon" />
      <UBadge v-bind="attrs" :label="attrs.label || 'Text'" :trailing-icon="icon" />
    </div>
    <div class="py-4">
      <UBadge v-bind="attrs" :label="attrs.label || 'Text'">
        <template #leading>
          <Placeholder label="#leading" />
        </template>

        <template #default>
          <Placeholder label="#default" />
        </template>

        <template #trailing>
          <Placeholder label="#trailing" />
        </template>
      </UBadge>
    </div>
  </ExampleView>
</template>
