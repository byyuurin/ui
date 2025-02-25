<script setup lang="ts">
import type { PopoverProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<PopoverProps & { side: (PopoverProps['content'] & object)['side'] }> = [
  { prop: 'side', value: 'right', options: ['top', 'bottom', 'left', 'right'] },
  { prop: 'mode', value: 'hover', options: ['hover', 'click'] },
  { prop: 'arrow', value: true },
  { prop: 'dismissible', value: true },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Popover"
    description="A non-modal dialog that floats around a trigger element."
    :controls="controls"
  >
    <UPopover v-bind="attrs" :content="{ side: attrs.side }">
      <UButton label="Trigger" />

      <template #content>
        <Placeholder class="bg-ui-cx size-80" label="#content" />
      </template>
    </UPopover>
  </ExampleView>
</template>
