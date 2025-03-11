<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { button } from '../theme'
import type { ComponentAttrs } from '../types'
import type { LinkProps } from './Link.vue'

export interface ButtonSlots {
  default?: (props?: {}) => any
  prefix?: (props?: {}) => any
  suffix?: (props?: {}) => any
}

type ButtonVariants = VariantProps<typeof button>

export interface ButtonProps extends ComponentAttrs<typeof button>, UseComponentIconsProps, Omit<LinkProps, 'raw' | 'custom'> {
  icon?: string
  label?: string
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  loading?: boolean
  active?: boolean
  disabled?: boolean
}
</script>

<script lang="ts" setup>
import { useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import { useButtonGroup } from '../composables/useButtonGroup'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useTheme } from '../composables/useTheme'
import { omit, pickLinkProps } from '../utils'
import Link from './Link.vue'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'solid',
})

const slots = defineSlots<ButtonSlots>()

const { size, orientation } = useButtonGroup(props)
const { isPrefix, isSuffix, prefixIconName, suffixIconName } = useComponentIcons(
  computed(() => ({ ...props, loading: props.loading })),
)

const linkProps = useForwardProps(pickLinkProps(props))

const { theme, createStyler } = useTheme()

const style = computed(() => {
  const styler = createStyler(theme.value.button)
  return styler({
    ...props,
    size: size.value,
    groupOrientation: orientation.value,
    prefix: isPrefix.value,
    suffix: isSuffix.value,
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
    raw
  >
    <slot name="prefix">
      <span
        v-if="isPrefix && prefixIconName"
        :class="style.prefixIcon({ class: [prefixIconName, props.ui?.prefixIcon] })"
      ></span>
    </slot>
    <span
      v-if="props.label || slots.default"
      :class="style.label({ class: props.ui?.label })"
    >
      <slot>{{ label }}</slot>
    </span>
    <slot name="suffix">
      <span
        v-if="isSuffix && suffixIconName"
        :class="style.suffixIcon({ class: [suffixIconName, props.ui?.suffixIcon] })"
      ></span>
    </slot>
  </Link>
</template>
