<script lang="ts" setup>
import type { RadioGroupProps } from '@byyuurin/ui'
import { RadioGroup } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const options = ['System', 'Light', 'Dark'].map((s) => ({
  label: s,
  value: s,
  description: `Description ${s}`,
}))

const value = ref()

const controls: ControlItems<RadioGroupProps<any>> = [
  { prop: 'legend', value: 'Text' },
  { prop: 'orientation', value: 'horizontal', options: ['horizontal', 'vertical'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'disabled', value: false },
  { prop: 'required', value: false },
]

const ui: RadioGroupProps<any>['ui'] = {
  legend: 'after:color-red-700',
}
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="RadioGroup"
    description="A set of radio buttons to select a single option from a list."
    :controls="controls"
  >
    <RadioGroup v-model="value" v-bind="attrs" :options="options" :ui="ui" />
  </ExampleView>
</template>
