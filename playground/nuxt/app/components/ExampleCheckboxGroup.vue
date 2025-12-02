<script setup lang="ts">
import type { CheckboxGroupProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const values = ['System', 'Light', 'Dark']

const items = values.map((s, i) => ({
  label: s,
  value: s,
  description: `Description ${s}`,
  disabled: i === 2,
}))

const value = ref<string[]>([])

const controls: ControlItems<CheckboxGroupProps<typeof items>> = [
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
    title="CheckboxGroup"
    description="A set of checklist buttons to select multiple option from a list."
    :controls="controls"
  >
    <div class="flex flex-col items-start gap-4">
      <UCheckboxGroup v-bind="attrs" v-model="value" :items="items" />
      <UCheckboxGroup v-bind="attrs" v-model="value" :items="values" />

      <UCheckboxGroup v-bind="attrs" v-model="value" :items="items">
        <template #legend>
          <Placeholder label="#legend" />
        </template>
        <template #label>
          <Placeholder label="#label" />
        </template>
        <template #description>
          <Placeholder label="#description" />
        </template>
      </UCheckboxGroup>
    </div>
  </ExampleView>
</template>
