<script lang="ts" setup>
import type { TabsItem, TabsProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<TabsProps<any>> = [
  { prop: 'orientation', value: 'horizontal', options: ['horizontal', 'vertical'] },
  { prop: 'variant', value: 'solid', options: ['solid', 'outline', 'soft', 'soft-outline', 'link'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'evenly', value: true },
  { prop: 'content', value: true },
  { prop: 'unmountOnHide', value: true },
]

const items: TabsItem[] = [
  {
    label: 'Tab1',
    icon: 'i-lucide-blocks',
    content: 'This is the content shown for Tab1',
  },
  {
    label: 'Tab2',
    icon: 'i-lucide-user',
    content: 'And, this is the content for Tab2',
  },
  {
    label: 'Tab3 (disabled)',
    icon: 'i-lucide-bell',
    content: 'Finally, this is the content for Tab3',
    disabled: true,
  },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Tabs"
    description="A set of tab panels that are displayed one at a time."
    :controls="controls"
  >
    <div class="flex flex-col gap-4">
      <UTabs v-bind="attrs" :items="items" />
      <UTabs v-bind="attrs" :items="[{}]">
        <Placeholder label="#default" />

        <template #prefix>
          <Placeholder label="#prefix" />
        </template>
        <template #suffix>
          <Placeholder label="#suffix" />
        </template>
        <template #content>
          <Placeholder label="#content" class="h-40" />
        </template>
      </UTabs>
    </div>
  </ExampleView>
</template>
