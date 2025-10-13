<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps, ToastRootEmits, ToastRootProps } from 'reka-ui'
import theme from '#build/ui/toast'
import type { AvatarProps, ButtonProps, ComponentBaseProps, ComponentUIProps, IconProps, ProgressProps, RuntimeAppConfig } from '../types'

export interface ToastEmits extends ToastRootEmits {}

export interface ToastSlots {
  leading?: (props?: {}) => any
  title?: (props?: {}) => any
  description?: (props?: {}) => any
  actions?: (props?: {}) => any
  close?: (props: { ui?: ComponentUIProps<typeof theme> }) => any
}

type ThemeVariants = VariantProps<typeof theme>

export interface ToastProps extends ComponentBaseProps, Pick<ToastRootProps, 'defaultOpen' | 'open' | 'type' | 'duration'> {
  /** @default "li" */
  as?: PrimitiveProps['as']
  title?: string
  description?: string
  icon?: IconProps['name']
  avatar?: AvatarProps
  color?: ThemeVariants['color']
  orientation?: ThemeVariants['orientation']
  /**
   * Display a list of actions:
   * - under the title and description when orientation is `vertical`
   * - next to the close button when orientation is `horizontal`
   */
  actions?: ButtonProps[]
  /**
   * Display a close button to dismiss the toast.
   * @default true
   */
  close?: ButtonProps | boolean
  /** @default app.icons.close */
  closeIcon?: string
  /**
   * Display a progress bar showing the toast's remaining duration.
   * @default true
   */
  progress?: boolean | Pick<ProgressProps, 'color' | 'ui'>
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script setup lang="ts">
import { reactivePick, useElementBounding } from '@vueuse/core'
import { ToastAction, ToastClose, ToastDescription, ToastRoot, ToastTitle, useForwardPropsEmits } from 'reka-ui'
import { computed, ref } from 'vue'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { cv, merge } from '../utils/style'
import Avatar from './Avatar.vue'
import Button from './Button.vue'
import Icon from './Icon.vue'
import Progress from './Progress.vue'

const props = withDefaults(defineProps<ToastProps>(), {
  orientation: 'vertical',
  close: true,
  progress: true,
})

const emit = defineEmits<ToastEmits>()
const slots = defineSlots<ToastSlots>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'defaultOpen', 'open', 'duration', 'type'), emit)

const el = ref<InstanceType<typeof ToastRoot>>()
const { height } = useElementBounding(() => el.value?.$el.getBoundingClientRect ? el.value.$el : undefined)

const { t } = useLocale()
const appConfig = useAppConfig() as RuntimeAppConfig
const style = computed(() => {
  const ui = cv(merge(theme, appConfig.ui.toast))
  return ui({
    ...props,
    title: !!(props.title || slots.title),
  })
})

defineExpose({
  height,
})
</script>

<template>
  <ToastRoot
    ref="el"
    v-slot="{ remaining, duration }"
    v-bind="rootProps"
    :class="style.root({ class: [props.class, props.ui?.root] })"
    data-part="root"
    :style="{ '--height': height }"
  >
    <slot name="leading">
      <Avatar
        v-if="props.avatar"
        :size="((props.ui?.avatarSize || style.avatarSize()) as AvatarProps['size'])"
        v-bind="props.avatar"
        :class="style.avatar({ class: props.ui?.avatar })"
        data-part="avatar"
      />
      <Icon
        v-else-if="props.icon"
        :name="props.icon"
        :class="style.icon({ class: props.ui?.icon })"
        data-part="icon"
      />
    </slot>

    <div :class="style.wrapper({ class: props.ui?.wrapper })" data-part="wrapper">
      <ToastTitle v-if="props.title || !!slots.title" :class="style.title({ class: props.ui?.title })" data-part="title">
        <slot name="title">
          {{ props.title }}
        </slot>
      </ToastTitle>
      <ToastDescription v-if="props.description || !!slots.description" :class="style.description({ class: props.ui?.description })" data-part="description">
        <slot name="description">
          {{ props.description }}
        </slot>
      </ToastDescription>

      <div v-if="props.orientation === 'vertical' && (props.actions?.length || slots.actions)" :class="style.actions({ class: props.ui?.actions })" data-part="actions">
        <slot name="actions">
          <ToastAction v-for="(action, index) in props.actions" :key="index" :alt-text="action.label || 'Action'" as-child @click.stop>
            <Button size="xs" v-bind="action" />
          </ToastAction>
        </slot>
      </div>
    </div>

    <div
      v-if="(props.orientation === 'horizontal' && (props.actions?.length || slots.actions)) || props.close || slots.close"
      :class="style.actions({ class: props.ui?.actions })"
      data-part="actions"
    >
      <template v-if="props.orientation === 'horizontal'">
        <slot name="actions">
          <ToastAction v-for="(action, index) in props.actions" :key="index" :alt-text="action.label || 'Action'" as-child @click.stop>
            <Button size="xs" v-bind="action" />
          </ToastAction>
        </slot>
      </template>

      <ToastClose v-if="props.close || slots.close" as-child>
        <slot name="close" :ui="props.ui">
          <Button
            :icon="props.closeIcon || appConfig.ui.icons.close"
            color="neutral"
            variant="link"
            :aria-label="t('toast.close')"
            v-bind="typeof close === 'object' ? close : undefined"
            :class="style.close({ class: props.ui?.close })"
            data-part="close"
            @click.stop
          />
        </slot>
      </ToastClose>
    </div>

    <Progress
      v-if="props.progress && props.open && remaining >= 0 && duration"
      :model-value="remaining / duration * 100"
      :color="props.color"
      v-bind="(typeof props.progress === 'object' ? props.progress : {})"
      size="sm"
      :class="style.progress({ class: props.ui?.progress })"
    />
  </ToastRoot>
</template>
