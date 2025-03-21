<script lang="ts" setup>
import type { TabsItem, TabsProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const defineItems = <T extends TabsItem>(items: T[]) => items

const items = defineItems([
  {
    label: 'Tab1',
    icon: 'i-lucide-blocks',
    content: 'This is the content shown for Tab1',
  },
  {
    label: 'Tab2',
    icon: 'i-lucide-user',
    content: 'And, this is the content for Tab2',
    slot: 'tab2' as const,
  },
  {
    label: 'Tab3 (disabled)',
    icon: 'i-lucide-bell',
    content: 'Finally, this is the content for Tab3',
    disabled: true,
  },
])

const controls: ControlItems<TabsProps<typeof items[number]>> = [
  { prop: 'orientation', value: 'horizontal', options: ['horizontal', 'vertical'] },
  { prop: 'variant', value: 'solid', options: ['solid', 'outline', 'soft', 'soft-outline', 'link'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'evenly', value: true },
  { prop: 'content', value: true },
  { prop: 'unmountOnHide', value: true },
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
      <UTabs v-bind="attrs" :items="items">
        <template #tab2="{ item }">
          <pre>{{ item }}</pre>
        </template>
      </UTabs>
      <UTabs v-bind="attrs" :items="[{}]">
        <Placeholder label="#default" />

        <template #leading>
          <Placeholder label="#leading" />
        </template>
        <template #trailing>
          <Placeholder label="#trailing" />
        </template>
        <template #content>
          <Placeholder label="#content / #[slot]" class="h-40" />
        </template>
      </UTabs>
    </div>
  </ExampleView>
</template>
