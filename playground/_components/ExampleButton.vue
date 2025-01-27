<script lang="ts" setup>
import type { ButtonProps } from '@byyuurin/ui'
import { Button } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<ButtonProps> = [
  { prop: 'label', value: 'text', placeholder: 'text' },
  { prop: 'variant', value: 'solid', options: ['solid', 'outline', 'soft', 'ghost', 'link'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'active', value: false },
  { prop: 'disabled', value: false },
  { prop: 'round', value: false },
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
      <Button v-bind="attrs" label="" icon="i-carbon-asleep-filled" />
      <Button v-bind="attrs" :label="attrs.label || 'text'" />
      <Button v-bind="attrs" :label="attrs.label || 'text'" icon="i-carbon-asleep-filled" />
    </div>
  </ExampleView>
</template>
