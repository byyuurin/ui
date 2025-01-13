<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import { createVariants } from '../internal'
import { button } from '../theme'
import type { ComponentProps } from '../types'

const theme = createVariants(button)

export type ButtonVariants = VariantProps<typeof theme>

export interface ButtonSlots {
  default: ((props?: any) => any) | undefined
  icon: ((props?: any) => any) | undefined
}

export interface ButtonProps extends ComponentProps {
  icon?: string
  label?: string
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  round?: boolean
  loading?: boolean
  disabled?: boolean
}
</script>

<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'solid',
  size: 'md',
})

const slots = defineSlots<ButtonSlots>()

const style = computed(() => {
  const uiVariants: Required<ButtonVariants> = {
    variant: props.variant,
    size: props.size,
    round: props.round,
    loading: props.loading,
  }
  const ui = theme({
    ...uiVariants,
    class: props.class,
  })
  return {
    base: ui.base(),
    label: ui.label(),
    icon: ui.icon({ class: props.icon }),
  }
})
</script>

<template>
  <button :class="style.base" :disabled="props.disabled">
    <slot name="icon">
      <i v-if="props.icon" :class="style.icon"></i>
    </slot>
    <span v-if="slots.default || props.label" :class="style.label">
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>
