<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from 'embla-carousel'
import type { AutoHeightOptionsType } from 'embla-carousel-auto-height'
import type { AutoScrollOptionsType } from 'embla-carousel-auto-scroll'
import type { AutoplayOptionsType } from 'embla-carousel-autoplay'
import type { ClassNamesOptionsType } from 'embla-carousel-class-names'
import type { FadeOptionsType } from 'embla-carousel-fade'
import type { WheelGesturesPluginOptions } from 'embla-carousel-wheel-gestures'
import type { AcceptableValue, PrimitiveProps } from 'reka-ui'
import type { carousel } from '../theme'
import type { ButtonProps, ComponentAttrs } from '../types'

type CarouselVariants = VariantProps<typeof carousel>

export interface CarouselProps<T> extends ComponentAttrs<typeof carousel>, Pick<PrimitiveProps, 'as'>, Omit<EmblaOptionsType, 'axis' | 'container' | 'slides' | 'direction'> {
  /**
   * Configure the prev button when arrows are enabled.
   * @default { size: 'md', variant: 'link' }
   */
  prev?: ButtonProps
  /**
   * The icon displayed in the prev button.
   * @default `app.icons.arrowLeft`
   */
  prevIcon?: string
  /**
   * Configure the next button when arrows are enabled.
   * @default { size: 'md', variant: 'link' }
   */
  next?: ButtonProps
  /**
   * The icon displayed in the next button.
   * @default `app.icons.arrowRight`
   */
  nextIcon?: string
  /**
   * Display prev and next buttons to scroll the carousel.
   * @default false
   */
  arrows?: boolean
  /**
   * Display dots to scroll to a specific slide.
   * @default false
   */
  dots?: boolean
  orientation?: CarouselVariants['orientation']
  items?: T[]
  dir?: 'rtl' | 'ltr'
  /**
   * Enable Autoplay plugin
   * @link https://www.embla-carousel.com/plugins/autoplay/
   */
  autoplay?: boolean | AutoplayOptionsType
  /**
   * Enable Auto Scroll plugin
   * @link https://www.embla-carousel.com/plugins/auto-scroll/
   */
  autoScroll?: boolean | AutoScrollOptionsType
  /**
   * Enable Auto Height plugin
   * @link https://www.embla-carousel.com/plugins/auto-height/
   */
  autoHeight?: boolean | AutoHeightOptionsType
  /**
   * Enable Class Names plugin
   * @link https://www.embla-carousel.com/plugins/class-names/
   */
  classNames?: boolean | ClassNamesOptionsType
  /**
   * Enable Fade plugin
   * @link https://www.embla-carousel.com/plugins/fade/
   */
  fade?: boolean | FadeOptionsType
  /**
   * Enable Wheel Gestures plugin
   * @link https://www.embla-carousel.com/plugins/wheel-gestures/
   */
  wheelGestures?: boolean | WheelGesturesPluginOptions
}

export interface CarouselSlots<T> {
  default?: (props: { item: T, index: number }) => any
}
</script>

<script setup lang="ts" generic="T extends AcceptableValue">
import { computedAsync, reactivePick } from '@vueuse/core'
import useEmblaCarousel from 'embla-carousel-vue'
import { Primitive, useForwardProps } from 'reka-ui'
import { computed, onMounted, ref, watch } from 'vue'
import { useTheme } from '../composables/useTheme'
import Button from './Button.vue'

const props = withDefaults(defineProps<CarouselProps<T>>(), {
  orientation: 'horizontal',
  arrows: false,
  dots: false,

  dir: 'ltr',

  // Embla Options
  active: true,
  align: 'center',
  breakpoints: () => ({}),
  containScroll: 'trimSnaps',
  dragFree: false,
  dragThreshold: 10,
  duration: 25,
  inViewThreshold: 0,
  loop: false,
  skipSnaps: false,
  slidesToScroll: 1,
  startIndex: 0,
  watchDrag: true,
  watchResize: true,
  watchSlides: true,
  watchFocus: true,

  // Embla Plugins
  autoplay: false,
  autoScroll: false,
  autoHeight: false,
  classNames: false,
  fade: false,
  wheelGestures: false,
})
defineSlots<CarouselSlots<T>>()

const rootProps = useForwardProps(reactivePick(props, 'active', 'align', 'breakpoints', 'containScroll', 'dragFree', 'dragThreshold', 'duration', 'inViewThreshold', 'loop', 'skipSnaps', 'slidesToScroll', 'startIndex', 'watchDrag', 'watchResize', 'watchSlides', 'watchFocus'))

const { theme, createStyler } = useTheme()
const style = computed(() => {
  const styler = createStyler(theme.value.carousel)
  return styler(props)
})

const prevIcon = computed(() => props.prevIcon || (props.dir === 'rtl' ? theme.value.app.icons.arrowRight : theme.value.app.icons.arrowLeft))
const nextIcon = computed(() => props.nextIcon || (props.dir === 'rtl' ? theme.value.app.icons.arrowLeft : theme.value.app.icons.arrowRight))

const options = computed<EmblaOptionsType>(() => ({
  ...(props.fade ? { align: 'center', containScroll: false } : {}),
  ...rootProps.value,
  axis: props.orientation === 'horizontal' ? 'x' : 'y',
  direction: props.dir === 'rtl' ? 'rtl' : 'ltr',
}))

