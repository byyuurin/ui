<script lang="ts" setup>
import type { TabsItem, TabsProps } from '@byyuurin/ui'
import { Tabs } from '@byyuurin/ui'

const attrs = reactive<Pick<TabsProps<TabsItem>, 'variant' | 'orientation' | 'full' | 'content'>>({
  variant: 'solid',
  orientation: 'horizontal',
  full: true,
  content: true,
})

const variantOptions: Array<TabsProps<TabsItem>['variant']> = ['solid', 'soft', 'link']
const orientationOptions: Array<TabsProps<TabsItem>['orientation']> = ['horizontal', 'vertical']

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
  <DemoBlock title="Tabs">
    <div>
      <div class="grid sm:grid-cols-[auto_1fr] items-center gap-2 py-4 gap-x-4 children:max-w-35">
        <label class="opacity-80">variant:</label>
        <select v-model="attrs.variant" class="p-1 bg-ui-cb/5">
          <option v-for="option in variantOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <label class="opacity-80">orientation:</label>
        <select v-model="attrs.orientation" class="p-1 bg-ui-cb/5">
          <option v-for="option in orientationOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <label class="opacity-80">full:</label>
        <input v-model="attrs.full" type="checkbox" class="size-5 accent-ui-cb" />
        <label class="opacity-80">content:</label>
        <input v-model="attrs.content" type="checkbox" class="size-5 accent-ui-cb" />
      </div>
      <Tabs v-bind="attrs" :items="items" />
    </div>
  </DemoBlock>
</template>
