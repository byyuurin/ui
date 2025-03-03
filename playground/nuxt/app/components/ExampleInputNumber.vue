<script setup lang="ts">
import type { InputNumberProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const value = ref<number>(0)

const controls: ControlItems<InputNumberProps> = [
  { prop: 'variant', value: 'outline', options: ['outline', 'soft', 'soft-outline', 'ghost', 'none'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'orientation', value: 'horizontal', options: ['horizontal', 'vertical'] },
  { prop: 'min', value: undefined, type: 'number' },
  { prop: 'max', value: undefined, type: 'number' },
  { prop: 'step', value: 1 },
  { prop: 'placeholder', value: '', placeholder: 'placeholder' },
  { prop: 'disabled', value: false },
  { prop: 'underline', value: false },
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
