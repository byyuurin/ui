<script setup lang="ts">
import type { FormItemProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<FormItemProps> = [
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'label', value: 'Label' },
  { prop: 'description', value: 'Description' },
  { prop: 'hint', value: 'Hint' },
  { prop: 'help', value: 'Help' },
  { prop: 'error', value: 'Error Message', description: 'Use the `error` prop to display an error message below the form control.\nWhen used together with the help prop, the `error` prop takes precedence.\n\nWhen used inside a Form, this is automatically set when a validation error occurs.' },
  { prop: 'required', value: false },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="FormItem"
    description="A wrapper for form elements that provides validation and error handling."
    :controls="controls"
  >
    <div class="space-y-2">
      <UFormItem v-bind="attrs">
        <UInput />
      </UFormItem>
    </div>
  </ExampleView>
</template>
