<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import type { alert } from '../theme'
import type { ButtonProps, ComponentAttrs } from '../types'

export interface AlertEmits {
  'update:open': [value: boolean]
}

export interface AlertSlots {
  leading?: (props?: {}) => any
  title?: (props?: {}) => any
  description?: (props?: {}) => any
  actions?: (props?: {}) => any
  close?: (props: { ui: ComponentAttrs<typeof alert>['ui'] }) => any
}

type AlertVariants = VariantProps<typeof alert>

export interface AlertProps extends ComponentAttrs<typeof alert> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  title?: string
  description?: string
  icon?: string
  variant?: AlertVariants['variant']
  orientation?: AlertVariants['orientation']
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
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { useLocale } from '../composables/useLocale'
import { useTheme } from '../composables/useTheme'
import Button from './Button.vue'

const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'solid',
  orientation: 'vertical',
})

const emit = defineEmits<AlertEmits>()
const slots = defineSlots<AlertSlots>()

const { t } = useLocale()
const { theme, generateStyle } = useTheme()
const style = computed(() => generateStyle('alert', {
  ...props,
  title: !!props.title || !!slots.title,
}))
</script>

<template>
  <Primitive
    :as="props.as"
    :class="style.root({ class: [props.class, props.ui?.root] })"
    :data-orientation="props.orientation"
    data-part="root"
  >
    <slot name="leading">
      <span v-if="props.icon" :class="style.icon({ class: [props.icon, props.ui?.icon] })" data-part="icon"></span>
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
          :icon="props.closeIcon || theme.app.icons.close"
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
