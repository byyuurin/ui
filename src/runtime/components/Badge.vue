<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/badge'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { AvatarProps, ComponentBaseProps, ComponentStyler, ComponentUIProps, RuntimeAppConfig } from '../types'
import type { StaticSlot } from '../types/utils'

type ThemeVariants = VariantProps<typeof theme>

export interface BadgeProps extends ComponentBaseProps, Omit<UseComponentIconsProps, 'loading' | 'loadingIcon'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  /** @default "solid" */
  variant?: ThemeVariants['variant']
  /** @default "md" */
  size?: ThemeVariants['size']
  /** @default "primary" */
  color?: ThemeVariants['color']
  /** Render the badge with equal padding on all sides. */
  square?: boolean
  label?: string | number
  ui?: ComponentUIProps<typeof theme>
}

export interface BadgeSlots {
  leading: StaticSlot<{ ui: ComponentStyler<typeof theme> }>
  default: StaticSlot<{ ui: ComponentStyler<typeof theme> }>
  trailing: StaticSlot<{ ui: ComponentStyler<typeof theme> }>
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useFieldGroup } from '../composables/useFieldGroup'
import { pick } from '../utils'
import { cv, merge } from '../utils/style'
import Avatar from './Avatar.vue'
import Icon from './Icon.vue'

const props = withDefaults(defineProps<BadgeProps>(), {
  as: 'span',
})

const slots = defineSlots<BadgeSlots>()

const { size, orientation } = useFieldGroup(props)
const { isLeading, leadingIconName, isTrailing, trailingIconName } = useComponentIcons(props)

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.badge))

  return styler({
    ...pick(props, ['color', 'variant']),
    size: size.value,
    square: props.square || (!slots.default && !props.label),
    fieldGroup: orientation.value,
  })
})
</script>

<template>
  <Primitive :as="props.as" :class="ui.base({ class: [props.ui?.base, props.class] })" data-part="base">
    <slot name="leading" :ui="ui">
      <Icon
        v-if="isLeading && leadingIconName"
        :name="leadingIconName"
        :class="ui.leadingIcon({ class: props.ui?.leadingIcon })"
        data-part="leadingIcon"
      />
      <Avatar
        v-else-if="props.avatar"
        :size="((props.ui?.leadingAvatarSize || ui.leadingAvatarSize()) as AvatarProps['size'])"
        v-bind="props.avatar"
        :class="ui.leadingAvatar({ class: props.ui?.leadingAvatar })"
        data-part="leadingAvatar"
      />
    </slot>

    <slot :ui="ui">
      <span v-if="props.label" :class="ui.label({ class: props.ui?.label })" data-part="label">
        {{ props.label }}
      </span>
    </slot>

    <slot name="trailing" :ui="ui">
      <Icon
        v-if="isTrailing && trailingIconName"
        :name="trailingIconName"
        :class="ui.trailingIcon({ class: props.ui?.trailingIcon })"
        data-part="trailingIcon"
      />
    </slot>
  </Primitive>
</template>
