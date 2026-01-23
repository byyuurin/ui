<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/field-group'
import type { ComponentBaseProps, RuntimeAppConfig } from '../types'
import type { StaticSlot } from '../types/utils'

type ThemeVariant = VariantProps<typeof theme>

export interface FieldGroupProps extends ComponentBaseProps {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  /** @default "md" */
  size?: ThemeVariant['size']
  /**
   * The orientation the buttons are laid out.
   * @default "horizontal"
   */
  orientation?: ThemeVariant['orientation']
}

export interface FieldGroupSlots {
  default: StaticSlot
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { provideFieldGroup } from '../composables/useFieldGroup'
import { pick } from '../utils'
import { cv, merge } from '../utils/style'

const props = withDefaults(defineProps<FieldGroupProps>(), {
  orientation: 'horizontal',
})

defineSlots<FieldGroupSlots>()

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.fieldGroup))
  return styler(pick(props, ['orientation', 'size']))
})

provideFieldGroup(computed(() => ({
  orientation: props.orientation,
  size: props.size,
})))
</script>

<template>
  <Primitive :as="props.as" :data-orientation="props.orientation" data-part="base" :class="ui.base({ class: props.class })">
    <slot></slot>
  </Primitive>
</template>
