<script setup lang="ts">
import type { CarouselProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const items = Array.from({ length: 15 }, (_, i) => ({
  index: i,
  url: `https://picsum.photos/id/${i + i * 11}/640/640`,
}))

const controls: ControlItems<CarouselProps<typeof items[number]>> = [
  { prop: 'orientation', value: 'horizontal', options: ['horizontal', 'vertical'] },
  { prop: 'align', value: 'center', options: ['center', 'start', 'end'] },
  { prop: 'slidesToScroll', value: 1, options: [{ label: 'auto', value: 'auto' }, { label: '1', value: 1 }], description: 'Group slides together. \nDrag interactions, dot navigation, and previous/next buttons are mapped to group slides into the given number, which has to be an integer. \nSet it to `auto` if you want Embla to group slides automatically.' },
  { prop: 'arrows', value: false, description: 'Display prev and next buttons to scroll the carousel.' },
  { prop: 'dots', value: false, description: 'Display dots to scroll to a specific slide.' },
  { prop: 'skipSnaps', value: false, description: 'Allow the carousel to skip scroll snaps if it\'s dragged vigorously.\nNote that this option will be ignored if the `dragFree` option is set to true.' },
  { prop: 'dragFree', value: false, description: 'Enables momentum scrolling. The duration of the continued scrolling is proportional to how vigorous the drag gesture is.' },
  { prop: 'loop', value: false },
  { prop: 'autoplay', value: false },
  { prop: 'autoScroll', value: false },
  { prop: 'classNames', value: false },
]

const state = reactive({
  autoplay: false,
  autoScroll: false,
})

const carouselRef = useTemplateRef('carousel')

function togglePlay(name: keyof typeof state) {
  const autoplay = carouselRef.value?.emblaApi?.plugins().autoplay
  const autoScroll = carouselRef.value?.emblaApi?.plugins().autoScroll

  if (name === 'autoplay' && autoplay) {
    if (autoplay.isPlaying())
      autoplay.stop()
    else
      autoplay.play()
  }

  if (name === 'autoScroll' && autoScroll) {
    if (autoScroll.isPlaying())
      autoScroll.stop()
    else
      autoScroll.play()
  }
}

onMounted(() => {
  carouselRef.value?.emblaApi?.on('autoplay:play', startAutoplay)
  carouselRef.value?.emblaApi?.on('autoplay:stop', stopAutoplay)
  carouselRef.value?.emblaApi?.on('autoScroll:play', startAutoScroll)
  carouselRef.value?.emblaApi?.on('autoScroll:stop', stopAutoScroll)
})

onUnmounted(() => {
  carouselRef.value?.emblaApi?.off('autoplay:play', startAutoplay)
  carouselRef.value?.emblaApi?.off('autoplay:stop', stopAutoplay)
  carouselRef.value?.emblaApi?.off('autoScroll:play', startAutoScroll)
  carouselRef.value?.emblaApi?.off('autoScroll:stop', stopAutoScroll)
})

function startAutoplay() {
  state.autoplay = true
}

function stopAutoplay() {
  state.autoplay = false
}

function startAutoScroll() {
  state.autoScroll = true
}

function stopAutoScroll() {
  state.autoScroll = false
}
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Carousel"
    description="A carousel with motion and swipe built using Embla."
    :controls="controls"
  >
    <div class="absolute flex gap-2">
      <UButton
        :class="attrs.autoplay ? '' : 'hidden'"
        variant="outline"
        size="sm"
        :aria-pressed="state.autoplay"
        :icon="state.autoplay ? 'i-lucide:pause' : 'i-lucide:play'"
        label="Autoplay"
        :ui="{ base: 'rounded-full' }"
        @click="togglePlay('autoplay')"
      />
      <UButton
        :class="attrs.autoScroll ? '' : 'hidden'"
        variant="outline"
        size="sm"
        :aria-pressed="state.autoScroll"
        :icon="state.autoScroll ? 'i-lucide:pause' : 'i-lucide:play'"
        label="AutoScroll"
        :ui="{ base: 'rounded-full' }"
        @click="togglePlay('autoScroll')"
      />
    </div>
    <div class="p-12 pt-20" :class="attrs.orientation === 'vertical' ? 'sm:pt-22' : ''">
      <UCarousel
        ref="carousel"
        v-slot="{ item }"
        v-bind="attrs"
        :items="items"
        :ui="{
          root: attrs.orientation === 'vertical' ? 'w-80' : '',
          container: attrs.orientation === 'vertical' ? 'h-80' : '',
          item: 'sm:basis-1/2 md:basis-1/3 xl:basis-1/4',
        }"
      >
        <img :src="item.url" width="320" height="320" alt="" />
      </UCarousel>
    </div>
  </ExampleView>
</template>

<style scoped>
:deep(.is-in-view) {
  --uno: "transition duration-500 opacity-20 blur";
}
:deep(.is-snapped) {
  --uno: "opacity-100 blur-none";
}
</style>
