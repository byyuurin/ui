<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import type { alert } from '../theme'
import type { ButtonProps, ComponentAttrs } from '../types'

export interface AlertEmits {
  (event: 'update:open', value: boolean): void
}

export interface AlertSlots {
  prepend?: (props?: {}) => any
  title?: (props?: {}) => any
  description?: (props?: {}) => any
  actions?: (props?: {}) => any
  close?: (props: { ui: ComponentAttrs<typeof alert>['ui'] }) => any
}

type AlertVariants = VariantProps<typeof alert>

export interface AlertProps extends ComponentAttrs<typeof alert>, Pick<PrimitiveProps, 'as'> {
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
import { useTheme } from '../composables/useTheme'
import Button from './Button.vue'

const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'solid',
  orientation: 'vertical',
})

const emit = defineEmits<AlertEmits>()
const slots = defineSlots<AlertSlots>()

const { theme, createStyler } = useTheme()
const style = computed(() => {
  const styler = createStyler(theme.value.alert)
  return styler({
    ...props,
    title: !!props.title || !!slots.title,
  })
})
</script>

<template>
  <Primitive
    :as="props.as"
    :data-orientation="props.orientation"
    :class="style.root({ class: [props.class, props.ui?.root] })"
  >
    <slot name="prepend">
      <span v-if="props.icon" :class="style.icon({ class: [props.icon, props.ui?.icon] })"></span>
    </slot>

    <div :class="style.wrapper({ class: props.ui?.wrapper })">
      <div v-if="props.title || slots.title" :class="style.title({ class: props.ui?.title })">
        <slot name="title">
          {{ props.title }}
        </slot>
      </div>
      <div v-if="props.description || slots.description" :class="style.description({ class: props.ui?.description })">
        <slot name="description">
          {{ props.description }}
        </slot>
      </div>

      <div v-if="props.orientation === 'vertical' && props.actions?.length" :class="style.actions({ class: props.ui?.actions })">
        <slot name="actions">
          <Button v-for="(action, index) in props.actions" :key="index" size="xs" v-bind="action" />
        </slot>
      </div>
    </div>

    <div v-if="(props.orientation === 'horizontal' && props.actions?.length) || props.close" :class="style.actions({ class: props.ui?.actions, orientation: 'horizontal' })">
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
          aria-label="Close"
          v-bind="typeof props.close === 'object' ? props.close : undefined"
          :class="style.close({ class: props.ui?.close })"
          @click="emit('update:open', false)"
        />
      </slot>
    </div>
  </Primitive>
</template>
