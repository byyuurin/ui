<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { SliderRootProps } from 'reka-ui'
import theme from '#build/ui/slider'
import type { ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'
import type { MaybeArray } from '../types/utils'

export interface SliderEmits {
  'update:modelValue': [payload: MaybeArray<number>]
  'change': [payload: Event]
}

type ThemeVariants = VariantProps<typeof theme>

export interface SliderProps extends ComponentBaseProps, Pick<SliderRootProps, 'as' | 'name' | 'disabled' | 'inverted' | 'min' | 'max' | 'step' | 'minStepsBetweenThumbs'> {
  modelValue?: number | number[]
  size?: ThemeVariants['size']
  /**
   * The orientation of the slider.
   * @default "horizontal"
   */
  orientation?: ThemeVariants['orientation']
  /** The value of the slider when initially rendered. Use when you do not need to control the state of the slider. */
  defaultValue?: number | number[]
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useFormItem } from '../composables/useFormItem'
import { cv, merge } from '../utils/style'

const props = withDefaults(defineProps<SliderProps>(), {
  orientation: 'horizontal',
  step: 1,
  max: 100,
})

const emit = defineEmits<SliderEmits>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'orientation', 'min', 'max', 'step', 'minStepsBetweenThumbs', 'inverted'), emit)

const modelValue = defineModel<number | number[]>()

const defaultSliderValue = computed(() => {
  if (typeof props.defaultValue === 'number')
    return [props.defaultValue]

  return props.defaultValue
})

const sliderValue = computed({
  get() {
    if (typeof modelValue.value === 'number')
      return [modelValue.value]

    return modelValue.value ?? defaultSliderValue.value
  },
  set(value) {
    modelValue.value = value?.length === 1 ? value[0] : value
  },
})

const thumbsCount = computed(() => sliderValue.value?.length ?? 1)

const { id, size, name, disabled, ariaAttrs, emitFormChange, emitFormInput } = useFormItem<SliderProps>(props)
const appConfig = useAppConfig() as RuntimeAppConfig
const style = computed(() => {
  const ui = cv(merge(theme, appConfig.ui.slider))
  return ui({
    ...props,
    size: size.value,
  })
})

function onChange(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emit('change', event)
  emitFormChange()
  emitFormInput()
}
</script>

<template>
  <SliderRoot
    v-bind="{ ...rootProps, ...ariaAttrs, id, name, disabled }"
    v-model="sliderValue"
    :default-value="defaultSliderValue"
    :class="style.root({ class: [props.class, props.ui?.root] })"
    data-part="root"
    :data-steps="thumbsCount"
    @value-commit="onChange"
  >
    <SliderTrack :class="style.track({ class: props.ui?.track })" data-part="track">
      <SliderRange :class="style.range({ class: props.ui?.range })" data-part="range" />
    </SliderTrack>

    <SliderThumb v-for="count in thumbsCount" :key="count" :class="style.thumb({ class: props.ui?.thumb })" data-part="thumb" />
  </SliderRoot>
</template>
