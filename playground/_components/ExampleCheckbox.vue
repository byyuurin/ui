<script lang="ts" setup>
import { Button, Checkbox, type CheckboxProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const value = ref<CheckboxProps['defaultValue']>('indeterminate')

const controls: ControlItems<CheckboxProps> = [
  { prop: 'label', value: '', placeholder: 'Label' },
  { prop: 'description', value: 'Description' },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'disabled', value: false },
  { prop: 'required', value: false },
]

const ui: CheckboxProps['ui'] = {
  label: 'after:color-red-600',
}
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Checkbox"
    description="An input element to toggle between checked and unchecked states."
    :controls="controls"
  >
    <div class="flex flex-col items-start gap-y-8">
      <Button label="indeterminate" size="xs" :disabled="value === 'indeterminate'" @click="value = 'indeterminate'" />
      <div class="flex flex-wrap gap-4">
        <Checkbox v-model="value" :ui="ui" v-bind="attrs" :label="attrs.label || 'Label'" />
        <Checkbox v-model="value" :ui="ui" v-bind="attrs">
          <template #label>
            <Placeholder label="#label" label-position="left" />
          </template>
          <template #description>
            <Placeholder label="#description" label-position="left" />
          </template>
        </Checkbox>
      </div>
    </div>
  </ExampleView>
</template>
