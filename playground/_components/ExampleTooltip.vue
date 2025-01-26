<script lang="ts" setup>
import type { TooltipProps } from '@byyuurin/ui'
import { Button, Tooltip } from '@byyuurin/ui'
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
  <ExampleView v-slot="attrs" title="Tooltip" :controls="controls">
    <Tooltip v-bind="attrs" :content="{ side: attrs.side }">
      <Button :label="attrs.label || 'trigger'" variant="link" />
    </Tooltip>

    <Tooltip v-bind="attrs" :content="{ side: attrs.side }">
      <Button label="slots" variant="link" />
      <template #content>
        <Placeholder label="#content" />
      </template>
    </Tooltip>
  </ExampleView>
</template>
