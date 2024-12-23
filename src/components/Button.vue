<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import { createVariants } from '../internal'
import { button } from '../theme'
import type { ComponentProps } from '../types'

const theme = createVariants(button)

export type ButtonVariants = VariantProps<typeof theme>

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

const ui = computed(() => {
  return theme({
    class: props.class,
    type: props.type,
  })
})
</script>

<template>
  <button :class="ui">
    <slot>
      {{ label }}
    </slot>
  </button>
</template>
