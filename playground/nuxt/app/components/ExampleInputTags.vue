<script setup lang="ts">
import type { InputTagsProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const leadingIcon = 'i-lucide:lock-keyhole'
const trailingIcon = 'i-lucide:share-2'

const controls: ControlItems<InputTagsProps> = [
  { prop: 'color', value: 'primary', options: ['primary', 'secondary', 'success', 'error', 'info', 'warning', 'neutral'] },
  { prop: 'variant', value: 'outline', options: ['outline', 'soft', 'subtle', 'ghost', 'none'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'maxLength', value: null, type: 'number', min: 1 },
  { prop: 'max', value: null, type: 'number', min: 0 },
  { prop: 'placeholder', value: '', placeholder: 'placeholder' },
  { prop: 'disabled', value: false },
  { prop: 'highlight', value: false },
  { prop: 'loading', value: false },
]

const value = ref(['Vue', 'Nuxt'])
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="InputTags"
    description="An input element that displays interactive tags."
    :controls="controls"
  >
    <div class="flex flex-col gap-4">
      <UInputTags v-bind="attrs" v-model="value" />
      <UInputTags v-bind="attrs" v-model="value" :icon="leadingIcon" />
      <UInputTags v-bind="attrs" v-model="value" :trailing-icon="trailingIcon" />
      <UInputTags v-bind="attrs" v-model="value" :avatar="{ src: 'https://github.com/vuejs.png' }" />
    </div>
  </ExampleView>
</template>
