<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/badge'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'

export interface BadgeSlots {
  leading?: (props?: {}) => any
  default?: (props?: {}) => any
  trailing?: (props?: {}) => any
}

type ThemeVariants = VariantProps<typeof theme>

export interface BadgeProps extends ComponentBaseProps, Omit<UseComponentIconsProps, 'loading' | 'loadingIcon'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  variant?: ThemeVariants['variant']
  size?: ThemeVariants['size']
  color?: ThemeVariants['color']
  label?: string
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useFieldGroup } from '../composables/useFieldGroup'
import { cv, merge } from '../utils/style'
import Icon from './Icon.vue'

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'solid',
})

const slots = defineSlots<BadgeSlots>()

const { size, orientation } = useFieldGroup(props)
const { isLeading, leadingIconName, isTrailing, trailingIconName } = useComponentIcons(props)

const appConfig = useAppConfig() as RuntimeAppConfig
const style = computed(() => {
  const ui = cv(merge(theme, appConfig.ui.badge))
  return ui({
    ...props,
    size: size.value,
    groupOrientation: orientation.value,
  })
})
</script>

<template>
  <Primitive :as="props.as" :class="style.base({ class: [props.class, props.ui?.base] })" data-part="base">
    <slot name="leading">
      <Icon v-if="isLeading && leadingIconName" :name="leadingIconName" :class="style.leadingIcon({ class: props.ui?.leadingIcon })" data-part="leading-icon" />
    </slot>

    <span v-if="props.label || slots.default" :class="style.label({ class: props.ui?.label })" data-part="label">
      <slot>{{ props.label }}</slot>
    </span>

    <slot name="trailing">
      <Icon v-if="isTrailing && trailingIconName" :name="trailingIconName" :class="style.trailingIcon({ class: props.ui?.trailingIcon })" data-part="trailing-icon" />
    </slot>
  </Primitive>
</template>
