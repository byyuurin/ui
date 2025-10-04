<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import theme from '#build/ui/button'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'
import type { LinkProps } from './Link.vue'

export interface ButtonSlots {
  default?: (props?: {}) => any
  leading?: (props?: {}) => any
  trailing?: (props?: {}) => any
}

type ThemeVariants = VariantProps<typeof theme>

export interface ButtonProps extends ComponentBaseProps, UseComponentIconsProps, Omit<LinkProps, 'raw' | 'custom' | 'underline'> {
  icon?: string
  label?: string
  variant?: ThemeVariants['variant']
  size?: ThemeVariants['size']
  loading?: boolean
  active?: boolean
  disabled?: boolean
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script lang="ts" setup>
import { useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useButtonGroup } from '../composables/useButtonGroup'
import { useComponentIcons } from '../composables/useComponentIcons'
import { omit, pickLinkProps } from '../utils'
import { cv, merge } from '../utils/style'
import Icon from './Icon.vue'
import Link from './Link.vue'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'solid',
})

const slots = defineSlots<ButtonSlots>()

const { size, orientation } = useButtonGroup(props)
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(
  computed(() => ({ ...props, loading: props.loading })),
)

const linkProps = useForwardProps(pickLinkProps(props))

const appConfig = useAppConfig() as RuntimeAppConfig
const style = computed(() => {
  const ui = cv(merge(theme, appConfig.ui.button))
  return ui({
    ...props,
    size: size.value,
    groupOrientation: orientation.value,
    leading: isLeading.value,
    trailing: isTrailing.value,
    class: [
      props.class,
      props.active ? props.activeClass : props.inactiveClass,
      props.disabled ? props.disableClass : undefined,
    ],
  })
})
</script>

<template>
  <Link
    :class="style.base({ class: [props.class, props.ui?.base] })"
    :type="props.type"
    :disabled="props.disabled || props.loading"
    v-bind="omit(linkProps, ['type', 'disabled', 'activeClass', 'inactiveClass', 'disableClass'])"
    data-part="base"
    raw
  >
    <slot name="leading">
      <Icon
        v-if="isLeading && leadingIconName"
        :name="leadingIconName"
        :class="style.leadingIcon({ class: props.ui?.leadingIcon })"
        data-part="leading-icon"
      />
    </slot>
    <span
      v-if="props.label || slots.default"
      :class="style.label({ class: props.ui?.label })"
      data-part="label"
    >
      <slot>{{ label }}</slot>
    </span>
    <slot name="trailing">
      <Icon
        v-if="isTrailing && trailingIconName"
        :name="trailingIconName"
        :class="style.trailingIcon({ class: props.ui?.trailingIcon })"
        data-part="trailing-icon"
      />
    </slot>
  </Link>
</template>
