<script setup lang="ts">
import type { TextareaProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const leadingIcon = 'i-carbon-unlocked'
const trailingIcon = 'i-carbon-share'

const value = ref('')
const controls: ControlItems<TextareaProps> = [
  { prop: 'color', value: 'primary', options: ['primary', 'secondary', 'success', 'error', 'info', 'warning', 'neutral'] },
  { prop: 'variant', value: 'outline', options: ['outline', 'soft', 'subtle', 'ghost', 'none'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'placeholder', value: '', placeholder: 'placeholder' },
  { prop: 'rows', value: 3 },
  { prop: 'maxRows', value: 0 },
  { prop: 'loading', value: false },
  { prop: 'autoresize', value: false },
  { prop: 'disabled', value: false },
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
      <UTextarea v-model="value" v-bind="props" />
      <UTextarea v-model="value" v-bind="props" :icon="leadingIcon" />
      <UTextarea v-model="value" v-bind="props" :leading-icon="leadingIcon" :trailing-icon="trailingIcon" />

      <UTextarea v-model="value" v-bind="props">
        <span class="absolute left-1/2 -translate-x-1/2">
          <Placeholder label="#default" />
        </span>

        <template #leading>
          <Placeholder label="#leading" />
        </template>

        <template #trailing>
          <Placeholder label="#trailing" />
        </template>
      </UTextarea>
    </div>
  </ExampleView>
</template>
