<script lang="ts" setup>
import type { ButtonProps } from '@byyuurin/ui'
import { Button } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const icon = 'i-carbon-asleep-filled'

const controls: ControlItems<ButtonProps> = [
  { prop: 'label', value: '', placeholder: 'Text' },
  { prop: 'variant', value: 'solid', options: ['solid', 'outline', 'soft', 'ghost', 'link'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'active', value: false },
  { prop: 'disabled', value: false },
  { prop: 'round', value: false },
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
      <Button v-bind="attrs" label="" :icon="icon" />
      <Button v-bind="attrs" :label="attrs.label || 'Text'" />
      <Button v-bind="attrs" :label="attrs.label || 'Text'" :prefix-icon="icon" />
      <Button v-bind="attrs" :label="attrs.label || 'Text'" :suffix-icon="icon" />
    </div>
    <div class="py-4">
      <Button v-bind="attrs" :label="attrs.label || 'Text'">
        <template #prefix>
          <Placeholder label="#prefix" />
        </template>

        <template #default>
          <Placeholder label="#default" />
        </template>

        <template #suffix>
          <Placeholder label="#suffix" />
        </template>
      </Button>
    </div>
  </ExampleView>
</template>
