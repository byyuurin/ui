<script setup lang="ts">
import type { TextareaProps } from '@byyuurin/ui'
import { Textarea } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const value = ref('')
const controls: ControlItems<TextareaProps> = [
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'variant', value: 'outline', options: ['outline', 'soft', 'ghost', 'none'] },
  { prop: 'placeholder', value: '', placeholder: 'placeholder' },
  { prop: 'rows', value: 3 },
  { prop: 'maxRows', value: 0 },
  { prop: 'autoResize', value: false },
  { prop: 'disabled', value: false },
  { prop: 'underline', value: false },
  { prop: 'highlight', value: false },
]
</script>

<template>
  <ExampleView
    v-slot="props"
    title="Textarea"
    description="A textarea element to input multi-line text."
    :controls="controls"
  >
    <div class="flex flex-col gap-4">
      <Textarea v-model="value" v-bind="props" />
    </div>
  </ExampleView>
</template>
