<script setup lang="ts">
import type { PinInputProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const value = ref<string[]>([])
const controls: ControlItems<PinInputProps> = [
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'variant', value: 'outline', options: ['outline', 'soft', 'soft-outline', 'ghost', 'none'] },
  { prop: 'type', value: 'text', options: ['text', 'number'] },
  { prop: 'length', value: 5 },
  { prop: 'placeholder', value: '?' },
  { prop: 'mask', value: false, description: 'When `true`, pin inputs will be treated as password.' },
  { prop: 'disabled', value: false },
  { prop: 'underline', value: false },
  { prop: 'highlight', value: false },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="PinInput"
    description="An input element to enter a pin."
    :controls="controls"
  >
    <UPinInput v-model="value" v-bind="attrs" />
  </ExampleView>
</template>
