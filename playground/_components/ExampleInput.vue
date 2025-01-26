<script setup lang="ts">
import { Input, type InputProps } from '@byyuurin/ui'
import ExampleView, { type ControlItems } from './ExampleView.vue'

const controls: ControlItems<InputProps> = [
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'variant', value: 'outline', options: ['outline', 'soft', 'ghost', 'none'] },
  { prop: 'placeholder', value: '' },
  { prop: 'disabled', value: false },
  { prop: 'highlight', value: false },
  // { prop: 'loading', value: false },
]
</script>

<template>
  <ExampleView v-slot="attrs" title="Input" :controls="controls">
    <Input v-bind="attrs" />
  </ExampleView>
</template>
