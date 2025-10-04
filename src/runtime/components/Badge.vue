<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/badge'
import type { ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'

export interface BadgeEmits {
  'update:show': [payload: boolean]
}

export interface BadgeSlots {
  default?: (props?: {}) => any
  content?: (props?: {}) => any
}

type ThemeVariants = VariantProps<typeof theme>

export interface BadgeProps extends ComponentBaseProps {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  text?: string | number
  size?: ThemeVariants['size']
  position?: ThemeVariants['position']
  show?: boolean
  /** When `true`, keep the badge inside the component for rounded elements. */
  inset?: boolean
  /** When `true`, render the badge relatively to the parent. */
  standalone?: boolean
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script setup lang="ts">
import { Primitive, Slot } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { cv, merge } from '../utils/style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<BadgeProps>(), {
  position: 'top-right',
})

defineEmits<BadgeEmits>()
defineSlots<BadgeSlots>()

const show = defineModel<boolean>('show', { default: true })

const appConfig = useAppConfig() as RuntimeAppConfig
const style = computed(() => {
  const ui = cv(merge(theme, appConfig.ui.badge))
  return ui(props)
})
</script>

<template>
  <Primitive
    :as="props.as"
    :class="style.root({ class: [props.class, props.ui?.root] })"
    :data-part="$attrs['data-part'] ?? 'root'"
  >
    <Slot v-bind="$attrs">
      <slot></slot>
    </Slot>

    <span v-if="show" :class="style.base({ class: props.ui?.base })" data-part="base">
      <slot name="content">
        {{ props.text }}
      </slot>
    </span>
  </Primitive>
</template>
