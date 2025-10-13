<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import theme from '#build/ui/button'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { AvatarProps, ComponentBaseProps, ComponentUIProps, LinkProps, RuntimeAppConfig } from '../types'

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
  color?: ThemeVariants['color']
  avatarColor?: ThemeVariants['color']
  /** Render the button with equal padding on all sides. */
  square?: boolean
  /** Render the button full width. */
  block?: boolean
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
import { useComponentIcons } from '../composables/useComponentIcons'
import { useFieldGroup } from '../composables/useFieldGroup'
import { omit, pickLinkProps } from '../utils'
import { cv, merge } from '../utils/style'
import Avatar from './Avatar.vue'
import Icon from './Icon.vue'
import Link from './Link.vue'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'solid',
})

const slots = defineSlots<ButtonSlots>()

const { size, orientation } = useFieldGroup(props)
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
    block: props.block,
    square: props.square || (!slots.default && !props.label),
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
      <Avatar
        v-else-if="props.avatar"
        :size="((props.ui?.leadingAvatarSize || style.leadingAvatarSize()) as AvatarProps['size'])"
        v-bind="props.avatar"
        :class="style.leadingAvatar({ class: props.ui?.leadingAvatar, active: props.active })"
        data-part="leading-avatar"
      />
    </slot>

    <slot>
      <span
        v-if="props.label || slots.default"
        :class="style.label({ class: props.ui?.label })"
        data-part="label"
      >
        {{ label }}
      </span>
    </slot>

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
