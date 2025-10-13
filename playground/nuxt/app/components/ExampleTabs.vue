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
    avatar: { src: 'https://i.pravatar.cc/100' },
    content: 'And, this is the content for Tab2',
    slot: 'tab2' as const,
  },
  {
    label: 'Tab3',
    icon: 'i-lucide-bell',
    badge: { label: 'disabled', color: 'error' },
    content: 'Finally, this is the content for Tab3',
    disabled: true,
  },
])

const controls: ControlItems<TabsProps<typeof items[number]>> = [
  { prop: 'color', value: 'primary', options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'orientation', value: 'horizontal', options: ['horizontal', 'vertical'] },
  { prop: 'variant', value: 'pill', options: ['pill', 'link'] },
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

        <template #list-leading>
          <Placeholder label="#list-leading" />
        </template>

        <template #leading>
          <Placeholder label="#leading" />
        </template>
        <template #trailing>
          <Placeholder label="#trailing" />
        </template>
        <template #content>
          <Placeholder label="#content / #[slot]" class="h-40" />
        </template>

        <template #list-trailing>
          <Placeholder label="#list-trailing" />
        </template>
      </UTabs>
    </div>
  </ExampleView>
</template>
