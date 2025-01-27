<script setup lang="ts">
import type { InputProps } from '@byyuurin/ui'
import { Input } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const icon = 'i-carbon-unlocked'

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
      <Input v-bind="attrs" :placeholder="attrs.placeholder || 'placeholder'" />
      <Input v-bind="attrs" :placeholder="attrs.placeholder || 'placeholder'" :prefix-icon="icon" />
      <Input v-bind="attrs" :placeholder="attrs.placeholder || 'placeholder'" :suffix-icon="icon" />
      <Input v-bind="attrs" :placeholder="attrs.placeholder || 'placeholder'" :icon="icon" :prefix-icon="icon" :suffix-icon="icon" />
      <Input v-bind="attrs" :placeholder="attrs.placeholder || 'placeholder'">
        <template #prefix>
          <Placeholder label="#prefix" />
        </template>
        <template #suffix>
          <Placeholder label="#suffix" />
        </template>
      </Input>
    </div>
  </ExampleView>
</template>
