<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { badge } from '../theme'
import type { ComponentAttrs } from '../types'

type BadgeVariants = VariantProps<typeof badge>

export interface BadgeProps extends ComponentAttrs<typeof badge>, Pick<PrimitiveProps, 'as'>, Omit<UseComponentIconsProps, 'loading' | 'loadingIcon'> {
  variant?: BadgeVariants['variant']
  size?: BadgeVariants['size']
  label?: string
}

export interface BadgeSlots {
  prefix?: (props?: {}) => any
  default?: (props?: {}) => any
  suffix?: (props?: {}) => any
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useTheme } from '../composables/useTheme'

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'solid',
  size: 'md',
})

defineSlots<BadgeSlots>()

const { isPrefix, prefixIconName, isSuffix, suffixIconName } = useComponentIcons(props)

const { theme, createStyler } = useTheme()
const style = computed(() => {
  const styler = createStyler(theme.value.badge)
  return styler(props)
})
</script>

<template>
  <Primitive :as="props.as" :class="style.base({ class: [props.class, props.ui?.base] })">
    <slot name="prefix">
      <i v-if="isPrefix && prefixIconName" :class="style.prefixIcon({ class: [prefixIconName, props.ui?.prefixIcon] })"></i>
    </slot>

    <slot>
      <span v-if="props.label" :class="style.label({ class: props.ui?.label })">
        {{ props.label }}
      </span>
    </slot>

    <slot name="suffix">
      <i v-if="isSuffix && suffixIconName" :class="style.suffixIcon({ class: [suffixIconName, props.ui?.suffixIcon] })"></i>
    </slot>
  </Primitive>
</template>
