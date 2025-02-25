<script setup lang="ts">
import type { AccordionItem, AccordionProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const items: AccordionItem[] = [
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
]

const controls: ControlItems<AccordionProps<AccordionItem>> = [
  { prop: 'type', value: 'single', options: ['single', 'multiple'] },
  { prop: 'unmountOnHide', value: true },
  { prop: 'collapsible', value: true },
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
    <UAccordion :items="items" v-bind="attrs" />
  </ExampleView>
</template>
