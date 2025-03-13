<script setup lang="ts">
import type { AlertProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<AlertProps> = [
  { prop: 'orientation', value: 'vertical', options: ['horizontal', 'vertical'] },
  { prop: 'variant', value: 'solid', options: ['solid', 'outline', 'soft', 'soft-outline'] },
  { prop: 'title', value: 'Title' },
  { prop: 'description', value: 'Description' },
  { prop: 'close', value: false },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Alert"
    description="A callout to draw user's attention."
    :controls="controls"
  >
    <div class="flex flex-col gap-4">
      <UAlert v-bind="attrs" />
      <UAlert
        v-bind="attrs"
        icon="i-carbon-notification"
        :actions="[
          { label: 'action1', variant: attrs.variant },
          { label: 'action2', variant: attrs.variant },
        ]"
      />
      <UAlert v-bind="attrs" :actions="[{}]" close>
        <template #leading>
          <Placeholder label="#leading" />
        </template>
        <template #close>
          <Placeholder label="#close" />
        </template>
        <template #title>
          <Placeholder label="#title" label-position="left" />
        </template>
        <template #description>
          <Placeholder label="#description" label-position="left" />
        </template>
        <template #actions>
          <Placeholder label="#actions" />
        </template>
      </UAlert>
    </div>
  </ExampleView>
</template>
