<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps, ToastRootEmits, ToastRootProps } from 'reka-ui'
import type { toast } from '../theme'
import type { ButtonProps, ComponentAttrs } from '../types'

export interface ToastEmits extends ToastRootEmits {}

export interface ToastSlots {
  icon?: (props?: {}) => any
  title?: (props?: {}) => any
  description?: (props?: {}) => any
  actions?: (props?: {}) => any
  close?: (props: { ui: ComponentAttrs<typeof toast>['ui'] }) => any
}

type ToastVariants = VariantProps<typeof toast>

export interface ToastProps extends ComponentAttrs<typeof toast>, Pick<ToastRootProps, 'defaultOpen' | 'open' | 'type' | 'duration'> {
  /** @default "li" */
  as?: PrimitiveProps['as']
  title?: string
  description?: string
  icon?: string
  orientation?: ToastVariants['orientation']
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
}
</script>

<script setup lang="ts">
import { reactivePick, useElementBounding } from '@vueuse/core'
import { ToastAction, ToastClose, ToastDescription, ToastRoot, ToastTitle, useForwardPropsEmits } from 'reka-ui'
import { computed, ref } from 'vue'
import { useLocale } from '../composables/useLocale'
import { useTheme } from '../composables/useTheme'
import Button from './Button.vue'

const props = withDefaults(defineProps<ToastProps>(), {
  orientation: 'vertical',
  close: true,
})

const emit = defineEmits<ToastEmits>()
const slots = defineSlots<ToastSlots>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'defaultOpen', 'open', 'duration', 'type'), emit)

const el = ref<InstanceType<typeof ToastRoot>>()
const { height } = useElementBounding(() => el.value?.$el.getBoundingClientRect ? el.value.$el : undefined)

const { t } = useLocale()
const { theme, generateStyle } = useTheme()
const style = computed(() => generateStyle('toast', {
  ...props,
  title: !!(props.title || slots.title),
}))

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
    <slot name="icon">
      <span v-if="props.icon" :class="style.icon({ class: [props.icon, props.ui?.icon] })" data-part="icon"></span>
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

      <div v-if="props.orientation === 'vertical' && actions?.length" :class="style.actions({ class: props.ui?.actions })" data-part="actions">
        <slot name="actions">
          <ToastAction v-for="(action, index) in props.actions" :key="index" :alt-text="action.label || 'Action'" as-child @click.stop>
            <Button size="xs" v-bind="action" />
          </ToastAction>
        </slot>
      </div>
    </div>

    <div
      v-if="(props.orientation === 'horizontal' && actions?.length) || props.close || slots.close"
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
            :icon="props.closeIcon || theme.app.icons.close"
            size="sm"
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

    <div v-if="remaining >= 0 && duration" :class="style.progress({ class: props.ui?.progress })" data-part="progress" :style="{ width: `${remaining / duration * 100}%` }"></div>
  </ToastRoot>
</template>
