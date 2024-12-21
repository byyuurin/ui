<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import { createVariants } from '../../internal'
import type { ComponentProps } from '../../types'
import theme from './theme'

const ui = createVariants(theme)

export type ButtonVariants = VariantProps<typeof ui>

export interface ButtonProps extends ComponentProps {
  label?: string
  type?: ButtonVariants['type']
}
</script>

<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'solid',
})

const uiStyle = computed(() => {
  return ui({
    class: props.class,
    type: props.type,
  })
})
</script>

<template>
  <button :class="uiStyle">
    <slot>
      {{ label }}
    </slot>
  </button>
</template>
