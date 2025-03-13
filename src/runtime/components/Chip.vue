<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { chip } from '../theme'
import type { ComponentAttrs } from '../types'

export interface ChipSlots {
  leading?: (props?: {}) => any
  default?: (props?: {}) => any
  trailing?: (props?: {}) => any
}

type ChipVariants = VariantProps<typeof chip>

export interface ChipProps extends ComponentAttrs<typeof chip>, Omit<UseComponentIconsProps, 'loading' | 'loadingIcon'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  variant?: ChipVariants['variant']
  size?: ChipVariants['size']
  label?: string
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
const { isLeading, leadingIconName, isTrailing, trailingIconName } = useComponentIcons(props)

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
    <slot name="leading">
      <span v-if="isLeading && leadingIconName" :class="style.leadingIcon({ class: [leadingIconName, props.ui?.leadingIcon] })"></span>
    </slot>

    <span v-if="props.label || slots.default" :class="style.label({ class: props.ui?.label })">
      <slot>{{ props.label }}</slot>
    </span>

    <slot name="trailing">
      <span v-if="isTrailing && trailingIconName" :class="style.trailingIcon({ class: [trailingIconName, props.ui?.trailingIcon] })"></span>
    </slot>
  </Primitive>
</template>
