<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/button-group'
import type { ComponentBaseProps, RuntimeAppConfig } from '../types'

export interface ButtonGroupSlots {
  default?: (props?: {}) => any
}

type ThemeVariant = VariantProps<typeof theme>

export interface ButtonGroupProps extends ComponentBaseProps {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  size?: ThemeVariant['size']
  orientation?: ThemeVariant['orientation']
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { provideButtonGroup } from '../composables/injections'
import { cv, merge } from '../utils/style'

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  orientation: 'horizontal',
})

defineSlots<ButtonGroupSlots>()

provideButtonGroup(computed(() => props))

const appConfig = useAppConfig() as RuntimeAppConfig
const style = computed(() => {
  const ui = cv(merge(theme, appConfig.ui.buttonGroup))
  return ui(props)
})
</script>

<template>
  <Primitive :as="props.as" :class="style.base()" data-part="base">
    <slot></slot>
  </Primitive>
</template>
