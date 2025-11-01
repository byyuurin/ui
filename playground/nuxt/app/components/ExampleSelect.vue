<script lang="ts" setup>
import type { SelectProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const value = ref<string | null>(null)

const items = [
  ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'],
  ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek'],
  [{ label: 'Others (disabled)', value: 'Others', disabled: true }],
  [{ label: 'Icon', value: 'Icon', icon: 'i-lucide:circle-user-round' }],
  [{ label: 'Avatar', value: 'Avatar', avatar: { src: 'https://i.pravatar.cc/100?img=5' } }],
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
      <USelect v-model="value" v-bind="attrs" :items="items" trailing-icon="i-lucide:chevrons-down" />
      <USelect v-model="value" v-bind="attrs" leading-icon="i-lucide:search" :items="items" />
      <USelect v-model="value" v-bind="attrs" selected-icon="i-lucide:circle-check" :items="items" />
      <USelect v-model="value" v-bind="attrs" :avatar="{ src: 'https://i.pravatar.cc/100?img=2' }" :items="items" />

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
        <template #content-top>
          <Placeholder label="#content-top" />
        </template>
        <template #content-bottom>
          <Placeholder label="#content-bottom" />
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
        <template #content-top>
          <Placeholder label="#content-top" />
        </template>
        <template #content-bottom>
          <Placeholder label="#content-bottom" />
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
    <UButton class="mt-10" label="Reset" :disabled="value === null" @click="value = null" />
  </ExampleView>
</template>
