<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps, ToastRootEmits, ToastRootProps } from 'reka-ui'
import theme from '#build/ui/toast'
import type { AvatarProps, ButtonProps, ComponentBaseProps, ComponentStyler, ComponentUIProps, IconProps, LinkPropsKeys, ProgressProps, RuntimeAppConfig } from '../types'
import type { StaticSlot, StringOrVNode } from '../types/utils'

type ThemeVariants = VariantProps<typeof theme>

export interface ToastProps extends ComponentBaseProps, Pick<ToastRootProps, 'defaultOpen' | 'open' | 'type' | 'duration'> {
  /**
   * The element or component this component should render as.
   * @default "li"
   */
  as?: PrimitiveProps['as']
  title?: StringOrVNode
  description?: StringOrVNode
  icon?: IconProps['name']
  avatar?: AvatarProps
  /** @default "primary" */
  color?: ThemeVariants['color']
  /** @default "vertical" */
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
  close?: boolean | Omit<ButtonProps, LinkPropsKeys>
  /**
   * The icon displayed in the close button.
   * @default app.icons.close
   */
  closeIcon?: IconProps['name']
  /**
   * Display a progress bar showing the toast's remaining duration.
   * @default true
   */
  progress?: boolean | Pick<ProgressProps, 'color' | 'ui'>
  ui?: ComponentUIProps<typeof theme>
}

export interface ToastEmits extends ToastRootEmits {}

export interface ToastSlots {
  leading: StaticSlot<{ ui: ComponentStyler<typeof theme> }>
  title: StaticSlot
  description: StaticSlot
  actions: StaticSlot
  close: StaticSlot<{ ui: ComponentStyler<typeof theme> }>
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { ToastAction, ToastClose, ToastDescription, ToastRoot, ToastTitle, useForwardPropsEmits } from 'reka-ui'
import { computed, nextTick, onMounted, shallowRef } from 'vue'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { pick } from '../utils'
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

const { t } = useLocale()
const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.toast))
  return styler({
    ...pick(props, ['color', 'orientation']),
    title: !!props.title || !!slots.title,
  })
})

const el = shallowRef()
const height = shallowRef(0)

onMounted(() => {
  if (!el.value)
    return

  nextTick(() => {
    height.value = el.value?.$el?.getBoundingClientRect()?.height
  })
})

defineExpose({
  height,
})
</script>

<template>
  <ToastRoot
    ref="el"
    v-slot="{ remaining, duration, open }"
    v-bind="rootProps"
    :data-orientation="props.orientation"
    data-part="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    :style="{ '--height': height }"
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
      <ToastTitle v-if="props.title || !!slots.title" data-part="title" :class="ui.title({ class: props.ui?.title })">
        <slot name="title">
          <component :is="props.title()" v-if="typeof props.title === 'function'" />
          <component :is="props.title" v-else-if="typeof props.title === 'object'" />
          <template v-else>
            {{ props.title }}
          </template>
        </slot>
      </ToastTitle>
      <ToastDescription v-if="props.description || !!slots.description" data-part="description" :class="ui.description({ class: props.ui?.description })">
        <slot name="description">
          <component :is="props.description()" v-if="typeof props.description === 'function'" />
          <component :is="props.description" v-else-if="typeof props.description === 'object'" />
          <template v-else>
            {{ props.description }}
          </template>
        </slot>
      </ToastDescription>

      <div v-if="props.orientation === 'vertical' && (props.actions?.length || slots.actions)" data-part="actions" :class="ui.actions({ class: props.ui?.actions })">
        <slot name="actions">
          <ToastAction v-for="(action, index) in props.actions" :key="index" :alt-text="action.label || 'Action'" as-child @click.stop>
            <Button size="xs" :color="props.color" v-bind="action" />
          </ToastAction>
        </slot>
      </div>
    </div>

    <div
      v-if="(props.orientation === 'horizontal' && (props.actions?.length || !!slots.actions)) || props.close"
      data-part="actions"
      :class="ui.actions({ class: props.ui?.actions })"
    >
      <template v-if="props.orientation === 'horizontal'">
        <slot name="actions">
          <ToastAction v-for="(action, index) in props.actions" :key="index" :alt-text="action.label || 'Action'" as-child @click.stop>
            <Button size="xs" :color="props.color" v-bind="action" />
          </ToastAction>
        </slot>
      </template>

      <ToastClose v-if="props.close || !!slots.close" as-child>
        <slot name="close" :ui="ui">
          <Button
            v-if="props.close"
            :icon="props.closeIcon || appConfig.ui.icons.close"
            color="neutral"
            variant="link"
            :aria-label="t('toast.close')"
            v-bind="typeof props.close === 'object' ? props.close : {}"
            data-part="close"
            :class="ui.close({ class: props.ui?.close })"
            @click.stop
          />
        </slot>
      </ToastClose>
    </div>

    <Progress
      v-if="props.progress && open && remaining >= 0 && duration"
      :model-value="remaining / duration * 100"
      :color="props.color"
      v-bind="(typeof props.progress === 'object' ? props.progress : {})"
      size="sm"
      data-part="progress"
      :class="ui.progress({ class: props.ui?.progress })"
    />
  </ToastRoot>
</template>
