<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from 'embla-carousel'
import type { AutoHeightOptionsType } from 'embla-carousel-auto-height'
import type { AutoScrollOptionsType } from 'embla-carousel-auto-scroll'
import type { AutoplayOptionsType } from 'embla-carousel-autoplay'
import type { ClassNamesOptionsType } from 'embla-carousel-class-names'
import type { FadeOptionsType } from 'embla-carousel-fade'
import type { WheelGesturesPluginOptions } from 'embla-carousel-wheel-gestures'
import type { PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/carousel'
import type { ButtonProps, ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'
import type { AcceptableValue, StaticSlot } from '../types/utils'

export type CarouselValue = AcceptableValue
export type CarouselItem = AcceptableValue | {
  class?: ComponentBaseProps['class']
  ui?: Pick<ComponentUIProps<typeof theme>, 'item'>
  [key: string]: any
}

type ThemeVariants = VariantProps<typeof theme>

export interface CarouselProps<T extends CarouselItem = CarouselItem> extends ComponentBaseProps, Omit<EmblaOptionsType, 'axis' | 'container' | 'slides' | 'direction'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  /**
   * Configure the prev button when arrows are enabled.
   * @default { size: 'md', variant: 'link' }
   */
  prev?: ButtonProps
  /**
   * The icon displayed in the prev button.
   * @default app.icons.chevronLeft
   */
  prevIcon?: string
  /**
   * Configure the next button when arrows are enabled.
   * @default { size: 'md', variant: 'link' }
   */
  next?: ButtonProps
  /**
   * The icon displayed in the next button.
   * @default app.icons.chevronRight
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
  /**
   * The orientation of the carousel.
   * @default "horizontal"
   */
  orientation?: ThemeVariants['orientation']
  items?: T[]
  /**
   * Enable Autoplay plugin
   * @see https://www.embla-carousel.com/plugins/autoplay/
   */
  autoplay?: boolean | AutoplayOptionsType
  /**
   * Enable Auto Scroll plugin
   * @see https://www.embla-carousel.com/plugins/auto-scroll/
   */
  autoScroll?: boolean | AutoScrollOptionsType
  /**
   * Enable Auto Height plugin
   * @see https://www.embla-carousel.com/plugins/auto-height/
   */
  autoHeight?: boolean | AutoHeightOptionsType
  /**
   * Enable Class Names plugin
   * @see https://www.embla-carousel.com/plugins/class-names/
   */
  classNames?: boolean | ClassNamesOptionsType
  /**
   * Enable Fade plugin
   * @see https://www.embla-carousel.com/plugins/fade/
   */
  fade?: boolean | FadeOptionsType
  /**
   * Enable Wheel Gestures plugin
   * @see https://www.embla-carousel.com/plugins/wheel-gestures/
   */
  wheelGestures?: boolean | WheelGesturesPluginOptions
  ui?: ComponentUIProps<typeof theme>
}

export interface CarouselEmits {
  /**
   * Emitted when the selected slide changes
   * @param selectedIndex The index of the selected slide
   */
  select: [selectedIndex: number]
}

export interface CarouselSlots<T extends CarouselItem = CarouselItem> {
  default: StaticSlot<{ item: T, index: number }>
}
</script>

<script setup lang="ts" generic="T extends CarouselItem">
import { reactivePick } from '@vueuse/core'
import useEmblaCarousel from 'embla-carousel-vue'
import { Primitive, useForwardProps } from 'reka-ui'
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { cv, merge } from '../utils/style'
import Button from './Button.vue'

const props = withDefaults(defineProps<CarouselProps<T>>(), {
  orientation: 'horizontal',
  arrows: false,
  dots: false,

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
const emit = defineEmits<CarouselEmits>()

defineSlots<CarouselSlots<T>>()

const { t, dir } = useLocale()
const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.carousel))
  return styler(props)
})

const rootProps = useForwardProps(reactivePick(props, 'active', 'align', 'breakpoints', 'containScroll', 'dragFree', 'dragThreshold', 'duration', 'inViewThreshold', 'loop', 'skipSnaps', 'slidesToScroll', 'startIndex', 'watchDrag', 'watchResize', 'watchSlides', 'watchFocus'))

const prevIcon = computed(() => props.prevIcon || (dir.value === 'rtl' ? appConfig.ui.icons.chevronRight : appConfig.ui.icons.chevronLeft))
const nextIcon = computed(() => props.nextIcon || (dir.value === 'rtl' ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight))

const options = computed<EmblaOptionsType>(() => ({
  ...(props.fade ? { align: 'center', containScroll: false } : {}),
  ...rootProps.value,
  axis: props.orientation === 'horizontal' ? 'x' : 'y',
  direction: dir.value === 'rtl' ? 'rtl' : 'ltr',
}))

const plugins = ref<EmblaPluginType[]>([])

