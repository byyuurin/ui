<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { SeparatorProps as RekaSeparatorProps } from 'reka-ui'
import theme from '#build/ui/separator'
import type { AvatarProps, ComponentBaseProps, ComponentUIProps, IconProps, RuntimeAppConfig } from '../types'

export interface SeparatorSlots {
  default?: (props: {}) => any
}

type ThemeVariants = VariantProps<typeof theme>

export interface SeparatorProps extends ComponentBaseProps, Pick<RekaSeparatorProps, 'as' | 'decorative'> {
  orientation?: ThemeVariants['orientation']
  color?: ThemeVariants['color']
  size?: ThemeVariants['size']
  type?: ThemeVariants['type']
  align?: 'start' | 'end' | 'center'
  /** Display a label in the middle. */
  label?: string
  /**
   * Display an icon in the middle.
   */
  icon?: IconProps['name']
  avatar?: AvatarProps
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { Separator, useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { cv, merge } from '../utils/style'
import Avatar from './Avatar.vue'
import Icon from './Icon.vue'

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

    <template v-if="props.label || props.icon || props.avatar || slots.default">
      <div :class="style.container({ class: props.ui?.container })" data-part="container">
        <slot>
          <span
            v-if="props.label"
            :class="style.label({ class: props.ui?.label })"
            data-part="label"
          >{{ props.label }}</span>
          <Icon
            v-else-if="props.icon"
            :name="props.icon"
            :class="style.icon({ class: props.ui?.icon })"
            data-part="icon"
          />
          <Avatar
            v-else-if="props.avatar"
            :size="((props.ui?.avatarSize || style.avatarSize()) as AvatarProps['size'])"
            v-bind="props.avatar"
            :class="style.avatar({ class: props.ui?.avatar })"
            data-part="avatar"
          />
        </slot>
      </div>

      <div :class="style.border({ class: props.ui?.border, end: props.align === 'end' })" data-part="border"></div>
    </template>
  </Separator>
</template>
