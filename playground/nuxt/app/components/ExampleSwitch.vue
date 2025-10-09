<script lang="ts" setup>
import type { SwitchProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const value = ref(false)

const controls: ControlItems<SwitchProps> = [
  { prop: 'color', value: 'primary', options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'label', value: 'Label' },
  { prop: 'description', value: 'Description' },
  { prop: 'loading', value: false },
  { prop: 'required', value: false },
  { prop: 'disabled', value: false },
]

const ui: SwitchProps['ui'] = {
  label: 'after:color-red-600',
}
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Switch"
    description="A control that toggles between two states."
    :controls="controls"
  >
    <div class="flex flex-wrap gap-4">
      <USwitch v-bind="attrs" v-model="value" :ui="ui" />
      <USwitch v-bind="attrs" v-model="value" :ui="ui" checked-icon="i-carbon-checkmark" unchecked-icon="i-carbon-close-large" />
      <USwitch v-bind="attrs" v-model="value" :ui="ui">
        <template #label>
          <Placeholder label="#label" label-position="left" />
        </template>
        <template #description>
          <Placeholder label="#description" label-position="left" />
        </template>
      </USwitch>
    </div>
  </ExampleView>
</template>
