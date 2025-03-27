<script lang="ts" setup>
import type { RadioGroupItem, RadioGroupProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const values = ['System', 'Light', 'Dark']

const options = values.map((s, i) => ({
  label: s,
  value: s,
  description: `Description ${s}`,
  disabled: i === 2,
} satisfies RadioGroupItem))

const value = ref()

const controls: ControlItems<RadioGroupProps<typeof options[number]>> = [
  { prop: 'legend', value: 'Text' },
  { prop: 'orientation', value: 'horizontal', options: ['horizontal', 'vertical'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'disabled', value: false },
  { prop: 'required', value: false },
]

const ui: RadioGroupProps<typeof options[number]>['ui'] = {
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
    <div class="flex flex-col gap-4">
      <URadioGroup v-model="value" v-bind="attrs" :options="options" :ui="ui" />
      <URadioGroup v-model="value" v-bind="attrs" :options="values" :ui="ui" />
    </div>
  </ExampleView>
</template>
