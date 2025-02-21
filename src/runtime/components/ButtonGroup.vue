<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import type { buttonGroup } from '../theme'
import type { ComponentAttrs } from '../types'

type ButtonGroupVariant = VariantProps<typeof buttonGroup>

export interface ButtonGroupProps extends Omit<ComponentAttrs<typeof buttonGroup>, 'ui'>, Pick<PrimitiveProps, 'as'> {
  size?: ButtonGroupVariant['size']
  orientation?: ButtonGroupVariant['orientation']
}

export interface ButtonGroupSlots {
  default?: (props?: any) => any
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { provideButtonGroup } from '../composables/useButtonGroup'
import { useTheme } from '../composables/useTheme'

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  orientation: 'horizontal',
})

defineSlots<ButtonGroupSlots>()

provideButtonGroup(computed(() => ({
  size: props.size,
  orientation: props.orientation,
})))

const { theme, createStyler } = useTheme()
const style = computed(() => {
  const styler = createStyler(theme.value.buttonGroup)
  return styler(props)
})
</script>

<template>
  <Primitive :as="props.as" :class="style">
    <slot></slot>
  </Primitive>
</template>
