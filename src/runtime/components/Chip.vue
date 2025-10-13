<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/chip'
import type { ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'

export interface ChipEmits {
  'update:show': [payload: boolean]
}

export interface ChipSlots {
  default?: (props?: {}) => any
  content?: (props?: {}) => any
}

type ThemeVariants = VariantProps<typeof theme>

export interface ChipProps extends ComponentBaseProps {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  text?: string | number
  size?: ThemeVariants['size']
  color?: ThemeVariants['color']
  position?: ThemeVariants['position']
  show?: boolean
  /** When `true`, keep the chip inside the component for rounded elements. */
  inset?: boolean
  /** When `true`, render the chip relatively to the parent. */
  standalone?: boolean
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script setup lang="ts">
import { Primitive, Slot } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { cv, merge } from '../utils/style'

// defineOptions({
//   inheritAttrs: false,
// })

const props = withDefaults(defineProps<ChipProps>(), {
  position: 'top-right',
})

defineEmits<ChipEmits>()
defineSlots<ChipSlots>()

const show = defineModel<boolean>('show', { default: true })

const appConfig = useAppConfig() as RuntimeAppConfig
const style = computed(() => {
  const ui = cv(merge(theme, appConfig.ui.chip))
  return ui(props)
})
</script>

<template>
  <Primitive
    :as="props.as"
    :class="style.root({ class: [props.ui?.root, props.class] })"
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
