<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { StepperRootEmits, StepperRootProps } from 'reka-ui'
import theme from '#build/ui/stepper'
import type { ComponentBaseProps, ComponentStyler, ComponentUIProps, IconProps, RuntimeAppConfig } from '../types'
import type { DynamicSlots, ExtractItem, StaticSlot } from '../types/utils'

export interface StepperItem extends ComponentBaseProps {
  slot?: string
  value?: string | number
  title?: string
  description?: string
  icon?: IconProps['name']
  content?: string
  disabled?: boolean
  ui?: Pick<ComponentUIProps<typeof theme>, 'item' | 'container' | 'trigger' | 'indicator' | 'icon' | 'separator' | 'wrapper' | 'title' | 'description'>
  [key: string]: any
}

type ThemeVariants = VariantProps<typeof theme>

export interface StepperProps<T extends StepperItem = StepperItem> extends ComponentBaseProps, Pick<StepperRootProps, 'linear'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: StepperRootProps['as']
  items?: T[]
  /** @default "md" */
  size?: ThemeVariants['size']
  /** @default "primary" */
  color?: ThemeVariants['color']
  /** @default "horizontal" */
  orientation?: ThemeVariants['orientation']
  defaultValue?: string | number
  modelValue?: string | number
  disabled?: boolean
  ui?: ComponentUIProps<typeof theme>
}

export type StepperEmits<T extends StepperItem = StepperItem> = Omit<StepperRootEmits, 'update:modelValue'> & {
  next: [value: T]
  prev: [value: T]
}

export type StepperSlots<T extends StepperItem = StepperItem> = {
  indicator: StaticSlot<{ item: T, ui: ComponentStyler<typeof theme> }>
  wrapper: StaticSlot<{ item: T }>
  title: StaticSlot<{ item: T }>
  description: StaticSlot<{ item: T }>
  content: StaticSlot<{ item: T }>
} & DynamicSlots<T, 'wrapper' | 'title' | 'description', { item: T }>
</script>

<script setup lang="ts" generic="T extends StepperItem">
import { reactivePick } from '@vueuse/core'
import { StepperDescription, StepperIndicator, StepperItem, StepperRoot, StepperSeparator, StepperTitle, StepperTrigger, useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { pick } from '../utils'
import { cv, merge } from '../utils/style'
import Icon from './Icon.vue'

const props = withDefaults(defineProps<StepperProps<T>>(), {
  orientation: 'horizontal',
  linear: true,
})
const emit = defineEmits<StepperEmits<T>>()
const slots = defineSlots<StepperSlots<T>>()

const modelValue = defineModel<string | number>()

const appConfig = useAppConfig() as RuntimeAppConfig

const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.stepper))
  return styler(pick(props, ['orientation', 'size', 'color']))
})

const rootProps = useForwardProps(reactivePick(props, 'as', 'orientation', 'linear'))

const currentStepIndex = computed({
  get() {
    const value = modelValue.value ?? props.defaultValue

    return (
      typeof value === 'string'
        ? props.items?.findIndex((item) => item.value === value)
        : value
    ) ?? 0
  },
  set(value) {
    modelValue.value = props.items?.[value]?.value ?? value
  },
})

const currentStep = computed(() => props.items?.[currentStepIndex.value])
const hasNext = computed(() => currentStepIndex.value < (props.items?.length ?? 0) - 1)
const hasPrev = computed(() => currentStepIndex.value > 0)

defineExpose({
  next() {
    if (!props.disabled && hasNext.value) {
      currentStepIndex.value += 1
      emit('next', currentStep.value as T)
    }
  },
  prev() {
    if (!props.disabled && hasPrev.value) {
      currentStepIndex.value -= 1
      emit('prev', currentStep.value as T)
    }
  },
  hasNext,
  hasPrev,
})
</script>

<template>
  <StepperRoot v-bind="rootProps" v-model="currentStepIndex" :class="ui.root({ class: [props.ui?.root, props.class] })" data-part="root">
    <div :class="ui.header({ class: props.ui?.header })" data-part="header">
      <StepperItem
        v-for="(item, count) in props.items"
        :key="item.value ?? count"
        :step="count"
        :disabled="item.disabled || props.disabled"
        :class="ui.item({ class: [props.ui?.item, item.ui?.item, item.class] })"
        data-part="item"
      >
        <div :class="ui.container({ class: [props.ui?.container, item.ui?.container] })" data-part="container">
          <StepperTrigger :class="ui.trigger({ class: [props.ui?.trigger, item.ui?.trigger] })" data-part="trigger">
            <StepperIndicator :class="ui.indicator({ class: [props.ui?.indicator, item.ui?.indicator] })" data-part="indicator">
              <slot name="indicator" :item="item" :ui="ui">
                <Icon v-if="item.icon" :name="item.icon" :class="ui.icon({ class: [props.ui?.icon, item.ui?.icon] })" data-part="icon" />
                <template v-else>
                  {{ count + 1 }}
                </template>
              </slot>
            </StepperIndicator>
          </StepperTrigger>

          <StepperSeparator
            v-if="count < props.items!.length - 1"
            :class="ui.separator({ class: [props.ui?.separator, item.ui?.separator] })"
            data-part="separator"
          />
        </div>

        <div :class="ui.wrapper({ class: [props.ui?.wrapper, item.ui?.wrapper] })" data-part="wrapper">
          <slot :name="((item.slot ? `${item.slot}-wrapper` : 'wrapper') as keyof StepperSlots<T>)" :item="(item as ExtractItem<T>)">
            <StepperTitle v-if="item.title || !!slots[(item.slot ? `${item.slot}-title` : 'title') as keyof StepperSlots<T>]" as="div" :class="ui.title({ class: [props.ui?.title, item.ui?.title] })" data-part="title">
              <slot :name="((item.slot ? `${item.slot}-title` : 'title') as keyof StepperSlots<T>)" :item="(item as ExtractItem<T>)">
                {{ item.title }}
              </slot>
            </StepperTitle>

            <StepperDescription v-if="item.description || !!slots[(item.slot ? `${item.slot}-description` : 'description') as keyof StepperSlots<T>]" as="div" :class="ui.description({ class: [props.ui?.description, item.ui?.description] })" data-part="description">
              <slot :name="((item.slot ? `${item.slot}-description` : 'description') as keyof StepperSlots<T>)" :item="(item as ExtractItem<T>)">
                {{ item.description }}
              </slot>
            </StepperDescription>
          </slot>
        </div>
      </StepperItem>
    </div>

    <div v-if="currentStep?.content || !!slots.content || (currentStep?.slot && !!slots[currentStep.slot as keyof StepperSlots<T>])" :class="ui.content({ class: props.ui?.content })" data-part="content">
      <slot :name="((currentStep?.slot || 'content') as keyof StepperSlots<T>)" :item="(currentStep as ExtractItem<T>)">
        {{ currentStep?.content }}
      </slot>
    </div>
  </StepperRoot>
</template>
