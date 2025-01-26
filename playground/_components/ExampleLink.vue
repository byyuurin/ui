<script lang="ts" setup>
import type { LinkProps } from '@byyuurin/ui'
import { Link } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<LinkProps> = [
  { prop: 'label', value: 'text' },
  { prop: 'active', value: false },
  { prop: 'disabled', value: false },
]
</script>

<template>
  <ExampleView v-slot="attrs" title="Link" :controls="controls">
    <div>
      <Link v-bind="attrs" :label="attrs.label || 'text'" />
    </div>
  </ExampleView>
</template>
