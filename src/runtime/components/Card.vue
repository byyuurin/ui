<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/card'
import type { ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'
import type { StaticSlot } from '../types/utils'

type ThemeVariants = VariantProps<typeof theme>

export interface CardProps extends ComponentBaseProps {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  /** @default "outline" */
  variant?: ThemeVariants['variant']
  title?: string
  description?: string
  ui?: ComponentUIProps<typeof theme>
}

export interface CardSlots {
  default: StaticSlot
  content: StaticSlot
  header: StaticSlot
  title: StaticSlot
  description: StaticSlot
  footer: StaticSlot
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { cv, merge } from '../utils/style'

const props = defineProps<CardProps>()
const slots = defineSlots<CardSlots>()

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.card))
  return styler(props)
})
</script>

<template>
  <Primitive :as="props.as" :class="ui.root({ class: [props.class, props.ui?.root] })" data-part="root">
    <slot name="content">
      <div
        v-if="slots.header || props.title || slots.title || props.description || slots.description "
        :class="ui.header({ class: props.ui?.header })"
        data-part="header"
      >
        <slot name="header">
          <Primitive
            v-if="props.title || slots.title"
            :as="!!slots.title ? undefined : 'h2'"
            :class="ui.title({ class: props.ui?.title })"
            data-part="title"
          >
            <slot name="title">
              {{ props.title }}
            </slot>
          </Primitive>
          <Primitive
            v-if="props.description || slots.description"
            :as="!!slots.description ? undefined : 'p'"
            :as-child="!!slots.description"
            :class="ui.description({ class: props.ui?.description })"
            data-part="description"
          >
            <slot name="description">
              {{ props.description }}
            </slot>
          </Primitive>
        </slot>
      </div>

      <div v-if="!!slots.default" :class="ui.body({ class: props.ui?.body })" data-part="body">
        <slot></slot>
      </div>

      <div v-if="!!slots.footer" :class="ui.footer({ class: props.ui?.footer })" data-part="footer">
        <slot name="footer"></slot>
      </div>
    </slot>
  </Primitive>
</template>
