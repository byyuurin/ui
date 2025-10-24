<script setup lang="ts">
import type { InputNumberProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const value = ref<number>(0)

const controls: ControlItems<InputNumberProps> = [
  { prop: 'color', value: 'primary', options: ['primary', 'secondary', 'success', 'error', 'info', 'warning', 'neutral'] },
  { prop: 'variant', value: 'outline', options: ['outline', 'soft', 'subtle', 'ghost', 'none'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'orientation', value: 'horizontal', options: ['horizontal', 'vertical'] },
  { prop: 'min', value: undefined, type: 'number' },
  { prop: 'max', value: undefined, type: 'number' },
  { prop: 'step', value: 1 },
  { prop: 'placeholder', value: '', placeholder: 'placeholder' },
  { prop: 'increment', value: true },
  { prop: 'decrement', value: true },
  { prop: 'disabled', value: false },
  { prop: 'highlight', value: false },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="InputNumber"
    description="Input numerical values with a customizable range."
    :controls="controls"
  >
    <div class="flex flex-col gap-4">
      <UInputNumber v-model="value" v-bind="attrs" />
      <UInputNumber v-model="value" v-bind="attrs">
        <template #increment>
          <Placeholder label="#increment" />
        </template>
        <template #decrement>
          <Placeholder label="#decrement" />
        </template>
      </UInputNumber>
    </div>
  </ExampleView>
</template>
