<script lang="ts" setup>
import type { TooltipProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<TooltipProps & { label: string } & Pick<(TooltipProps['content'] & object), 'side'>> = [
  { prop: 'side', value: 'bottom', options: ['top', 'bottom', 'left', 'right'] },
  { prop: 'label', value: 'trigger' },
  { prop: 'text', value: 'text' },
  { prop: 'arrow', value: true },
  { prop: 'disabled', value: false },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Tooltip"
    description="A popup that reveals information when hovering over an element."
    :controls="controls"
  >
    <div class="flex flex-wrap gap-4">
      <UTooltip v-bind="attrs" :content="{ side: attrs.side }">
        <UButton :label="attrs.label || 'trigger'" />
      </UTooltip>

      <UTooltip v-bind="attrs" :content="{ side: attrs.side }">
        <UButton label="slots" />
        <template #content>
          <Placeholder label="#content" />
        </template>
      </UTooltip>
    </div>
  </ExampleView>
</template>
