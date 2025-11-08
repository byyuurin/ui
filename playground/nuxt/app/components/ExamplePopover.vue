<script setup lang="ts">
import type { PopoverProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<PopoverProps & { side: (PopoverProps['content'] & object)['side'] }> = [
  { prop: 'side', value: 'right', options: ['top', 'bottom', 'left', 'right'] },
  { prop: 'mode', value: 'hover', options: ['hover', 'click'] },
  { prop: 'arrow', value: true },
  { prop: 'dismissible', value: true },
]

const open = ref(false)
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Popover"
    description="A non-modal dialog that floats around a trigger element."
    :controls="controls"
  >
    <div class="flex flex-wrap gap-2">
      <UPopover v-bind="attrs" :content="{ side: attrs.side }">
        <UButton label="Trigger" />

        <template #content>
          <Placeholder class="size-80" label="#content" />
        </template>
      </UPopover>

      <UPopover
        v-model:open="open"
        v-bind="attrs"
        :dismissible="false"
      >
        <template #anchor>
          <UInput placeholder="#anchor" @focus="open = true" @blur="open = false" />
        </template>

        <template #content>
          <Placeholder class="size-80" label="#content" />
        </template>
      </UPopover>
    </div>
  </ExampleView>
</template>
