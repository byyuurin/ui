<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import { button } from '../theme'
import type { ComponentAttrs } from '../types'

export type ButtonVariants = VariantProps<typeof button>

export interface ButtonSlots {
  default?: (props?: any) => any
  icon?: (props?: any) => any
}

export interface ButtonProps extends ComponentAttrs<typeof button> {
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
import { createStyler } from '../internal'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'solid',
  size: 'md',
})

const slots = defineSlots<ButtonSlots>()

const style = computed(() => {
  const styler = createStyler(button)
  return styler(props)
})
</script>

<template>
  <button
    :class="style.base({ class: [props.ui?.base, props.class] })"
    :disabled="props.disabled"
  >
    <slot name="icon">
      <i
        v-if="props.icon"
        :class="style.icon({ class: [props.ui?.icon, props.icon] })"
      ></i>
    </slot>
    <span
      v-if="slots.default || props.label"
      :class="style.label({ class: props.ui?.label })"
    >
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>
