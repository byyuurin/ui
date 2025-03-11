<script setup lang="ts">
import type { KbdProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const kbdKeys = [
  'meta',
  'ctrl',
  'alt',
  'win',
  'command',
  'shift',
  'option',
  'enter',
  'delete',
  'backspace',
  'escape',
  'tab',
  'capslock',
  'arrowup',
  'arrowright',
  'arrowdown',
  'arrowleft',
  'pageup',
  'pagedown',
  'home',
  'end',
  ...Array.from({ length: 26 }, (_, i) => String.fromCodePoint(97 + i)),
  ...Array.from({ length: 10 }, (_, i) => String(i)),
]

const controls: ControlItems<KbdProps> = [
  { prop: 'variant', value: 'outline', options: ['solid', 'outline', 'soft', 'soft-outline'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'value', value: 'meta', options: kbdKeys },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Kbd"
    description="A kbd element to display a keyboard key."
    :controls="controls"
  >
    <UKbd v-bind="attrs" />
  </ExampleView>
</template>
