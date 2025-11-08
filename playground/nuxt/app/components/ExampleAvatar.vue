<script setup lang="ts">
import type { AvatarProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<AvatarProps> = [
  { prop: 'size', value: 'md', options: ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] },
  { prop: 'icon', value: null, options: [
    { label: 'No icon', value: null },
    'i-lucide:image',
    'i-lucide:circle-user',
  ] },
  { prop: 'src', value: 'https://i.pravatar.cc/100?img=1', placeholder: 'No src' },
  { prop: 'text', value: '', placeholder: 'No text' },
  { prop: 'alt', value: '', placeholder: 'No alt', warning: 'When no icon or text is provided, the initials of the `alt` prop is used as fallback.' },
  { prop: 'style', value: '' },
  { prop: 'chip', value: false },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Avatar"
    description="An img element with fallback"
    :controls="controls"
  >
    <div>
      <UAvatar v-bind="attrs" />
    </div>
  </ExampleView>
</template>
