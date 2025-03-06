<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { SeparatorProps as RekaSeparatorProps } from 'reka-ui'
import type { separator } from '../theme'
import type { ComponentAttrs } from '../types'

export interface SeparatorSlots {
  default?: (props: {}) => any
}

type SeparatorVariants = VariantProps<typeof separator>

export interface SeparatorProps extends ComponentAttrs<typeof separator>, Pick<RekaSeparatorProps, 'as' | 'decorative'> {
  orientation?: SeparatorVariants['orientation']
  align?: 'start' | 'end' | 'center'
  /** Display a label in the middle. */
  label?: string
  /**
   * Display an icon in the middle.
   */
  icon?: string
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { Separator, useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal',
  position: 'center',
})

const slots = defineSlots<SeparatorSlots>()

const rootProps = useForwardProps(reactivePick(props, 'as', 'decorative', 'orientation'))

const { theme, createStyler } = useTheme()

const style = computed(() => {
  const styler = createStyler(theme.value.separator)
  return styler(props)
})
</script>

<template>
  <Separator v-bind="rootProps" :class="style.root({ class: [props.class, props.ui?.root] })">
    <div :class="style.line({ class: props.ui?.line, start: props.align === 'start' })"></div>

    <template v-if="props.label || props.icon || slots.default">
      <div :class="style.container({ class: props.ui?.container })">
        <slot>
          <span v-if="props.label" :class="style.label({ class: props.ui?.label })">{{ props.label }}</span>
          <span v-else-if="props.icon" :class="style.icon({ class: [props.icon, props.ui?.icon] })"></span>
        </slot>
      </div>

      <div :class="style.line({ class: props.ui?.line, end: props.align === 'end' })"></div>
    </template>
  </Separator>
</template>
