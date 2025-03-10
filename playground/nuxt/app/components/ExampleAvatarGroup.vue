<script setup lang="ts">
import type { AvatarGroupProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<AvatarGroupProps> = [
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'max', value: 9 },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="AvatarGroup"
    description="Stack multiple avatars in a group."
    :controls="controls"
  >
    <div>
      <UAvatarGroup v-bind="attrs">
        <UAvatar v-for="n in 20" :key="n" :src="`https://i.pravatar.cc/100?img=${n}`" />
      </UAvatarGroup>
    </div>
  </ExampleView>
</template>
