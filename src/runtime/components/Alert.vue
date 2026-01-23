<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/alert'
import type { AvatarProps, ButtonProps, ComponentBaseProps, ComponentStyler, ComponentUIProps, IconProps, LinkPropsKeys, RuntimeAppConfig } from '../types'
import type { StaticSlot } from '../types/utils'

type ThemeVariants = VariantProps<typeof theme>

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
  close?: boolean | Omit<ButtonProps, LinkPropsKeys>
  /**
   * The icon displayed in the close button.
   * @default app.icons.close
   */
  closeIcon?: IconProps['name']
  ui?: ComponentUIProps<typeof theme>
}

export interface AlertEmits {
  'update:open': [open: boolean]
}

export interface AlertSlots {
  leading: StaticSlot<{ ui: ComponentStyler<typeof theme> }>
  title: StaticSlot
  description: StaticSlot
  actions: StaticSlot
  close: StaticSlot<{ ui: ComponentStyler<typeof theme> }>
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { pick } from '../utils'
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
    ...pick(props, ['color', 'variant', 'orientation']),
    title: !!props.title || !!slots.title,
  })
})
</script>

<template>
  <Primitive
    :as="props.as"
    :data-orientation="props.orientation"
    data-part="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
  >
    <slot name="leading" :ui="ui">
      <Avatar
        v-if="props.avatar"
        :size="((props.ui?.avatarSize || ui.avatarSize()) as AvatarProps['size'])"
        v-bind="props.avatar"
        data-part="avatar"
        :class="ui.avatar({ class: props.ui?.avatar })"
      />
      <Icon
        v-else-if="props.icon"
        :name="props.icon"
        data-part="icon"
        :class="ui.icon({ class: props.ui?.icon })"
      />
    </slot>

    <div data-part="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
      <div v-if="props.title || slots.title" data-part="title" :class="ui.title({ class: props.ui?.title })">
        <slot name="title">
          {{ props.title }}
        </slot>
      </div>
      <div v-if="props.description || slots.description" data-part="description" :class="ui.description({ class: props.ui?.description })">
        <slot name="description">
          {{ props.description }}
        </slot>
      </div>

      <div v-if="props.orientation === 'vertical' && (props.actions?.length || slots.actions)" data-part="actions" :class="ui.actions({ class: props.ui?.actions })">
        <slot name="actions">
          <Button v-for="(action, index) in props.actions" :key="index" size="xs" v-bind="action" />
        </slot>
      </div>
    </div>

    <div v-if="(props.orientation === 'horizontal' && (props.actions?.length || slots.actions)) || props.close" data-part="actions" :class="ui.actions({ class: props.ui?.actions, orientation: 'horizontal' })">
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
          data-part="close"
          :class="ui.close({ class: props.ui?.close })"
          @click="emit('update:open', false)"
        />
      </slot>
    </div>
  </Primitive>
</template>
