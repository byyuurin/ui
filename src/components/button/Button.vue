<script lang="ts">
import { cv } from '@byyuurin/ui-kit'
import type { ComponentProps } from '../../types'
import theme from './theme'

const ui = cv(theme)

export type ButtonVariants = typeof ui.theme.defaultVariants

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
