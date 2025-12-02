<script setup lang="ts">
import type { IconProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<IconProps> = [
  { prop: 'mode', value: null, options: [{ label: 'auto', value: null }, { label: 'css', value: 'css' }, { label: 'svg', value: 'svg' }] },
  { prop: 'name', value: 'i-lucide-lightbulb' },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Icon"
    description="A component to display any icon from Iconify or another component."
    :controls="controls"
  >
    <div>
      <UIcon v-bind="attrs" class="size-8" />
    </div>
  </ExampleView>
</template>
