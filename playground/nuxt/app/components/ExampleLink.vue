<script lang="ts" setup>
import type { LinkProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<LinkProps> = [
  { prop: 'label', value: 'Github' },
  { prop: 'href', value: 'https://github.com/' },
  { prop: 'target', value: '_blank', options: ['_blank', '_parent', '_self', '_top'] },
  { prop: 'underline', value: false },
  { prop: 'active', value: false },
  { prop: 'disabled', value: false },
  { prop: 'raw', value: false },
]
</script>

<template>
  <ExampleView v-slot="attrs" title="Link" :controls="controls">
    <ULink v-bind="attrs" :label="attrs.label || 'text'" />
  </ExampleView>
</template>
