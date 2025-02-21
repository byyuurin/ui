<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { button } from '../theme'
import type { ComponentAttrs } from '../types'
import type { LinkProps } from './Link.vue'

export interface ButtonSlots {
  default?: (props?: any) => any
  prefix?: (props?: any) => any
  suffix?: (props?: any) => any
}

type ButtonVariants = VariantProps<typeof button>
type UIOptions = ComponentAttrs<typeof button>['ui'] & LinkProps['ui']

export interface ButtonProps extends Omit<ComponentAttrs<typeof button>, 'ui'>, UseComponentIconsProps, Omit<LinkProps, 'ui' | 'raw'> {
  icon?: string
  label?: string
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  loading?: boolean
  active?: boolean
  disabled?: boolean
  ui?: UIOptions
}
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useTheme } from '../composables/useTheme'
import { omit, pickLinkProps } from '../utils'
import Link from './Link.vue'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'solid',
})

const slots = defineSlots<ButtonSlots>()

const { isPrefix, isSuffix, prefixIconName, suffixIconName } = useComponentIcons(
  computed(() => ({ ...props, loading: props.loading })),
)

const linkProps = pickLinkProps(props)

const { theme, createStyler } = useTheme()

const style = computed(() => {
  const styler = createStyler(theme.value.button)
  return styler({
    ...props,
    prefix: isPrefix.value,
    suffix: isSuffix.value,
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
    <slot name="prefix">
      <i
        v-if="isPrefix && prefixIconName"
        :class="style.prefixIcon({ class: [prefixIconName, props.ui?.prefixIcon] })"
      ></i>
    </slot>
    <span
      v-if="props.label || slots.default"
      :class="style.label({ class: props.ui?.label })"
    >
      <slot>{{ label }}</slot>
    </span>
    <slot name="suffix">
      <i
        v-if="isSuffix && suffixIconName"
        :class="style.suffixIcon({ class: [suffixIconName, props.ui?.suffixIcon] })"
      ></i>
    </slot>
  </Link>
</template>
