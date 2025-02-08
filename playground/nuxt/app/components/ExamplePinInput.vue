<script setup lang="ts">
import type { PinInputProps } from '@byyuurin/ui'
import { PinInput } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const value = ref<string[]>([])
const controls: ControlItems<PinInputProps> = [
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'variant', value: 'outline', options: ['outline', 'soft', 'ghost', 'none'] },
  { prop: 'length', value: 5 },
  { prop: 'placeholder', value: '?' },
  { prop: 'mask', value: false },
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
    <PinInput v-model="value" v-bind="attrs" />
  </ExampleView>
</template>
