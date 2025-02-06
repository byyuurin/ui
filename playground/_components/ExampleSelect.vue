<script lang="ts" setup>
import type { SelectProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const value = ref('')

const options = [
  ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'],
  ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek'],
  [{ label: 'Others (disabled)', value: 'Others', disabled: true }],
  [{ label: 'Icon', value: 'Icon', icon: 'i-carbon-user-avatar' }],
]

const controls: ControlItems<SelectProps<any, any, any, any>> = [
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'variant', value: 'outline', options: ['outline', 'soft', 'ghost', 'none'] },
  { prop: 'placeholder', value: 'placeholder', placeholder: 'placeholder' },
  { prop: 'multiple', value: false },
  { prop: 'arrow', value: false },
  { prop: 'highlight', value: false },
  { prop: 'underline', value: false },
  { prop: 'disabled', value: false },
  { prop: 'loading', value: false },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Select"
    description="A select element to choose from a list of options."
    :controls="controls"
  >
    <div class="flex flex-col gap-4">
      <USelect v-model="value" v-bind="attrs" :options="options" />
      <USelect v-model="value" v-bind="attrs" :options="options" suffix-icon="i-mdi-chevron-double-down" />
      <USelect v-model="value" v-bind="attrs" prefix-icon="i-carbon-search" :options="options" />
      <USelect v-model="value" v-bind="attrs" selected-icon="i-carbon-star-filled" :options="options" />
    </div>
  </ExampleView>
</template>
