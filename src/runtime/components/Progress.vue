<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps, ProgressRootEmits, ProgressRootProps } from 'reka-ui'
import theme from '#build/ui/progress'
import type { ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'
import type { StaticSlot } from '../types/utils'

type ThemeVariants = VariantProps<typeof theme>

export interface ProgressProps extends ComponentBaseProps, Pick<ProgressRootProps, 'getValueLabel' | 'getValueText' | 'modelValue'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  /** @default "md" */
  size?: ThemeVariants['size']
  /** @default "primary" */
  color?: ThemeVariants['color']
  /**
   * The orientation of the progress bar.
   * @default "horizontal"
   */
  orientation?: ThemeVariants['orientation']
  /**
   * The animation of the progress bar.
   * @default "carousel"
   */
  animation?: ThemeVariants['animation']
  /** The maximum progress value. */
  max?: number | Array<any>
  /** Display the current progress value. */
  status?: boolean
  /** Whether the progress is visually inverted. */
  inverted?: boolean
  ui?: ComponentUIProps<typeof theme>
}

export interface ProgressEmits extends ProgressRootEmits {}

export type ProgressSlots = {
  status: StaticSlot<{ percent?: number }>
} & {
  [key: `step-${number}`]: StaticSlot<{ step: string | number }>
}

</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { Primitive, ProgressIndicator, ProgressRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { pick } from '../utils'
import { cv, merge } from '../utils/style'

const props = withDefaults(defineProps<ProgressProps>(), {
  inverted: false,
  modelValue: null,
  orientation: 'horizontal',
})
const emit = defineEmits<ProgressEmits>()
const slots = defineSlots<ProgressSlots>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'getValueLabel', 'getValueText', 'modelValue'), emit)

const isIndeterminate = computed(() => rootProps.value.modelValue === null)
const hasSteps = computed(() => Array.isArray(props.max))

const realMax = computed(() => {
  if (isIndeterminate.value || !props.max)
    return

  if (Array.isArray(props.max))
    return props.max.length - 1

  return Number(props.max)
})

const percent = computed(() => {
  if (isIndeterminate.value)
    return

  if (rootProps.value.modelValue! < 0)
    return 0

  const max = realMax.value ?? 100

  if (rootProps.value.modelValue! > max)
    return 100

  return Math.round((rootProps.value.modelValue! / max) * 100)
})

const { dir } = useLocale()
const indicatorStyle = computed(() => {
  if (percent.value === undefined)
    return

  if (props.orientation === 'vertical')
    return { transform: `translateY(${props.inverted ? '' : '-'}${100 - percent.value}%)` }

  if (dir.value === 'rtl')
    return { transform: `translateX(${props.inverted ? '-' : ''}${100 - percent.value}%)` }

  return { transform: `translateX(${props.inverted ? '' : '-'}${100 - percent.value}%)` }
})

const statusStyle = computed(() => {
  const value = `${Math.max(percent.value ?? 0, 0)}%`
  return props.orientation === 'vertical'
    ? { height: value }
    : { width: value }
})

function isActive(index: number) {
  return index === Number(props.modelValue)
}

function isFirst(index: number) {
  return index === 0
}

function isLast(index: number) {
  return index === realMax.value
}

function stepVariant(index: number | string) {
  index = Number(index)

  if (isActive(index) && !isFirst(index))
    return 'active'

  if (isFirst(index) && isActive(index))
    return 'first'

  if (isLast(index) && isActive(index))
    return 'last'

  return 'other'
}

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.progress))
  return styler(pick(props, ['animation', 'size', 'color', 'orientation', 'inverted']))
})
</script>

<template>
  <Primitive :as="props.as" :class="ui.root({ class: [props.ui?.root, props.class] })" :data-orientation="orientation" data-part="root">
    <div v-if="!isIndeterminate && (props.status || !!slots.status)" :class="ui.status({ class: props.ui?.status })" data-part="status" :style="statusStyle">
      <slot name="status" :percent="percent">
        {{ percent }}%
      </slot>
    </div>

    <ProgressRoot
      v-bind="rootProps"
      :max="realMax"
      :class="ui.base({ class: props.ui?.base })"
      data-part="base"
      style="transform: translateZ(0)"
    >
      <ProgressIndicator :class="ui.indicator({ class: props.ui?.indicator })" data-part="indicator" :style="indicatorStyle" />
    </ProgressRoot>

    <div v-if="hasSteps" :class="ui.steps({ class: props.ui?.steps })" data-part="steps">
      <div v-for="(step, index) in props.max" :key="index" :class="ui.step({ class: props.ui?.step, step: stepVariant(index) })" data-part="step">
        <slot :name="`step-${index}`" :step="step">
          {{ step }}
        </slot>
      </div>
    </div>
  </Primitive>
</template>
