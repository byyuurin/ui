<script setup lang="ts">
import type { ScrollAreaProps } from '@byyuurin/ui'
import { ScrollArea } from '@byyuurin/ui'
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
    <ScrollArea v-bind="attrs" class="w-full h-225px">
      <div class="grid grid-cols-2 gap-1 w-100vw">
        <Placeholder class="bg-ui-cb/10 h-50" />
        <Placeholder class="bg-red/10 h-50" />
        <Placeholder class="bg-green/10 h-50" />
        <Placeholder class="bg-blue/10 h-50" />
      </div>
    </ScrollArea>
  </ExampleView>
</template>
