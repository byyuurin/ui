<script setup lang="ts">
import type { InputProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const prefixIcon = 'i-carbon-unlocked'
const suffixIcon = 'i-carbon-share'

const controls: ControlItems<InputProps> = [
  { prop: 'type', value: 'text', options: ['text', 'number', 'password', 'search', 'file'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'variant', value: 'outline', options: ['outline', 'soft', 'ghost', 'none'] },
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
      <UInput v-bind="attrs" :prefix-icon="prefixIcon" />
      <UInput v-bind="attrs" :suffix-icon="suffixIcon" />
      <UInput v-bind="attrs" :icon="prefixIcon" :prefix-icon="prefixIcon" :suffix-icon="suffixIcon" />
      <UInput v-bind="attrs">
        <template #prefix>
          <Placeholder label="#prefix" />
        </template>
        <template #suffix>
          <Placeholder label="#suffix" />
        </template>
      </UInput>
    </div>
  </ExampleView>
</template>
