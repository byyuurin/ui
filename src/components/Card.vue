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

const props = withDefaults(defineProps<CardProps>(), {})
const slots = defineSlots<CardSlots>()

const { theme, createStyler } = useTheme()
const style = computed(() => {
  const styler = createStyler(theme.value.card)
  return styler(props)
})
</script>

<template>
  <Primitive :as="props.as" :class="style.root({ class: [props.class, props.ui?.root] })">
    <slot name="content">
      <div
        v-if="slots.header || slots.title || props.title || slots.description || props.description"
        :class="style.header({ class: props.ui?.header })"
      >
        <slot name="header">
          <Primitive
            v-if="slots.title || props.title"
            :as="slots.title ? undefined : 'h2'"
            :class="style.title({ class: props.ui?.title })"
          >
            <slot name="title">
              {{ props.title }}
            </slot>
          </Primitive>
          <Primitive
            v-if="slots.description || props.description"
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
