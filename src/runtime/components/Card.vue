<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import type { card } from '../theme'
import type { ComponentAttrs } from '../types'

export interface CardSlots {
  default?: (props?: {}) => any
  content?: (props?: {}) => any
  header?: (props?: {}) => any
  title?: (props?: {}) => any
  description?: (props?: {}) => any
  footer?: (props?: {}) => any
}

type CardVariants = VariantProps<typeof card>

export interface CardProps extends ComponentAttrs<typeof card> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  variant?: CardVariants['variant']
  title?: string
  description?: string
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'

const props = withDefaults(defineProps<CardProps>(), {})
const slots = defineSlots<CardSlots>()

const { generateStyle } = useTheme()
const style = computed(() => generateStyle('card', props))
</script>

<template>
  <Primitive :as="props.as" :class="style.root({ class: [props.class, props.ui?.root] })">
    <slot name="content">
      <div
        v-if="slots.header || props.title || slots.title || props.description || slots.description "
        :class="style.header({ class: props.ui?.header })"
      >
        <slot name="header">
          <Primitive
            v-if="props.title || slots.title"
            :as="slots.title ? undefined : 'h2'"
            :class="style.title({ class: props.ui?.title })"
          >
            <slot name="title">
              {{ props.title }}
            </slot>
          </Primitive>
          <Primitive
            v-if="props.description || slots.description"
            :as="slots.description ? undefined : 'p'"
            :as-child="!!slots.description"
            :class="style.description({ class: props.ui?.description })"
          >
            <slot name="description">
              {{ props.description }}
            </slot>
          </Primitive>
        </slot>
      </div>

      <div v-if="slots.default" :class="style.body({ class: props.ui?.body })">
        <slot></slot>
      </div>

      <div v-if="slots.footer" :class="style.footer({ class: props.ui?.footer })">
        <slot name="footer"></slot>
      </div>
    </slot>
  </Primitive>
</template>
