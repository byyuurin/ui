<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import { card } from '../theme'
import type { ComponentAttrs } from '../types'

export interface CardProps extends ComponentAttrs<typeof card> {
  as?: PrimitiveProps['as']
}

export interface CardSlots {
  header?: (props?: {}) => any
  default?: (props?: {}) => any
  footer?: (props?: {}) => any
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { createStyler } from '../internal'

const props = withDefaults(defineProps<CardProps>(), {})
const slots = defineSlots<CardSlots>()

const style = computed(() => {
  const styler = createStyler(card)
  return styler(props)
})
</script>

<template>
  <Primitive :as="props.as" :class="style.root({ class: [props.class, props.ui?.root] })">
    <div v-if="slots.header" :class="style.header({ class: props.ui?.header })">
      <slot name="header"></slot>
    </div>

    <div v-if="slots.default" :class="style.body({ class: props.ui?.body })">
      <slot></slot>
    </div>

    <div v-if="slots.footer" :class="style.footer({ class: props.ui?.footer })">
      <slot name="footer"></slot>
    </div>
  </Primitive>
</template>
