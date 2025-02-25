<script lang="ts" setup>
import type { ButtonProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const icon = 'i-carbon-asleep-filled'

const controls: ControlItems<ButtonProps> = [
  { prop: 'variant', value: 'solid', options: ['solid', 'outline', 'soft', 'soft-outline', 'ghost', 'link'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'label', value: '', placeholder: 'Text' },
  { prop: 'href', value: 'https://github.com/' },
  { prop: 'target', value: '_blank', options: ['_blank', '_parent', '_self', '_top'] },
  { prop: 'active', value: false },
  { prop: 'disabled', value: false },
  { prop: 'loading', value: false },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Button"
    description="A button element that can act as a link or trigger an action."
    :controls="controls"
  >
    <div class="flex flex-wrap items-start gap-4">
      <UButton v-bind="attrs" label="" :icon="icon" />
      <UButton v-bind="attrs" :label="attrs.label || 'Text'" />
      <UButton v-bind="attrs" :label="attrs.label || 'Text'" :prefix-icon="icon" />
      <UButton v-bind="attrs" :label="attrs.label || 'Text'" :suffix-icon="icon" />
    </div>
    <div class="py-4">
      <UButton v-bind="attrs" :label="attrs.label || 'Text'">
        <template #prefix>
          <Placeholder label="#prefix" />
        </template>

        <template #default>
          <Placeholder label="#default" />
        </template>

        <template #suffix>
          <Placeholder label="#suffix" />
        </template>
      </UButton>
    </div>
  </ExampleView>
</template>
