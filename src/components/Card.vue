<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { card } from '../theme'
import type { ComponentAttrs } from '../types'

export interface CardProps extends ComponentAttrs<typeof card> {
  as?: PrimitiveProps['as']
  title?: string
  description?: string
}

export interface CardSlots {
  default?: (props?: {}) => any
  content?: (props?: {}) => any
  header?: (props?: {}) => any
  title?: (props?: any) => any
  description?: (props?: any) => any
  footer?: (props?: {}) => any
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { useTheme } from '../composables'
import { createStyler } from '../internal'

const props = withDefaults(defineProps<CardProps>(), {})
const slots = defineSlots<CardSlots>()

const theme = useTheme()
const style = computed(() => {
  const styler = createStyler(theme.value.card)
  return styler(props)
})
</script>

<template>
  <Primitive :as="props.as" :class="style.root({ class: [props.class, props.ui?.root] })">
    <slot name="content">
      <div v-if="slots.header || props.title || slots.description || props.description" :class="style.header({ class: props.ui?.header })">
        <slot name="header">
          <h2 v-if="slots.title || props.title" :class="style.title({ class: props.ui?.title })">
            <slot name="title">
              {{ props.title }}
            </slot>
          </h2>
          <p v-if="slots.description || props.description" :class="style.description({ class: props.ui?.description })">
            <slot name="description">
              {{ props.description }}
            </slot>
          </p>
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
