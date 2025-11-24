<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { SliderRootProps } from 'reka-ui'
import theme from '#build/ui/slider'
import type { ComponentBaseProps, ComponentUIProps, RuntimeAppConfig, TooltipProps } from '../types'
import type { MaybeArray } from '../types/utils'

type ThemeVariants = VariantProps<typeof theme>

export interface SliderProps<T extends MaybeArray<number> = MaybeArray<number>> extends ComponentBaseProps, Pick<SliderRootProps, 'name' | 'disabled' | 'inverted' | 'min' | 'max' | 'step' | 'minStepsBetweenThumbs'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: SliderRootProps['as']
  /** @default "md" */
  size?: ThemeVariants['size']
  /** @default "primary" */
  color?: ThemeVariants['color']
  /**
   * The orientation of the slider.
   * @default "horizontal"
   */
  orientation?: ThemeVariants['orientation']
  /**
   * Display a tooltip around the slider thumbs with the current value.
   * @default false
   */
  tooltip?: boolean | TooltipProps
  modelValue?: T
  /** The value of the slider when initially rendered. Use when you do not need to control the state of the slider. */
  defaultValue?: T
  ui?: ComponentUIProps<typeof theme>
}

export interface SliderEmits<T extends MaybeArray<number>> {
  'update:modelValue': [value: T]
  'change': [event: Event]
}
</script>

<script setup lang="ts" generic="T extends MaybeArray<number>">
import { reactivePick, useVModel } from '@vueuse/core'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useFormField } from '../composables/useFormField'
import { cv, merge } from '../utils/style'
import Tooltip from './Tooltip.vue'

const props = withDefaults(defineProps<SliderProps<T>>(), {
  orientation: 'horizontal',
  min: 0,
  max: 100,
  step: 1,
})

const emit = defineEmits<SliderEmits<T>>()

const modelValue = useVModel<SliderProps<T>, 'modelValue', 'update:modelValue'>(props, 'modelValue', emit)

const rootProps = useForwardPropsEmits(reactivePick(props as SliderProps<number[]>, 'as', 'min', 'max', 'step', 'minStepsBetweenThumbs', 'inverted'), emit)

const defaultSliderValue = computed(() => {
  if (typeof props.defaultValue === 'number')
    return [props.defaultValue]

  return props.defaultValue as number[] | undefined
})

const sliderValue = computed({
  get() {
    if (typeof modelValue.value === 'number')
      return [modelValue.value]

    return (modelValue.value as number[]) ?? defaultSliderValue.value
  },
  set(value) {
    modelValue.value = (value?.length === 1 ? value[0] : value) as T
  },
})

const thumbs = computed(() => sliderValue.value?.length ?? 1)

const { id, name, size, color, disabled, ariaAttrs, emitFormChange, emitFormInput } = useFormField<SliderProps<T>>(props)
const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.slider))
  return styler({
    ...props,
    size: size.value,
    color: color.value,
    disabled: disabled.value,
  })
})

function onChange(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emit('change', event)
  emitFormChange()
}
</script>

<template>
  <SliderRoot
    v-bind="{ ...rootProps, ...ariaAttrs, id, name, disabled }"
    v-model="sliderValue"
    :default-value="defaultSliderValue"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    :data-steps="thumbs"
    data-part="root"
    @update:model-value="emitFormInput()"
    @value-commit="onChange"
  >
    <SliderTrack :class="ui.track({ class: props.ui?.track })" data-part="track">
      <SliderRange :class="ui.range({ class: props.ui?.range })" data-part="range" />
    </SliderTrack>

    <Tooltip
      v-for="thumb in thumbs"
      :key="thumb"
      v-bind="(typeof props.tooltip === 'object' ? props.tooltip : {})"
      :text="String(thumbs > 1 ? sliderValue?.[thumb - 1] : sliderValue)"
      :disabled="!props.tooltip"
      disable-closing-trigger
    >
      <SliderThumb :class="ui.thumb({ class: props.ui?.thumb })" data-part="thumb" :aria-label="thumbs === 1 ? 'Thumb' : `Thumb ${thumb} of ${thumbs}`" />
    </Tooltip>
  </SliderRoot>
</template>
