<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import { computed } from 'vue'
import theme from '#build/ui/kbd'
import type { KbdKey } from '../composables/useKbd'
import type { ComponentBaseProps, RuntimeAppConfig } from '../types'

export interface KbdSlots {
  default?: (props?: {}) => any
}

type ThemeVariants = VariantProps<typeof theme>

export interface KbdProps extends ComponentBaseProps {
  /**
   * The element or component this component should render as.
   * @default "kbd"
   */
  as?: PrimitiveProps['as']
  variant?: ThemeVariants['variant']
  size?: ThemeVariants['size']
  color?: ThemeVariants['color']
  value?: KbdKey | (string & {})
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useKbd } from '../composables/useKbd'
import { cv, merge } from '../utils/style'

const props = withDefaults(defineProps<KbdProps>(), {
  as: 'kbd',
})

defineSlots<KbdSlots>()

const { getKbdKey } = useKbd()
const appConfig = useAppConfig() as RuntimeAppConfig
const style = computed(() => {
  const ui = cv(merge(theme, appConfig.ui.kbd))
  return ui(props)
})
</script>

<template>
  <Primitive :as="props.as" :class="style.base()" data-part="base">
    <slot>{{ getKbdKey(props.value) }}</slot>
  </Primitive>
</template>
