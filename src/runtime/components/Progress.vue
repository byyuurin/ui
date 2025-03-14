<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps, ProgressRootEmits, ProgressRootProps } from 'reka-ui'
import type { progress } from '../theme'
import type { ComponentAttrs } from '../types'

export interface ProgressEmits extends ProgressRootEmits {}

export type ProgressSlots = {
  status?: (props: { percent?: number }) => any
} & {
  [key: `step-${number}`]: (props: { step: string | number }) => any
}

type ProgressVariants = VariantProps<typeof progress>

export interface ProgressProps extends ComponentAttrs<typeof progress>, Pick<ProgressRootProps, 'getValueLabel' | 'modelValue'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  /** The maximum progress value. */
  max?: number | string[]
  /**
   * @default "md"
   */
  size?: ProgressVariants['size']
  /**
   * The orientation of the progress bar.
   * @default "horizontal"
   */
  orientation?: ProgressVariants['orientation']
  /** Display the current progress value. */
  status?: boolean
  /** Whether the progress is visually inverted. */
  inverted?: boolean
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { Primitive, ProgressIndicator, ProgressRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { useLocale } from '../composables/useLocale'
import { useTheme } from '../composables/useTheme'

const props = withDefaults(defineProps<ProgressProps>(), {
  modelValue: null,
  orientation: 'horizontal',
})
const emit = defineEmits<ProgressEmits>()
const slots = defineSlots<ProgressSlots>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'getValueLabel', 'modelValue'), emit)

const isIndeterminate = computed(() => rootProps.value.modelValue === null || Number.isNaN(+rootProps.value.modelValue))
const hasSteps = computed(() => Array.isArray(props.max))

const max = computed(() => {
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

  const _max = max.value ?? 100

  if (rootProps.value.modelValue! > _max)
    return 100

  return Math.round((rootProps.value.modelValue! / _max) * 100)
})

const { dir } = useLocale()
const { theme, createStyler } = useTheme()
const style = computed(() => {
  const styler = createStyler(theme.value.progress)
  return styler(props)
})

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
  return {
    [props.orientation === 'vertical' ? 'height' : 'width']: percent.value ? `${percent.value}%` : 'fit-content',
  }
})

function isActive(index: number) {
  return index === Number(props.modelValue)
}

function isFirst(index: number) {
  return index === 0
}

function isLast(index: number) {
  return index === max.value
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
</script>

<template>
  <Primitive :as="props.as" :class="style.wrapper({ class: [props.class, props.ui?.wrapper] })">
    <div v-if="!isIndeterminate && (props.status || slots.status)" :class="style.status({ class: props.ui?.status })" :style="statusStyle">
      <slot name="status" :percent="percent">
        {{ percent }}%
      </slot>
    </div>

    <ProgressRoot v-bind="rootProps" :max="max" :class="style.root({ class: props.ui?.root })" style="transform: translateZ(0)">
      <ProgressIndicator :class="style.indicator({ class: props.ui?.indicator })" :style="indicatorStyle" />
    </ProgressRoot>

    <div v-if="hasSteps" :class="style.steps({ class: props.ui?.steps })">
      <div v-for="(step, index) in props.max" :key="index" :class="style.step({ class: props.ui?.step, step: stepVariant(index) })">
        <slot :name="`step-${index}`" :step="step">
          {{ step }}
        </slot>
      </div>
    </div>
  </Primitive>
</template>
