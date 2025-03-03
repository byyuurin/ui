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
    description=""
    :controls="controls"
  >
    <div>
      <UInputNumber v-model="value" v-bind="attrs" />
    </div>
  </ExampleView>
</template>