async function loadPlugins() {
  const emblaPlugins: EmblaPluginType[] = []

  if (props.autoplay) {
    const AutoplayPlugin = await import('embla-carousel-autoplay').then((r) => r.default)
    emblaPlugins.push(AutoplayPlugin(typeof props.autoplay === 'boolean' ? {} : props.autoplay))
  }

  if (props.autoScroll) {
    const AutoScrollPlugin = await import('embla-carousel-auto-scroll').then((r) => r.default)
    emblaPlugins.push(AutoScrollPlugin(typeof props.autoScroll === 'boolean' ? {} : props.autoScroll))
  }

  if (props.autoHeight) {
    const AutoHeightPlugin = await import('embla-carousel-auto-height').then((r) => r.default)
    emblaPlugins.push(AutoHeightPlugin(typeof props.autoHeight === 'boolean' ? {} : props.autoHeight))
  }

  if (props.classNames) {
    const ClassNamesPlugin = await import('embla-carousel-class-names').then((r) => r.default)
    emblaPlugins.push(ClassNamesPlugin(typeof props.classNames === 'boolean' ? {} : props.classNames))
  }

  if (props.fade) {
    const FadePlugin = await import('embla-carousel-fade').then((r) => r.default)
    emblaPlugins.push(FadePlugin(typeof props.fade === 'boolean' ? {} : props.fade))
  }

  if (props.wheelGestures) {
    const { WheelGesturesPlugin } = await import('embla-carousel-wheel-gestures')
    emblaPlugins.push(WheelGesturesPlugin(typeof props.wheelGestures === 'boolean' ? {} : props.wheelGestures))
  }

  plugins.value = emblaPlugins
}

watch(() => [props.autoplay, props.autoScroll, props.autoHeight, props.classNames, props.fade, props.wheelGestures], async () => {
  await loadPlugins()
  emblaApi.value?.reInit(options.value, plugins.value)
}, { immediate: true })

const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins)

watch(options, () => {
  emblaApi.value?.reInit(options.value, plugins.value)
}, { flush: 'post' })

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
  let prevKey
  let nextKey

  if (props.orientation === 'horizontal') {
    prevKey = dir.value === 'ltr' ? 'ArrowLeft' : 'ArrowRight'
    nextKey = dir.value === 'ltr' ? 'ArrowRight' : 'ArrowLeft'
  }
  else {
    prevKey = 'ArrowUp'
    nextKey = 'ArrowDown'
  }

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

  emit('select', selectedIndex.value)
}

function isCarouselItem(item: CarouselItem): item is Exclude<CarouselItem, CarouselValue> {
  return typeof item === 'object' && item !== null
}

onMounted(() => {
  if (!emblaApi.value)
    return

  emblaApi.value.on('init', onInit)
  emblaApi.value.on('init', onSelect)
  emblaApi.value.on('reInit', onInit)
  emblaApi.value.on('reInit', onSelect)
  emblaApi.value.on('select', onSelect)
})

onBeforeMount(() => {
  if (!emblaApi.value)
    return

  emblaApi.value.off('init', onInit)
  emblaApi.value.off('init', onSelect)
  emblaApi.value.off('reInit', onInit)
  emblaApi.value.off('reInit', onSelect)
  emblaApi.value.off('select', onSelect)
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
    tabindex="0"
    :class="ui.root({ class: [props.class, props.ui?.root] })"
    aria-roledescription="carousel"
    :data-orientation="props.orientation"
    data-part="root"
    @keydown="onKeyDown"
  >
    <div ref="emblaRef" :class="ui.viewport({ class: props.ui?.viewport })" data-part="viewport">
      <div :class="ui.container({ class: props.ui?.container })" data-part="container">
        <div
          v-for="(item, index) in props.items"
          :key="index"
          v-bind="props.dots ? { role: 'tabpanel' } : { 'role': 'group', 'aria-roledescription': 'slide' }"
          :class="ui.item({ class: [props.ui?.item, ...(isCarouselItem(item) ? [item.ui?.item, item.class] : [])] })"
          data-part="item"
        >
          <slot :item="item" :index="index"></slot>
        </div>
      </div>
    </div>

    <div v-if="props.arrows || props.dots" :class="ui.controls({ class: props.ui?.controls })" data-part="controls">
      <div v-if="props.arrows" :class="ui.arrows({ class: props.ui?.arrows })" data-part="arrows">
        <Button
          :disabled="!canScrollPrev"
          :icon="prevIcon"
          color="neutral"
          variant="outline"
          :aria-label="t('carousel.prev')"
          v-bind="typeof props.prev === 'object' ? props.prev : undefined"
          :class="ui.prev({ class: props.ui?.prev })"
          data-part="prev"
          @click="scrollPrev"
        />
        <Button
          :disabled="!canScrollNext"
          :icon="nextIcon"
          color="neutral"
          variant="outline"
          :aria-label="t('carousel.next')"
          v-bind="typeof props.next === 'object' ? props.next : undefined"
          :class="ui.next({ class: props.ui?.next })"
          data-part="next"
          @click="scrollNext"
        />
      </div>

      <div v-if="props.dots" role="tablist" :aria-label="t('carousel.dots')" :class="ui.dots({ class: props.ui?.dots })" data-part="dots">
        <template v-for="(_, index) in scrollSnaps" :key="index">
          <button
            type="button"
            role="tab"
            :aria-label="t('carousel.goto', { page: index + 1 })"
            :aria-selected="selectedIndex === index"
            :class="ui.dot({ class: props.ui?.dot, active: selectedIndex === index })"
            data-part="dot"
            :data-state="selectedIndex === index ? 'active' : undefined"
            @click="scrollTo(index)"
          ></button>
        </template>
      </div>
    </div>
  </Primitive>
</template>
