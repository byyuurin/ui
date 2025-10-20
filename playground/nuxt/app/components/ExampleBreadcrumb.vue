<script setup lang="ts">
import type { BreadcrumbItem, BreadcrumbProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const defineItems = <T extends BreadcrumbItem>(items: T[]) => items

const items = defineItems([
  { label: 'Home', icon: 'i-lucide-house', to: '/' },
  { label: 'Components', icon: 'i-lucide-box', to: '/' },
  { label: 'Custom', icon: 'i-lucide-plug', to: '/', slot: 'custom' as const },
  { label: 'Breadcrumb', icon: 'i-lucide-link', to: '/' },
  { label: 'Avatar', avatar: { src: 'https://i.pravatar.cc/100' }, to: '/' },
])

const controls: ControlItems<BreadcrumbProps<typeof items>> = []
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Breadcrumb"
    description="A hierarchy of links to navigate through a website."
    :controls="controls"
  >
    <UBreadcrumb v-bind="attrs" :items="items">
      <template #custom>
        <Placeholder label="#custom" />
      </template>
    </UBreadcrumb>
  </ExampleView>
</template>
