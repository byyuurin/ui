<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { SeparatorProps as _SeparatorProps } from 'reka-ui'
import theme from '#build/ui/separator'
import type { AvatarProps, ComponentBaseProps, ComponentStyler, ComponentUIProps, IconProps, RuntimeAppConfig } from '../types'
import type { StaticSlot } from '../types/utils'

type ThemeVariants = VariantProps<typeof theme>

export interface SeparatorProps extends ComponentBaseProps, Pick<_SeparatorProps, 'decorative'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: _SeparatorProps['as']
  /**
   * The orientation of the separator.
   * @default "horizontal"
   */
  orientation?: ThemeVariants['orientation']
  /** @default "neutral" */
  color?: ThemeVariants['color']
  /** @default "xs" */
  size?: ThemeVariants['size']
  /** @default "solid" */
  type?: ThemeVariants['type']
  align?: 'start' | 'end' | 'center'
  /** Display a label in the middle. */
  label?: string
  /** Display an icon in the middle. */
  icon?: IconProps['name']
  /** Display an avatar in the middle. */
  avatar?: AvatarProps
  ui?: ComponentUIProps<typeof theme>
}

export interface SeparatorSlots {
  default: StaticSlot<{ ui: ComponentStyler<typeof theme> }>
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
  align: 'center',
})

const slots = defineSlots<SeparatorSlots>()

const rootProps = useForwardProps(reactivePick(props, 'as', 'decorative', 'orientation'))

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.separator))
  return styler(props)
})
</script>

<template>
  <Separator v-bind="rootProps" :class="ui.root({ class: [props.ui?.root, props.class] })" data-part="root">
    <div :class="ui.border({ class: props.ui?.border, start: props.align === 'start' })" data-part="border"></div>

    <template v-if="props.label || props.icon || props.avatar || !!slots.default">
      <div :class="ui.container({ class: props.ui?.container })" data-part="container">
        <slot :ui="ui">
          <span
            v-if="props.label"
            :class="ui.label({ class: props.ui?.label })"
            data-part="label"
          >{{ props.label }}</span>
          <Icon
            v-else-if="props.icon"
            :name="props.icon"
            :class="ui.icon({ class: props.ui?.icon })"
            data-part="icon"
          />
          <Avatar
            v-else-if="props.avatar"
            :size="((props.ui?.avatarSize || ui.avatarSize()) as AvatarProps['size'])"
            v-bind="props.avatar"
            :class="ui.avatar({ class: props.ui?.avatar })"
            data-part="avatar"
          />
        </slot>
      </div>

      <div :class="ui.border({ class: props.ui?.border, end: props.align === 'end' })" data-part="border"></div>
    </template>
  </Separator>
</template>
