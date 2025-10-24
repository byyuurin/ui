<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import theme from '#build/ui/button'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { AvatarProps, ComponentBaseProps, ComponentStyler, ComponentUIProps, IconProps, LinkProps, RuntimeAppConfig } from '../types'
import type { StaticSlot } from '../types/utils'

type ThemeVariants = VariantProps<typeof theme>

export interface ButtonProps extends ComponentBaseProps, UseComponentIconsProps, Omit<LinkProps, 'raw' | 'custom'> {
  icon?: IconProps['name']
  label?: string
  /** @default "solid" */
  variant?: ThemeVariants['variant']
  activeVariant?: ThemeVariants['variant']
  /** @default "md"  */
  size?: ThemeVariants['size']
  /** @default "primary" */
  color?: ThemeVariants['color']
  activeColor?: ThemeVariants['color']
  /** Render the button with equal padding on all sides. */
  square?: boolean
  /** Render the button full width. */
  block?: boolean
  /** Set loading state automatically based on the `@click` promise state */
  loadingAuto?: boolean
  onClick?: ((event: MouseEvent) => void | Promise<void>) | Array<((event: MouseEvent) => void | Promise<void>)>
  ui?: ComponentUIProps<typeof theme>
}

export interface ButtonSlots {
  default: StaticSlot<{ ui: ComponentStyler<typeof theme> }>
  leading: StaticSlot<{ ui: ComponentStyler<typeof theme> }>
  trailing: StaticSlot<{ ui: ComponentStyler<typeof theme> }>
}
</script>

<script lang="ts" setup>
import { useForwardProps } from 'reka-ui'
import { computed, shallowRef } from 'vue'
import { useAppConfig } from '#imports'
import { injectFormLoading } from '../composables/injections'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useFieldGroup } from '../composables/useFieldGroup'
import { omit, pickLinkProps } from '../utils'
import { cv, merge } from '../utils/style'
import Avatar from './Avatar.vue'
import Icon from './Icon.vue'
import Link from './Link.vue'
import LinkBase from './LinkBase.vue'

const props = defineProps<ButtonProps>()
const slots = defineSlots<ButtonSlots>()

const linkProps = useForwardProps(pickLinkProps(props))

const loadingAutoState = shallowRef(false)
const formLoading = injectFormLoading()

async function onClickWrapper(event: MouseEvent) {
  loadingAutoState.value = true

  const callbacks = Array.isArray(props.onClick) ? props.onClick : [props.onClick]

  try {
    await Promise.all(callbacks.map((fn) => fn?.(event)))
  }
  finally {
    loadingAutoState.value = false
  }
}

const isLoading = computed(() => props.loading || (props.loadingAuto && (loadingAutoState.value || (formLoading?.value && props.type === 'submit'))))

const { size, orientation } = useFieldGroup(props)
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(
  computed(() => ({ ...props, loading: isLoading.value })),
)

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const uiConfig: typeof appConfig.ui.button = {
    ...appConfig.ui.button,
    variants: {
      ...appConfig.ui.button?.variants,
      active: {
        true: {
          base: [appConfig.ui.button?.variants?.active?.true?.base, props.activeClass].filter(Boolean).join(' '),
        },
        false: {
          base: [appConfig.ui.button?.variants?.active?.false?.base, props.inactiveClass].filter(Boolean).join(' '),
        },
      },
    },
  }

  const styler = cv(merge(theme, uiConfig))

  return styler({
    ...props,
    loading: isLoading.value,
    size: size.value,
    fieldGroup: orientation.value,
    block: props.block,
    square: props.square || (!slots.default && !props.label),
    leading: isLeading.value,
    trailing: isTrailing.value,
  })
})
</script>

<template>
  <Link
    v-slot="{ active, ...slotProps }"
    :type="props.type"
    :disabled="props.disabled || props.loading"
    v-bind="omit(linkProps, ['type', 'disabled', 'onClick'])"
    data-part="base"
    custom
  >
    <LinkBase
      v-bind="slotProps"
      :class="ui.base({
        class: [props.ui?.base, props.class],
        active,
        ...(props.active && props.activeVariant ? { variant: props.activeVariant } : {}),
        ...(props.active && props.activeColor ? { color: props.activeColor } : {}),
      })"
      @click="onClickWrapper"
    >
      <slot name="leading" :ui="ui">
        <Icon
          v-if="isLeading && leadingIconName"
          :name="leadingIconName"
          :class="ui.leadingIcon({ class: props.ui?.leadingIcon, active })"
          data-part="leading-icon"
        />
        <Avatar
          v-else-if="props.avatar"
          :size="((props.ui?.leadingAvatarSize || ui.leadingAvatarSize()) as AvatarProps['size'])"
          v-bind="props.avatar"
          :class="ui.leadingAvatar({ class: props.ui?.leadingAvatar, active })"
          data-part="leading-avatar"
        />
      </slot>

      <slot :ui="ui">
        <span
          v-if="props.label"
          :class="ui.label({ class: props.ui?.label, active })"
          data-part="label"
        >
          {{ label }}
        </span>
      </slot>

      <slot name="trailing" :ui="ui">
        <Icon
          v-if="isTrailing && trailingIconName"
          :name="trailingIconName"
          :class="ui.trailingIcon({ class: props.ui?.trailingIcon, active })"
          data-part="trailing-icon"
        />
      </slot>
    </LinkBase>
  </Link>
</template>
