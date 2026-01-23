<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import { computed } from 'vue'
import theme from '#build/ui/kbd'
import type { KbdKey } from '../composables/useKbd'
import type { ComponentBaseProps, RuntimeAppConfig } from '../types'
import type { StaticSlot } from '../types/utils'

type ThemeVariants = VariantProps<typeof theme>

export interface KbdProps extends ComponentBaseProps {
  /**
   * The element or component this component should render as.
   * @default "kbd"
   */
  as?: PrimitiveProps['as']
  /** @default "outline" */
  variant?: ThemeVariants['variant']
  /** @default "md" */
  size?: ThemeVariants['size']
  /** @default "neutral" */
  color?: ThemeVariants['color']
  value?: KbdKey | (string & {})
}

export interface KbdSlots {
  default: StaticSlot
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useKbd } from '../composables/useKbd'
import { pick } from '../utils'
import { cv, merge } from '../utils/style'

const props = withDefaults(defineProps<KbdProps>(), {
  as: 'kbd',
})

defineSlots<KbdSlots>()

const { getKbdKey } = useKbd()
const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.kbd))
  return styler(pick(props, ['color', 'variant', 'size']))
})
</script>

<template>
  <Primitive :as="props.as" data-part="base" :class="ui.base({ class: props.class })">
    <slot>{{ getKbdKey(props.value) }}</slot>
  </Primitive>
</template>
