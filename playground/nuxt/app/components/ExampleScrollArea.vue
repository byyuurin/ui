<script setup lang="ts">
import type { ScrollAreaProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<ScrollAreaProps> = [
  { prop: 'type', value: 'hover', options: ['auto', 'always', 'hover', 'scroll'] },
  { prop: 'dir', value: 'ltr', options: ['ltr', 'rtl'] },
  { prop: 'scrollHideDelay', value: 600 },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="ScrollArea"
    description="Augments native scroll functionality for custom, cross-browser styling."
    :controls="controls"
  >
    <div class="flex flex-col gap-4">
      <UScrollArea v-bind="attrs" class="shadow-sm shadow-default border border-default h-55 rounded">
        <div class="grid grid-cols-2 gap-1 w-screen">
          <Placeholder class="bg-ui-cb/10 h-50" />
          <Placeholder class="bg-red/10 h-50" />
          <Placeholder class="bg-green/10 h-50" />
          <Placeholder class="bg-blue/10 h-50" />
        </div>
      </UScrollArea>

      <UScrollArea v-bind="attrs" class="shadow-sm shadow-default border border-default h-55 rounded">
        <Placeholder class="h-50 w-screen" />
      </UScrollArea>

      <UScrollArea v-bind="attrs" class="shadow-sm shadow-default border border-default h-55 rounded">
        <Placeholder class="bg-ui-cb/10 h-50" />
        <Placeholder class="bg-red/10 h-50" />
        <Placeholder class="bg-green/10 h-50" />
        <Placeholder class="bg-blue/10 h-50" />
      </UScrollArea>
    </div>
  </ExampleView>
</template>
