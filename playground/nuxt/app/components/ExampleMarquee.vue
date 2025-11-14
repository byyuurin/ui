<script setup lang="ts">
import type { MarqueeProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<MarqueeProps> = [
  { prop: 'orientation', value: 'horizontal', options: ['horizontal', 'vertical'] },
  { prop: 'repeat', value: 4, min: 0 },
  { prop: 'overlay', value: true },
  { prop: 'pauseOnHover', value: false },
  { prop: 'reverse', value: false },
]
</script>

<template>
  <ExampleView v-slot="attrs" title="Marquee" description="A component to create infinite scrolling content." :controls="controls">
    <UMarquee class="max-h-70" v-bind="attrs">
      <UIcon name="i-simple-icons:github" class="size-10 shrink-0" />
      <UIcon name="i-simple-icons:discord" class="size-10 shrink-0" />
      <UIcon name="i-simple-icons:x" class="size-10 shrink-0" />
      <UIcon name="i-simple-icons:instagram" class="size-10 shrink-0" />
      <UIcon name="i-simple-icons:linkedin" class="size-10 shrink-0" />
      <UIcon name="i-simple-icons:facebook" class="size-10 shrink-0" />
    </UMarquee>
  </ExampleView>
</template>
