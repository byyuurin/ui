<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { chip } from '../theme'
import type { ComponentAttrs } from '../types'

type ChipVariants = VariantProps<typeof chip>

export interface ChipProps extends ComponentAttrs<typeof chip>, Pick<PrimitiveProps, 'as'>, Omit<UseComponentIconsProps, 'loading' | 'loadingIcon'> {
  variant?: ChipVariants['variant']
  size?: ChipVariants['size']
  label?: string
}

export interface ChipSlots {
  prefix?: (props?: {}) => any
  default?: (props?: {}) => any
  suffix?: (props?: {}) => any
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { useButtonGroup } from '../composables/useButtonGroup'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useTheme } from '../composables/useTheme'

const props = withDefaults(defineProps<ChipProps>(), {
  variant: 'solid',
})

const slots = defineSlots<ChipSlots>()

const { size, orientation } = useButtonGroup(props)
const { isPrefix, prefixIconName, isSuffix, suffixIconName } = useComponentIcons(props)

const { theme, createStyler } = useTheme()
const style = computed(() => {
  const styler = createStyler(theme.value.chip)
  return styler({
    ...props,
    size: size.value,
    groupOrientation: orientation.value,
  })
})
</script>

<template>
  <Primitive :as="props.as" :class="style.base({ class: [props.class, props.ui?.base] })">
    <slot name="prefix">
      <i v-if="isPrefix && prefixIconName" :class="style.prefixIcon({ class: [prefixIconName, props.ui?.prefixIcon] })"></i>
    </slot>

    <span v-if="props.label || slots.default" :class="style.label({ class: props.ui?.label })">
      <slot>{{ props.label }}</slot>
    </span>

    <slot name="suffix">
      <i v-if="isSuffix && suffixIconName" :class="style.suffixIcon({ class: [suffixIconName, props.ui?.suffixIcon] })"></i>
    </slot>
  </Primitive>
</template>
