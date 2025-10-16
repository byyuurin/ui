<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/alert'
import type { AvatarProps, ButtonProps, ComponentBaseProps, ComponentUIProps, IconProps, RuntimeAppConfig } from '../types'
import type { StaticSlot } from '../types/utils'

export interface AlertEmits {
  'update:open': [value: boolean]
}

type ThemeVariants = VariantProps<typeof theme>

export interface AlertSlots {
  leading: StaticSlot
  title: StaticSlot
  description: StaticSlot
  actions: StaticSlot
  close: StaticSlot<{ ui: { [K in keyof Required<ComponentUIProps<typeof theme>>]: (props?: ThemeVariants) => string } }>
}

export interface AlertProps extends ComponentBaseProps {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  title?: string
  description?: string
  icon?: IconProps['name']
  avatar?: AvatarProps
  /** @default "primary" */
  color?: ThemeVariants['color']
  /** @default "solid" */
  variant?: ThemeVariants['variant']
  /**
   * The orientation between the content and the actions.
   * @default "vertical"
   */
  orientation?: ThemeVariants['orientation']
  /**
   * Display a list of actions:
   * - under the title and description when orientation is `vertical`
   * - next to the close button when orientation is `horizontal`
   */
  actions?: ButtonProps[]
  /**
   * Display a close button to dismiss the alert.
   * @default false
   */
  close?: boolean | Partial<ButtonProps>
  /**
   * The icon displayed in the close button.
   * @default app.icons.close
   */
  closeIcon?: IconProps['name']
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { cv, merge } from '../utils/style'
import Avatar from './Avatar.vue'
import Button from './Button.vue'
import Icon from './Icon.vue'

const props = withDefaults(defineProps<AlertProps>(), {
  orientation: 'vertical',
})

const emit = defineEmits<AlertEmits>()
const slots = defineSlots<AlertSlots>()

const { t } = useLocale()

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.alert))

  return styler({
    ...props,
    title: !!props.title || !!slots.title,
  })
})
</script>

<template>
  <Primitive
    :as="props.as"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    :data-orientation="props.orientation"
    data-part="root"
  >
    <slot name="leading">
      <Avatar
        v-if="props.avatar"
        :size="((props.ui?.avatarSize || ui.avatarSize()) as AvatarProps['size'])"
        v-bind="props.avatar"
        :class="ui.avatar({ class: props.ui?.avatar })"
        data-part="avatar"
      />
      <Icon
        v-else-if="props.icon"
        :name="props.icon"
        :class="ui.icon({ class: props.ui?.icon })"
        data-part="icon"
      />
    </slot>

    <div :class="ui.wrapper({ class: props.ui?.wrapper })" data-part="wrapper">
      <div v-if="props.title || slots.title" :class="ui.title({ class: props.ui?.title })" data-part="title">
        <slot name="title">
          {{ props.title }}
        </slot>
      </div>
      <div v-if="props.description || slots.description" :class="ui.description({ class: props.ui?.description })" data-part="description">
        <slot name="description">
          {{ props.description }}
        </slot>
      </div>

      <div v-if="props.orientation === 'vertical' && (props.actions?.length || slots.actions)" :class="ui.actions({ class: props.ui?.actions })" data-part="actions">
        <slot name="actions">
          <Button v-for="(action, index) in props.actions" :key="index" size="xs" v-bind="action" />
        </slot>
      </div>
    </div>

    <div v-if="(props.orientation === 'horizontal' && (props.actions?.length || slots.actions)) || props.close" :class="ui.actions({ class: props.ui?.actions, orientation: 'horizontal' })" data-part="actions">
      <template v-if="props.orientation === 'horizontal' && (props.actions?.length || slots.actions)">
        <slot name="actions">
          <Button v-for="(action, index) in props.actions" :key="index" size="xs" v-bind="action" />
        </slot>
      </template>

      <slot name="close" :ui="ui">
        <Button
          v-if="props.close"
          :icon="props.closeIcon || appConfig.ui.icons.close"
          color="neutral"
          variant="link"
          :aria-label="t('alert.close')"
          v-bind="typeof props.close === 'object' ? props.close as Partial<ButtonProps> : {}"
          :class="ui.close({ class: props.ui?.close })"
          data-part="close"
          @click="emit('update:open', false)"
        />
      </slot>
    </div>
  </Primitive>
</template>
