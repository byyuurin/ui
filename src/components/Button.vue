<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import { createVariants } from '../internal'
import { button } from '../theme'
import type { ComponentProps } from '../types'

const theme = createVariants(button)

export type ButtonVariants = VariantProps<typeof theme>

export interface ButtonProps extends ComponentProps {
  label?: string
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  round?: boolean
  disabled?: boolean
}
</script>

<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'solid',
  size: 'md',
})

const ui = computed(() => {
  const uiVariants: Required<ButtonVariants> = {
    variant: props.variant,
    size: props.size,
    round: props.round,
    disabled: props.disabled,
  }
  return theme({
    ...uiVariants,
    class: props.class,
  })
})
</script>

<template>
  <button :class="ui" :disabled="props.disabled">
    <slot>
      {{ label }}
    </slot>
  </button>
</template>
