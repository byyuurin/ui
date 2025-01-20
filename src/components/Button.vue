<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import { button } from '../theme'
import type { ComponentAttrs } from '../types'
import type { LinkProps } from './Link.vue'

export type ButtonVariants = VariantProps<typeof button>

export interface ButtonSlots {
  default?: (props?: any) => any
  icon?: (props?: any) => any
}

type UIOptions = ComponentAttrs<typeof button>['ui'] & LinkProps['ui']

export interface ButtonProps extends Omit<ComponentAttrs<typeof button>, 'ui'>, Omit<LinkProps, 'ui' | 'raw'> {
  icon?: string
  label?: string
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  round?: boolean
  loading?: boolean
  disabled?: boolean
  ui?: UIOptions
}
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import { createStyler, omit, pickLinkProps } from '../internal'
import Link from './Link.vue'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'solid',
  size: 'md',
})

const slots = defineSlots<ButtonSlots>()

const linkProps = pickLinkProps(props)

const style = computed(() => {
  const styler = createStyler(button)
  return styler({
    ...props,
    class: [
      props.class,
      props.active ? props.ui?.active : props.ui?.inactive,
      props.disabled ? props.ui?.disabled : undefined,
    ],
  })
})
</script>

<template>
  <Link
    :class="style.base({ class: [props.class, props.ui?.base] })"
    :type="props.type"
    :disabled="props.disabled || props.loading"
    v-bind="omit(linkProps, ['type', 'disabled'])"
    raw
  >
    <slot name="icon">
      <i
        v-if="props.icon"
        :class="style.icon({ class: [props.icon, props.ui?.icon] })"
      ></i>
    </slot>
    <span
      v-if="slots.default || props.label"
      :class="style.label({ class: props.ui?.label })"
    >
      <slot>{{ label }}</slot>
    </span>
  </Link>
</template>
