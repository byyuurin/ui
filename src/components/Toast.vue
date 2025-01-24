<script lang="ts">
import type { PrimitiveProps, ToastRootEmits, ToastRootProps } from 'reka-ui'
import type { toast } from '../theme'
import type { ButtonProps, ComponentAttrs } from '../types'

export interface ToastProps extends ComponentAttrs<typeof toast>, Pick<ToastRootProps, 'defaultOpen' | 'open' | 'type' | 'duration'> {
  /** @default "li" */
  as?: PrimitiveProps['as']
  title?: string
  description?: string
  icon?: string
  actions?: ButtonProps[]
  /**
   * Display a close button to dismiss the toast.
   * @default true
   */
  close?: ButtonProps | boolean
  /** @default `global.icons.close` */
  closeIcon?: string
}

export interface ToastEmits extends ToastRootEmits {}

export interface ToastSlots {
  icon?: (props?: {}) => any
  title?: (props?: {}) => any
  description?: (props?: {}) => any
  actions?: (props?: {}) => any
  close?: (props: { ui: any }) => any

}
</script>

<script setup lang="ts">
import { reactivePick, useElementBounding } from '@vueuse/core'
import { ToastAction, ToastClose, ToastDescription, ToastRoot, ToastTitle, useForwardPropsEmits } from 'reka-ui'
import { computed, ref } from 'vue'
import { useTheme } from '../composables'
import { createStyler } from '../internal'
import Button from './Button.vue'

const props = withDefaults(defineProps<ToastProps>(), {
  close: true,
})

const emit = defineEmits<ToastEmits>()
const slots = defineSlots<ToastSlots>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'defaultOpen', 'open', 'duration', 'type'), emit)

const el = ref()
const { height } = useElementBounding(el)

const multiline = computed(() => !!props.title && !!props.description)

const theme = useTheme()
const style = computed(() => {
  const styler = createStyler(theme.value.toast)
  return styler({ ...props, multiline: multiline.value })
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
    :class="style.root({ class: [props.class, props.ui?.root], multiline })"
    :style="{ '--height': height }"
  >
    <slot name="icon">
      <i v-if="props.icon" :class="style.icon({ class: [props.icon, props.ui?.icon] })"></i>
    </slot>

    <div :class="style.wrapper({ class: props.ui?.wrapper })">
      <ToastTitle v-if="props.title || !!slots.title" :class="style.title({ class: props.ui?.title })">
        <slot name="title">
          {{ props.title }}
        </slot>
      </ToastTitle>
      <ToastDescription v-if="props.description || !!slots.description" :class="style.description({ class: props.ui?.description })">
        <slot name="description">
          {{ props.description }}
        </slot>
      </ToastDescription>

      <div v-if="multiline && actions?.length" :class="style.actions({ class: props.ui?.actions, multiline: true })">
        <slot name="actions">
          <ToastAction v-for="(action, index) in props.actions" :key="index" :alt-text="action.label || 'Action'" as-child @click.stop>
            <Button size="xs" v-bind="action" />
          </ToastAction>
        </slot>
      </div>
    </div>

    <div v-if="(!multiline && actions?.length) || props.close !== null" :class="style.actions({ class: props.ui?.actions, multiline: false })">
      <template v-if="!multiline">
        <slot name="actions">
          <ToastAction v-for="(action, index) in props.actions" :key="index" :alt-text="action.label || 'Action'" as-child @click.stop>
            <Button size="xs" v-bind="action" />
          </ToastAction>
        </slot>
      </template>

      <ToastClose as-child>
        <slot name="close" :ui="ui">
          <UButton
            v-if="props.close"
            :icon="props.closeIcon || theme.global.icons.close"
            size="md"
            variant="link"
            aria-label="close"
            v-bind="typeof close === 'object' ? close : undefined"
            :class="style.close({ class: props.ui?.close })"
            @click.stop
          />
        </slot>
      </ToastClose>
    </div>

    <div v-if="remaining > 0 && duration" :class="style.progress({ class: props.ui?.progress })" :style="{ width: `${remaining / duration * 100}%` }"></div>
  </ToastRoot>
</template>
