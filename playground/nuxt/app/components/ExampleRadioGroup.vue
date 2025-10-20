<script lang="ts" setup>
import type { RadioGroupProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const values = ['System', 'Light', 'Dark']

const items = values.map((s, i) => ({
  label: s,
  value: s,
  description: `Description ${s}`,
  disabled: i === 2,
}))

const value = ref()

const controls: ControlItems<RadioGroupProps<typeof items>> = [
  { prop: 'color', value: 'primary', options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] },
  { prop: 'variant', value: 'list', options: ['list', 'card', 'table'] },
  { prop: 'orientation', value: 'horizontal', options: ['horizontal', 'vertical'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'indicator', value: 'start', options: ['start', 'end', 'hidden'] },
  { prop: 'legend', value: 'Text' },
  { prop: 'disabled', value: false },
  { prop: 'required', value: false },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="RadioGroup"
    description="A set of radio buttons to select a single option from a list."
    :controls="controls"
  >
    <div class="flex flex-col gap-4">
      <URadioGroup v-model="value" v-bind="attrs" :items="items" />
      <URadioGroup v-model="value" v-bind="attrs" :items="values" />
    </div>
  </ExampleView>
</template>
