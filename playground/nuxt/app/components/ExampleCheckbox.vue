<script lang="ts" setup>
import type { CheckboxProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const value = ref<CheckboxProps['defaultValue']>('indeterminate')

const controls: ControlItems<CheckboxProps> = [
  { prop: 'variant', value: 'list', options: ['list', 'card'] },
  { prop: 'indicator', value: 'start', options: ['start', 'end', 'hidden'] },
  { prop: 'color', value: 'primary', options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'label', value: '', placeholder: 'Label' },
  { prop: 'description', value: 'Description' },
  { prop: 'disabled', value: false },
  { prop: 'required', value: false },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Checkbox"
    description="An input element to toggle between checked and unchecked states."
    :controls="controls"
  >
    <div class="flex flex-col items-start gap-y-8">
      <UButton label="indeterminate" color="neutral" variant="outline" size="xs" :disabled="value === 'indeterminate'" @click="value = 'indeterminate'" />
      <div class="flex flex-wrap gap-4">
        <UCheckbox v-model="value" v-bind="attrs" :label="attrs.label || 'Label'" />
        <UCheckbox v-model="value" v-bind="attrs">
          <template #label>
            <Placeholder label="#label" label-position="left" />
          </template>
          <template #description>
            <Placeholder label="#description" label-position="left" />
          </template>
        </UCheckbox>
      </div>
    </div>
  </ExampleView>
</template>
