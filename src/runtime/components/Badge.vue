<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import type { badge } from '../theme'
import type { ComponentAttrs } from '../types'

export interface BadgeEmits {
  (e: 'update:show', payload: boolean): void
}

export interface BadgeSlots {
  default?: (props?: {}) => any
  content?: (props?: {}) => any
}

type BadgeVariants = VariantProps<typeof badge>

export interface BadgeProps extends ComponentAttrs<typeof badge> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  text?: string | number
  size?: BadgeVariants['size']
  position?: BadgeVariants['position']
  show?: boolean
  /** When `true`, keep the badge inside the component for rounded elements. */
  inset?: boolean
  /** When `true`, render the badge relatively to the parent. */
  standalone?: boolean
}
</script>

<script setup lang="ts">
import { Primitive, Slot } from 'reka-ui'
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<BadgeProps>(), {
  position: 'top-right',
})

defineEmits<BadgeEmits>()
defineSlots<BadgeSlots>()

const show = defineModel<boolean>('show', { default: true })

const { generateStyle } = useTheme()
const style = computed(() => generateStyle('badge', props))
</script>

<template>
  <Primitive
    :as="props.as"
    :class="style.root({ class: [props.class, props.ui?.root] })"
  >
    <Slot v-bind="$attrs">
      <slot></slot>
    </Slot>

    <span v-if="show" :class="style.base({ class: props.ui?.base })">
      <slot name="content">
        {{ props.text }}
      </slot>
    </span>
  </Primitive>
</template>
