<script setup lang="ts">
import type { AccordionItem, AccordionProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const items = [
  {
    label: 'Getting Started',
    icon: 'i-lucide-info',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.',
  },
  {
    label: 'Installation',
    icon: 'i-lucide-download',
    disabled: true,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.',
  },
  {
    label: 'Theming',
    icon: 'i-lucide-pipette',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.',
  },
  {
    label: 'Layouts',
    icon: 'i-lucide-layout-dashboard',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.',
  },
  {
    label: 'Components',
    icon: 'i-lucide-layers-3',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.',
  },
  {
    label: 'Utilities',
    icon: 'i-lucide-wrench',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.',
  },
  {
    label: 'Custom Body',
    icon: 'i-lucide-plug',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.',
    slot: 'custom' as const,
  },
] satisfies AccordionItem[]

const controls: ControlItems<AccordionProps<typeof items[number]>> = [
  { prop: 'type', value: 'single', options: ['single', 'multiple'] },
  { prop: 'unmountOnHide', value: true },
  { prop: 'disabled', value: false },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Accordion"
    description="A stacked set of collapsible panels."
    :controls="controls"
  >
    <UAccordion :items="items" :collapsible="true" v-bind="attrs">
      <template #custom-body="{ item }">
        <pre>{{ item }}</pre>
      </template>
    </UAccordion>
  </ExampleView>
</template>
