<script setup lang="ts">
import type { ContextMenuItem, ContextMenuProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const items = [
  [
    {
      label: 'Appearance',
      children: [
        {
          label: 'System',
          icon: 'i-lucide-monitor',
        },
        {
          label: 'Light',
          icon: 'i-lucide-sun',
        },
        {
          label: 'Dark',
          icon: 'i-lucide-moon',
        },
      ],
    },
  ],
  [
    {
      label: 'Show Sidebar',
      kbds: ['meta', 's'],
    },
    {
      label: 'Show Toolbar',
      kbds: ['shift', 'meta', 'd'],
    },
    {
      label: 'Collapse Pinned Tabs',
      disabled: true,
    },
  ],
  [
    {
      label: 'Refresh the Page',
    },
    {
      label: 'Clear Cookies and Refresh',
    },
    {
      label: 'Clear Cache and Refresh',
    },
    {
      type: 'separator',
    },
    {
      label: 'Developer',
      children: [
        [
          {
            label: 'View Source',
            kbds: ['meta', 'shift', 'u'],
          },
          {
            label: 'Developer Tools',
            kbds: ['option', 'meta', 'i'],
          },
          {
            label: 'Inspect Elements',
            kbds: ['option', 'meta', 'c'],
          },
        ],
        [
          {
            label: 'JavaScript Console',
            kbds: ['option', 'meta', 'j'],
          },
        ],
      ],
    },
  ],
] satisfies ContextMenuItem[][]

const controls: ControlItems<ContextMenuProps<typeof items>> = [
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'modal', value: true },
  { prop: 'disabled', value: false },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="ContextMenu"
    description="A menu to display actions when right-clicking on an element."
    :controls="controls"
  >
    <UContextMenu v-bind="attrs" :items="items">
      <div class="flex items-center justify-center rounded-md border border-dashed border-accented text-sm aspect-video w-72">
        Right click here
      </div>
    </UContextMenu>
  </ExampleView>
</template>
