<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/alert'
import type { ButtonProps, ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'

export interface AlertEmits {
  'update:open': [value: boolean]
}

export interface AlertSlots {
  leading?: (props?: {}) => any
  title?: (props?: {}) => any
  description?: (props?: {}) => any
  actions?: (props?: {}) => any
  close?: (props: { ui?: ComponentUIProps<typeof theme> }) => any
}

type ThemeVariants = VariantProps<typeof theme>

export interface AlertProps extends ComponentBaseProps {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  title?: string
  description?: string
  icon?: string
  color?: ThemeVariants['color']
  variant?: ThemeVariants['variant']
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
  close?: ButtonProps | boolean
  /**
   * The icon displayed in the close button.
   * @default app.icons.close
   */
  closeIcon?: string
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { cv, merge } from '../utils/style'
import Button from './Button.vue'
import Icon from './Icon.vue'

const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'solid',
  orientation: 'vertical',
})

const emit = defineEmits<AlertEmits>()
const slots = defineSlots<AlertSlots>()

const appConfig = useAppConfig() as RuntimeAppConfig
const { t } = useLocale()

const style = computed(() => {
  const ui = cv(merge(theme, appConfig.ui.alert))

  return ui({
    ...props,
    title: !!props.title || !!slots.title,
  })
})
</script>

<template>
  <Primitive
    :as="props.as"
    :class="style.root({ class: [props.class, props.ui?.root] })"
    :data-orientation="props.orientation"
    data-part="root"
  >
    <slot name="leading">
      <Icon v-if="props.icon" :name="props.icon" :class="style.icon({ class: props.ui?.icon })" data-part="icon" />
    </slot>

    <div :class="style.wrapper({ class: props.ui?.wrapper })" data-part="wrapper">
      <div v-if="props.title || slots.title" :class="style.title({ class: props.ui?.title })" data-part="title">
        <slot name="title">
          {{ props.title }}
        </slot>
      </div>
      <div v-if="props.description || slots.description" :class="style.description({ class: props.ui?.description })" data-part="description">
        <slot name="description">
          {{ props.description }}
        </slot>
      </div>

      <div v-if="props.orientation === 'vertical' && props.actions?.length" :class="style.actions({ class: props.ui?.actions })" data-part="actions">
        <slot name="actions">
          <Button v-for="(action, index) in props.actions" :key="index" size="xs" v-bind="action" />
        </slot>
      </div>
    </div>

    <div v-if="(props.orientation === 'horizontal' && props.actions?.length) || props.close" :class="style.actions({ class: props.ui?.actions, orientation: 'horizontal' })" data-part="actions">
      <template v-if="props.orientation === 'horizontal' && props.actions?.length">
        <slot name="actions">
          <Button v-for="(action, index) in props.actions" :key="index" size="xs" v-bind="action" />
        </slot>
      </template>

      <slot name="close" :ui="props.ui">
        <Button
          v-if="props.close"
          :icon="props.closeIcon || appConfig.ui.icons.close"
          size="md"
          variant="link"
          :aria-label="t('alert.close')"
          v-bind="typeof props.close === 'object' ? props.close : undefined"
          :class="style.close({ class: props.ui?.close })"
          data-part="close"
          @click="emit('update:open', false)"
        />
      </slot>
    </div>
  </Primitive>
</template>
