<script setup lang="ts">
import type { SliderProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const valueSingle = ref(0)
const valueMultiple = ref([0, 100])

const controls: ControlItems<SliderProps> = [
  { prop: 'color', value: 'primary', options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] },
  { prop: 'orientation', value: 'horizontal', options: ['horizontal', 'vertical'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'min', value: 0 },
  { prop: 'max', value: 100 },
  { prop: 'step', value: 1 },
  { prop: 'minStepsBetweenThumbs', value: 0 },
  { prop: 'inverted', value: false },
  { prop: 'disabled', value: false },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Slider"
    description="An input to select a numeric value within a range."
    :controls="controls"
  >
    <div class="grid gap-y-12" :class="attrs.orientation === 'horizontal' ? 'grid-rows-2' : 'grid-cols-2 h-100'">
      <div class="flex flex-col gap-4">
        <div>value: {{ valueSingle }}</div>
        <USlider v-model="valueSingle" v-bind="attrs" />
      </div>
      <div class="flex flex-col gap-4">
        <div>value: {{ valueMultiple }}</div>
        <USlider v-model="valueMultiple" v-bind="attrs" />
      </div>
    </div>
  </ExampleView>
</template>
