<script lang="ts" setup>
import type { LinkProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<LinkProps> = [
  { prop: 'label', value: 'Github' },
  { prop: 'href', value: 'https://github.com/' },
  { prop: 'target', value: null, options: [{ label: 'none', value: null }, '_blank', '_parent', '_self', '_top'] },
  { prop: 'active', value: false },
  { prop: 'disabled', value: false },
  { prop: 'raw', value: false },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Link"
    description="A wrapper around with extra props."
    :controls="controls"
  >
    <ul class="flex flex-col gap-4">
      <li><ULink v-bind="attrs" :label="attrs.label || 'text'" /></li>
      <li><ULink v-bind="attrs" to="/other" :target="undefined" label="Route to other page" /></li>
    </ul>
  </ExampleView>
</template>
