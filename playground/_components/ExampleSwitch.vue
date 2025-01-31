<script lang="ts" setup>
import type { SwitchProps } from '@byyuurin/ui'
import { Switch } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const value = ref(false)

const controls: ControlItems<SwitchProps> = [
  { prop: 'label', value: 'Label' },
  { prop: 'description', value: 'Description' },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'round', value: false },
  { prop: 'loading', value: false },
  { prop: 'required', value: false },
  { prop: 'disabled', value: false },
]

const ui: SwitchProps['ui'] = {
  label: 'after:color-red-600',
}
</script>

<template>
  <ExampleView v-slot="attrs" title="Switch" :controls="controls">
    <div class="flex flex-wrap gap-4">
      <Switch v-bind="attrs" v-model="value" :ui="ui" />
      <Switch v-bind="attrs" v-model="value" :ui="ui" checked-icon="i-carbon-checkmark" unchecked-icon="i-carbon-close-large" />
      <Switch v-bind="attrs" v-model="value" :ui="ui">
        <template #label>
          <Placeholder label="#label" label-position="left" />
        </template>
        <template #description>
          <Placeholder label="#description" label-position="left" />
        </template>
      </Switch>
    </div>
  </ExampleView>
</template>
