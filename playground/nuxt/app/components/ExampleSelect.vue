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

const controls: ControlItems<SelectProps<typeof options>> = [
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'variant', value: 'outline', options: ['outline', 'soft', 'soft-outline', 'ghost', 'none'] },
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
      <USelect v-model="value" v-bind="attrs" :options="options" trailing-icon="i-mdi-chevron-double-down" />
      <USelect v-model="value" v-bind="attrs" leading-icon="i-carbon-search" :options="options" />
      <USelect v-model="value" v-bind="attrs" selected-icon="i-carbon-star-filled" :options="options" />
      <USelect v-model="value" v-bind="attrs" :options="options">
        <template #default>
          <Placeholder class="me-auto" label="#default" />
        </template>
        <template #leading>
          <Placeholder label="#leading" />
        </template>
        <template #trailing>
          <Placeholder label="#trailing" />
        </template>
        <template #item>
          <Placeholder label="#item" />
        </template>
      </USelect>
      <USelect v-model="value" v-bind="attrs" :options="options">
        <template #default>
          <Placeholder class="me-auto" label="#default" />
        </template>
        <template #leading>
          <Placeholder label="#leading" />
        </template>
        <template #trailing>
          <Placeholder label="#trailing" />
        </template>
        <template #item-label>
          <Placeholder label="#item-label" />
        </template>
        <template #item-leading>
          <Placeholder label="#item-leading" />
        </template>
        <template #item-trailing>
          <Placeholder label="#item-trailing" />
        </template>
      </USelect>
    </div>
  </ExampleView>
</template>
