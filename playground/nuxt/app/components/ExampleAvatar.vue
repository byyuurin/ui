<script setup lang="ts">
import type { AvatarProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<AvatarProps> = [
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'icon', value: null, options: [
    { label: 'No icon', value: null },
    'i-mdi-file-image',
    'i-mdi-file-image-box',
    'i-mdi-google-photos',
  ] },
  { prop: 'src', value: 'https://i.pravatar.cc/100', placeholder: 'No src' },
  { prop: 'text', value: '', placeholder: 'No text' },
  { prop: 'alt', value: '', placeholder: 'No alt', warning: 'When no icon or text is provided, the initials of the `alt` prop is used as fallback.' },
  { prop: 'style', value: '' },
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
