<script setup lang="ts">
import type { ButtonGroupProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<ButtonGroupProps> = [
  { prop: 'orientation', value: 'horizontal', options: ['horizontal', 'vertical'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="ButtonGroup"
    description="Group multiple button-like elements together."
    :controls="controls"
  >
    <div class="flex gap-4 flex-col">
      <h2>With Button</h2>
      <UButtonGroup v-bind="attrs">
        <UButton label="Button" variant="outline" />
        <UButton label="Button" variant="outline" />
        <UButton variant="outline" icon="i-carbon-search" />
      </UButtonGroup>
      <h2>With Chip</h2>
      <UButtonGroup v-bind="attrs">
        <UChip label="Chip" variant="outline" />
        <UChip label="Chip" variant="outline" />
        <UButton variant="outline" icon="i-carbon-search" />
      </UButtonGroup>
      <h2>With Input</h2>
      <UButtonGroup v-bind="attrs">
        <UInput placeholder="Input" />
        <UInput placeholder="Input" />
        <UButton variant="outline" icon="i-carbon-search" />
      </UButtonGroup>
      <h2>With Tooltip</h2>
      <UButtonGroup v-bind="attrs">
        <UInput placeholder="Input" />
        <UInput placeholder="Input" />
        <UTooltip text="Copy to clipboard">
          <UButton variant="outline" icon="i-carbon-copy" />
        </UTooltip>
      </UButtonGroup>
      <h2>With Select</h2>
      <UButtonGroup v-bind="attrs">
        <USelect default-value="ON" :options="['ON', 'OFF']" :ui="{ content: 'min-w-25' }" />
        <UButton variant="outline" icon="i-carbon-save" />
      </UButtonGroup>
    </div>
  </ExampleView>
</template>
