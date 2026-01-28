<script setup lang="ts">
import type { FormFieldProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const items = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
]

const controls: ControlItems<FormFieldProps> = [
  { prop: 'orientation', value: 'vertical', options: ['horizontal', 'vertical'] },
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
    title="FormField"
    description="A wrapper for form elements that provides validation and error handling."
    :controls="controls"
  >
    <div class="grid gap-4" :class="attrs.orientation === 'horizontal' ? 'xl:grid-cols-2' : 'xl:grid-cols-3'">
      <UFormField v-bind="attrs">
        <UInput class="w-full" />
      </UFormField>

      <UFormField v-bind="attrs">
        <UInputNumber class="w-full" />
      </UFormField>

      <UFormField v-bind="attrs">
        <UInputTags class="w-full" />
      </UFormField>

      <UFormField v-bind="attrs">
        <USelect class="w-full" :items="items" />
      </UFormField>

      <UFormField v-bind="attrs">
        <USelect class="w-full" :items="items" multiple />
      </UFormField>

      <UFormField v-bind="attrs">
        <UTextarea class="w-full" />
      </UFormField>

      <UFormField v-bind="attrs">
        <USwitch label="Switch me" />
      </UFormField>

      <UFormField v-bind="attrs">
        <UCheckbox label="Check me" />
      </UFormField>

      <UFormField v-bind="attrs">
        <USlider />
      </UFormField>

      <UFormField v-bind="attrs">
        <UCheckboxGroup :items="items" />
      </UFormField>

      <UFormField v-bind="attrs">
        <URadioGroup :items="items" />
      </UFormField>

      <UFormField v-bind="attrs">
        <UPinInput />
      </UFormField>
    </div>
  </ExampleView>
</template>
