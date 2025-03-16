<script setup lang="ts">
import type { CarouselProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const items = Array.from({ length: 15 }, (_, i) => `https://picsum.photos/id/${i + i * 11}/640/640`)

const controls: ControlItems<CarouselProps<typeof items[number]>> = [
  { prop: 'orientation', value: 'horizontal', options: ['horizontal', 'vertical'] },
  { prop: 'align', value: 'center', options: ['center', 'start', 'end'] },
  { prop: 'slidesToScroll', value: 1, options: [{ label: 'ON (auto)', value: 'auto' }, { label: 'OFF (1)', value: 1 }] },
  { prop: 'arrows', value: false, description: 'Display prev and next buttons to scroll the carousel.' },
  { prop: 'dots', value: false, description: 'Display dots to scroll to a specific slide.' },
  { prop: 'skipSnaps', value: false, description: 'Allow the carousel to skip scroll snaps if it\'s dragged vigorously.\nNote that this option will be ignored if the `dragFree` option is set to true.' },
  { prop: 'dragFree', value: false, description: 'Enables momentum scrolling. The duration of the continued scrolling is proportional to how vigorous the drag gesture is.' },
  { prop: 'loop', value: false },
  { prop: 'autoplay', value: false },
  { prop: 'classNames', value: false },
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
          item: 'sm:basis-1/2 md:basis-1/3 xl:basis-1/4',
        }"
      >
        <img :src="item" width="320" height="320" alt="" />
      </UCarousel>
    </div>
  </ExampleView>
</template>

<style scoped>
:deep(.is-in-view) {
  --uno: "transition duration-500";
}
:deep(.is-in-view:not(.is-snapped)) {
  --uno: "opacity-20 bg-ui-cx/50";
}
</style>
