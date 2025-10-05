<script setup lang="ts">
import type { FieldGroupProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<FieldGroupProps> = [
  { prop: 'orientation', value: 'horizontal', options: ['horizontal', 'vertical'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="FieldGroup"
    description="Group multiple button-like elements together."
    :controls="controls"
  >
    <div class="inline-flex flex-col gap-4">
      <div>
        <h2>With Button</h2>
        <UFieldGroup v-bind="attrs">
          <UButton label="Button" variant="outline" />
          <UButton variant="outline" icon="i-carbon-search" />
        </UFieldGroup>
      </div>
      <div>
        <h2>With Badge</h2>
        <UFieldGroup v-bind="attrs">
          <UBadge label="Badge" variant="outline" />
          <UButton variant="outline" icon="i-carbon-search" />
        </UFieldGroup>
      </div>
      <div>
        <h2>With Input</h2>
        <UFieldGroup v-bind="attrs">
          <UInput placeholder="Input" />
          <UButton variant="outline" icon="i-carbon-search" />
        </UFieldGroup>
      </div>
      <div>
        <h2>With Tooltip</h2>
        <UFieldGroup v-bind="attrs">
          <UInput placeholder="Input" />
          <UTooltip text="Copy to clipboard">
            <UButton variant="outline" icon="i-carbon-copy" />
          </UTooltip>
        </UFieldGroup>
      </div>
      <div>
        <h2>With Select</h2>
        <UFieldGroup v-bind="attrs">
          <USelect default-value="ON" :options="['ON', 'OFF']" :ui="{ content: 'min-w-25' }" />
          <UButton variant="outline" icon="i-carbon-save" />
        </UFieldGroup>
      </div>
    </div>
  </ExampleView>
</template>
