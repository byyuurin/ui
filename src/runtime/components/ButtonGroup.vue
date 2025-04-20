<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import type { buttonGroup } from '../theme'
import type { ComponentAttrs } from '../types'

export interface ButtonGroupSlots {
  default?: (props?: {}) => any
}

type ButtonGroupVariant = VariantProps<typeof buttonGroup>

export interface ButtonGroupProps extends Omit<ComponentAttrs<typeof buttonGroup>, 'ui'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  size?: ButtonGroupVariant['size']
  orientation?: ButtonGroupVariant['orientation']
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { provideButtonGroup } from '../app/injections'
import { useTheme } from '../composables/useTheme'

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  orientation: 'horizontal',
})

defineSlots<ButtonGroupSlots>()

provideButtonGroup(computed(() => props))

const { generateStyle } = useTheme()
const style = computed(() => generateStyle('buttonGroup', props))
</script>

<template>
  <Primitive :as="props.as" :class="style.base()" data-part="base">
    <slot></slot>
  </Primitive>
</template>
