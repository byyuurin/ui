<script setup lang="ts">
import { Card, type CardProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<CardProps> = [
  { prop: 'title', value: 'Title' },
  { prop: 'description', value: 'Description' },
]
</script>

<template>
  <ExampleView
    v-slot="props"
    title="Card"
    description="Display content in a card with a header, body and footer."
    :controls="controls"
  >
    <div class="grid md:grid-cols-2 items-start gap-4">
      <Card v-bind="props">
        <Placeholder class="h-44" />
      </Card>

      <Card v-bind="props">
        <template #title>
          <Placeholder label="#title" label-position="left" />
        </template>
        <template #description>
          <Placeholder label="#description" label-position="left" />
        </template>
        <Placeholder class="h-43" />
      </Card>

      <Card v-bind="props">
        <template #header>
          <Placeholder label="#header" />
        </template>
        <Placeholder class="h-36" />
        <template #footer>
          <Placeholder label="#footer" />
        </template>
      </Card>

      <Card v-bind="props">
        <template #content>
          <Placeholder class="h-79" label="#content" />
        </template>
      </Card>
    </div>
  </ExampleView>
</template>
