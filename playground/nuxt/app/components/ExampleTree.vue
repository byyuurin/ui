<script setup lang="ts">
import type { TreeItem, TreeProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const items = [
  {
    label: 'app/',
    defaultExpanded: true,
    children: [
      {
        label: 'composables/',
        children: [
          {
            label: 'useAuth.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
          {
            label: 'useUser.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
        ],
      },
      {
        label: 'components/',
        defaultExpanded: true,
        children: [
          {
            label: 'Card.vue',
            icon: 'i-vscode-icons-file-type-vue',
          },
          {
            label: 'Button.vue',
            icon: 'i-vscode-icons-file-type-vue',
          },
        ],
      },
    ],
  },
  {
    label: 'app.vue',
    icon: 'i-vscode-icons-file-type-vue',
  },
  {
    label: 'nuxt.config.ts',
    icon: 'i-vscode-icons-file-type-nuxt',
  },
] satisfies TreeItem[]

const value = ref<any>([])

const controls: ControlItems<TreeProps<typeof items, boolean>> = [
  { prop: 'color', value: 'primary', options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'multiple', value: false },
  { prop: 'disabled', value: false },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Tree"
    description="A tree view component to display and interact with hierarchical data structures."
    :controls="controls"
  >
    <UTree v-bind="attrs" :model-value="value" :items="items" class="w-60" @update:model-value="value = $event" />
  </ExampleView>
</template>
