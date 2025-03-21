<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import { computed } from 'vue'
import type { KbdKey } from '../composables/useKbd'
import type { kbd } from '../theme'
import type { ComponentAttrs } from '../types'

export interface KbdSlots {
  default?: (props?: {}) => any
}

type KbdVariants = VariantProps<typeof kbd>

export interface KbdProps extends Omit<ComponentAttrs<typeof kbd>, 'ui'> {
  /**
   * The element or component this component should render as.
   * @default "kbd"
   */
  as?: PrimitiveProps['as']
  variant?: KbdVariants['variant']
  size?: KbdVariants['size']
  value?: KbdKey | (string & {})
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { useKbd } from '../composables/useKbd'
import { useTheme } from '../composables/useTheme'

const props = withDefaults(defineProps<KbdProps>(), {
  as: 'kbd',
})

defineSlots<KbdSlots>()

const { getKbdKey } = useKbd()
const { generateStyle } = useTheme()
const style = computed(() => generateStyle('kbd', props))
</script>

<template>
  <Primitive :as="props.as" :class="style">
    <slot>{{ getKbdKey(props.value) }}</slot>
  </Primitive>
</template>
