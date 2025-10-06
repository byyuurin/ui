<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { SeparatorProps as RekaSeparatorProps } from 'reka-ui'
import theme from '#build/ui/separator'
import type { ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'

export interface SeparatorSlots {
  default?: (props: {}) => any
}

type ThemeVariants = VariantProps<typeof theme>

export interface SeparatorProps extends ComponentBaseProps, Pick<RekaSeparatorProps, 'as' | 'decorative'> {
  orientation?: ThemeVariants['orientation']
  align?: 'start' | 'end' | 'center'
  /** Display a label in the middle. */
  label?: string
  /**
   * Display an icon in the middle.
   */
  icon?: string
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { Separator, useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { cv, merge } from '../utils/style'

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal',
  position: 'center',
})

const slots = defineSlots<SeparatorSlots>()

const rootProps = useForwardProps(reactivePick(props, 'as', 'decorative', 'orientation'))

const appConfig = useAppConfig() as RuntimeAppConfig
const style = computed(() => {
  const ui = cv(merge(theme, appConfig.ui.separator))
  return ui(props)
})
</script>

<template>
  <Separator v-bind="rootProps" :class="style.root({ class: [props.class, props.ui?.root] })" data-part="root">
    <div :class="style.border({ class: props.ui?.border, start: props.align === 'start' })" data-part="border"></div>

    <template v-if="props.label || props.icon || slots.default">
      <div :class="style.container({ class: props.ui?.container })" data-part="container">
        <slot>
          <span v-if="props.label" :class="style.label({ class: props.ui?.label })" data-part="label">{{ props.label }}</span>
          <span v-else-if="props.icon" :class="style.icon({ class: [props.icon, props.ui?.icon] })" data-part="icon"></span>
        </slot>
      </div>

      <div :class="style.border({ class: props.ui?.border, end: props.align === 'end' })" data-part="border"></div>
    </template>
  </Separator>
</template>