const plugins = computedAsync<EmblaPluginType[]>(async () => {
  const plugins: EmblaPluginType[] = []

  if (props.autoplay) {
    const AutoplayPlugin = await import('embla-carousel-autoplay').then((r) => r.default)
    plugins.push(AutoplayPlugin(typeof props.autoplay === 'boolean' ? {} : props.autoplay))
  }

  if (props.autoScroll) {
    const AutoScrollPlugin = await import('embla-carousel-auto-scroll').then((r) => r.default)
    plugins.push(AutoScrollPlugin(typeof props.autoScroll === 'boolean' ? {} : props.autoScroll))
  }

  if (props.autoHeight) {
    const AutoHeightPlugin = await import('embla-carousel-auto-height').then((r) => r.default)
    plugins.push(AutoHeightPlugin(typeof props.autoHeight === 'boolean' ? {} : props.autoHeight))
  }

  if (props.classNames) {
    const ClassNamesPlugin = await import('embla-carousel-class-names').then((r) => r.default)
    plugins.push(ClassNamesPlugin(typeof props.classNames === 'boolean' ? {} : props.classNames))
  }

  if (props.fade) {
    const FadePlugin = await import('embla-carousel-fade').then((r) => r.default)
    plugins.push(FadePlugin(typeof props.fade === 'boolean' ? {} : props.fade))
  }

  if (props.wheelGestures) {
    const { WheelGesturesPlugin } = await import('embla-carousel-wheel-gestures')
    plugins.push(WheelGesturesPlugin(typeof props.wheelGestures === 'boolean' ? {} : props.wheelGestures))
  }

  return plugins
})

const [emblaRef, emblaApi] = useEmblaCarousel(options.value, plugins.value)

watch([options, plugins], () => {
  emblaApi.value?.reInit(options.value, plugins.value)
})

function scrollPrev() {
  emblaApi.value?.scrollPrev()
}

function scrollNext() {
  emblaApi.value?.scrollNext()
}

function scrollTo(index: number) {
  emblaApi.value?.scrollTo(index)
}

function onKeyDown(event: KeyboardEvent) {
  const prevKey = props.orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft'
  const nextKey = props.orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight'

  if (event.key === prevKey) {
    event.preventDefault()
    scrollPrev()

    return
  }

  if (event.key === nextKey) {
    event.preventDefault()
    scrollNext()
  }
}

const canScrollNext = ref(false)
const canScrollPrev = ref(false)
const selectedIndex = ref<number>(0)
const scrollSnaps = ref<number[]>([])

function onInit(api: EmblaCarouselType) {
  scrollSnaps.value = api?.scrollSnapList() || []
}

function onSelect(api: EmblaCarouselType) {
  canScrollNext.value = api?.canScrollNext() || false
  canScrollPrev.value = api?.canScrollPrev() || false
  selectedIndex.value = api?.selectedScrollSnap() || 0
}

onMounted(() => {
  if (!emblaApi.value)
    return

  emblaApi.value?.on('init', onInit)
  emblaApi.value?.on('init', onSelect)
  emblaApi.value?.on('reInit', onInit)
  emblaApi.value?.on('reInit', onSelect)
  emblaApi.value?.on('select', onSelect)
})

defineExpose({
  emblaRef,
  emblaApi,
})
</script>

<template>
  <Primitive
    :as="props.as"
    role="region"
    aria-roledescription="carousel"
    tabindex="0"
    :dir="props.dir"
    :class="style.root({ class: [props.class, props.ui?.root] })"
    @keydown="onKeyDown"
  >
    <div ref="emblaRef" :class="style.viewport({ class: props.ui?.viewport })">
      <div :class="style.container({ class: props.ui?.container })">
        <div
          v-for="(item, index) in props.items"
          :key="index"
          role="group"
          aria-roledescription="slide"
          :class="style.item({ class: props.ui?.item })"
        >
          <slot :item="item" :index="index"></slot>
        </div>
      </div>
    </div>

    <div v-if="props.arrows || props.dots" :class="style.controls({ class: props.ui?.controls })">
      <div v-if="props.arrows" :class="style.arrows({ class: props.ui?.arrows })">
        <Button
          :disabled="!canScrollPrev"
          :icon="prevIcon"
          size="md"
          variant="outline"
          aria-label="prev"
          v-bind="typeof props.prev === 'object' ? props.prev : undefined"
          :class="style.prev({ class: props.ui?.prev })"
          @click="scrollPrev"
        />
        <Button
          :disabled="!canScrollNext"
          :icon="nextIcon"
          size="md"
          variant="outline"
          aria-label="next"
          v-bind="typeof props.next === 'object' ? props.next : undefined"
          :class="style.next({ class: props.ui?.next })"
          @click="scrollNext"
        />
      </div>

      <div v-if="props.dots" :class="style.dots({ class: props.ui?.dots })">
        <template v-for="(_, index) in scrollSnaps" :key="index">
          <button
            :aria-label="`Go to ${index + 1}`"
            :class="style.dot({ class: props.ui?.dot, active: selectedIndex === index })"
            @click="scrollTo(index)"
          ></button>
        </template>
      </div>
    </div>
  </Primitive>
</template>
