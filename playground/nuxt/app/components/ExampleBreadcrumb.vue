<script setup lang="ts">
import type { BreadcrumbItem, BreadcrumbProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const items: BreadcrumbItem[] = [
  { label: 'Home', icon: 'i-lucide-house', to: '/' },
  { label: 'Components', icon: 'i-lucide-box', to: '/' },
  { label: 'Breadcrumb', icon: 'i-lucide-link', to: '/' },
]

const controls: ControlItems<BreadcrumbProps<BreadcrumbItem>> = [
  { prop: 'dir', value: 'ltr', options: ['ltr', 'rtl'] },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Breadcrumb"
    description="A hierarchy of links to navigate through a website."
    :controls="controls"
  >
    <UBreadcrumb v-bind="attrs" :items="items" />
  </ExampleView>
</template>
