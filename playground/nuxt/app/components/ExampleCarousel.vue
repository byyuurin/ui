<script setup lang="ts">
import type { CarouselProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const items = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6',
  'https://picsum.photos/640/640?random=7',
  'https://picsum.photos/640/640?random=8',
  'https://picsum.photos/640/640?random=9',
  'https://picsum.photos/640/640?random=10',
]

const controls: ControlItems<CarouselProps<typeof items[number]>> = [
  { prop: 'dir', value: 'ltr', options: ['ltr', 'rtl'] },
  { prop: 'orientation', value: 'horizontal', options: ['horizontal', 'vertical'] },
  { prop: 'align', value: 'center', options: ['center', 'start', 'end'] },
  { prop: 'slidesToScroll', value: 1, options: [{ label: 'ON (auto)', value: 'auto' }, { label: 'OFF (1)', value: 1 }] },
  { prop: 'arrows', value: false },
  { prop: 'dots', value: false },
  { prop: 'loop', value: false },
  { prop: 'autoplay', value: false },
  { prop: 'dragFree', value: false },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Carousel"
    description="A carousel with motion and swipe built using Embla."
    :controls="controls"
  >
    <div class="p-16">
      <UCarousel
        v-slot="{ item }"
        v-bind="attrs"
        :items="items"
        :ui="{
          root: attrs.orientation === 'vertical' ? 'w-80' : '',
          container: attrs.orientation === 'vertical' ? 'h-80' : '',
          item: 'basis-1/3',
        }"
      >
        <img :src="item" width="320" height="320" alt="" />
      </UCarousel>
    </div>
  </ExampleView>
</template>
