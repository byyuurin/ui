<script setup lang="ts">
import type { PopoverProps } from '@byyuurin/ui'
import { Button, Popover } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<PopoverProps & { side: (PopoverProps['content'] & object)['side'] }> = [
  { prop: 'side', value: 'right', options: ['top', 'bottom', 'left', 'right'] },
  { prop: 'mode', value: 'hover', options: ['hover', 'click'] },
  { prop: 'arrow', value: true },
  { prop: 'dismissible', value: true },
]
</script>

<template>
  <ExampleView v-slot="attrs" title="Popover" :controls="controls">
    <Popover v-bind="attrs" :content="{ side: attrs.side }">
      <Button label="Trigger" />

      <template #content>
        <Placeholder class="size-80" label="#content" />
      </template>
    </Popover>
  </ExampleView>
</template>
