<script lang="ts" setup>
import type { SelectProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const value = ref('Apple')

const items = [
  ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'],
  ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek'],
  [{ label: 'Others (disabled)', value: 'Others', disabled: true }],
  [{ label: 'Icon', value: 'Icon', icon: 'i-carbon-user-avatar' }],
]

const controls: ControlItems<SelectProps<typeof items>> = [
  { prop: 'color', value: 'primary', options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'variant', value: 'outline', options: ['outline', 'soft', 'subtle', 'ghost', 'none'] },
  { prop: 'placeholder', value: 'placeholder', placeholder: 'placeholder' },
  { prop: 'multiple', value: false },
  { prop: 'arrow', value: false },
  { prop: 'highlight', value: false },
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
      <USelect v-model="value" v-bind="attrs" :items="items" />
      <USelect v-model="value" v-bind="attrs" :items="items" trailing-icon="i-mdi-chevron-double-down" />
      <USelect v-model="value" v-bind="attrs" leading-icon="i-carbon-search" :items="items" />
      <USelect v-model="value" v-bind="attrs" selected-icon="i-carbon-star-filled" :items="items" />
      <USelect v-model="value" v-bind="attrs" :avatar="{ src: 'https://i.pravatar.cc/100' }" :items="items" />

      <USelect v-model="value" v-bind="attrs" :items="items">
        <template #default>
          <Placeholder class="mx-auto" label="#default" />
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
      <USelect v-model="value" v-bind="attrs" :items="items">
        <template #default>
          <Placeholder class="mx-auto" label="#default" />
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
