<script setup lang="ts">
import type { BadgeProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const icon = 'i-lucide:clock-3'

const controls: ControlItems<BadgeProps> = [
  { prop: 'color', value: 'primary', options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] },
  { prop: 'variant', value: 'solid', options: ['solid', 'outline', 'soft', 'subtle'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'label', value: '', placeholder: 'Text' },
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
      <UBadge v-bind="attrs" :label="attrs.label || 'Text only'" />
      <UBadge v-bind="attrs" :label="attrs.label || 'Text with leadingIcon'" :leading-icon="icon" />
      <UBadge v-bind="attrs" :label="attrs.label || 'Text with icon'" :trailing-icon="icon" />
      <UBadge v-bind="attrs" :label="attrs.label || 'Text with avatar'" :avatar="{ src: 'https://i.pravatar.cc/100?img=4' }" />
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
