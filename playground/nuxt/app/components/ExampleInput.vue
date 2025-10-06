<script setup lang="ts">
import type { InputProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const leadingIcon = 'i-carbon-unlocked'
const trailingIcon = 'i-carbon-share'

const controls: ControlItems<InputProps> = [
  { prop: 'variant', value: 'outline', options: ['outline', 'soft', 'subtle', 'ghost', 'none'] },
  { prop: 'color', value: 'primary', options: ['error', 'primary', 'secondary', 'success', 'info', 'warning', 'neutral'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'type', value: 'text', options: ['text', 'number', 'password', 'search', 'file'] },
  { prop: 'placeholder', value: '', placeholder: 'placeholder' },
  { prop: 'disabled', value: false },
  { prop: 'underline', value: false },
  { prop: 'highlight', value: false },
  { prop: 'loading', value: false },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Input"
    description="An input element to enter text."
    :controls="controls"
  >
    <div class="flex flex-col gap-4">
      <UInput v-bind="attrs" />
      <UInput v-bind="attrs" :leading-icon="leadingIcon" />
      <UInput v-bind="attrs" :trailing-icon="trailingIcon" />
      <UInput v-bind="attrs" :icon="leadingIcon" :leading-icon="leadingIcon" :trailing-icon="trailingIcon" />
      <UInput v-bind="attrs">
        <template #leading>
          <Placeholder label="#leading" />
        </template>
        <template #trailing>
          <Placeholder label="#trailing" />
        </template>
      </UInput>
    </div>
  </ExampleView>
</template>
