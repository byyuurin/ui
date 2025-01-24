<script lang="ts">
import type { DialogContentProps, PrimitiveProps } from 'reka-ui'
import type { DrawerRootEmits, DrawerRootProps } from 'vaul-vue'
import type { drawer } from '../theme'
import type { ComponentAttrs } from '../types'

export interface DrawerProps extends ComponentAttrs<typeof drawer>, Pick<DrawerRootProps, 'activeSnapPoint' | 'closeThreshold' | 'defaultOpen' | 'direction' | 'fadeFromIndex' | 'fixed' | 'modal' | 'nested' | 'direction' | 'open' | 'scrollLockTimeout' | 'shouldScaleBackground' | 'snapPoints'> {
  as?: PrimitiveProps['as']
  title?: string
  description?: string
  /** The content of the drawer. */
  content?: Omit<DialogContentProps, 'as' | 'asChild' | 'forceMount'>
  /**
   * Render an overlay behind the drawer.
   * @default true
   */
  overlay?: boolean
  /**
   * Render a handle on the drawer.
   * @default true
   */
  handle?: boolean
  /**
   * Render the drawer in a portal.
   * @default true
   */
  portal?: boolean
  /**
   * When `false`, the drawer will not close when clicking outside or pressing escape.
   * @default true
   */
  dismissible?: boolean
}

export interface DrawerEmits extends DrawerRootEmits {}

export interface DrawerSlots {
  default?: (props?: {}) => any
  handle?: (props?: {}) => any
  content?: (props?: {}) => any
  header?: (props?: {}) => any
  title?: (props?: {}) => any
  description?: (props?: {}) => any
  body?: (props?: {}) => any
  footer?: (props?: {}) => any
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { useForwardPropsEmits } from 'reka-ui'
import { DrawerContent, DrawerDescription, DrawerOverlay, DrawerPortal, DrawerRoot, DrawerTitle, DrawerTrigger } from 'vaul-vue'
import { computed, toRef } from 'vue'
import { useTheme } from '../composables'
import { createStyler } from '../internal'

const props = withDefaults(defineProps<DrawerProps>(), {
  direction: 'bottom',
  portal: true,
  overlay: true,
  handle: true,
})
const emit = defineEmits<DrawerEmits>()
const slots = defineSlots<DrawerSlots>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'activeSnapPoint', 'closeThreshold', 'defaultOpen', 'dismissible', 'fadeFromIndex', 'fixed', 'modal', 'nested', 'direction', 'open', 'scrollLockTimeout', 'shouldScaleBackground', 'snapPoints'), emit)
const contentProps = toRef(() => props.content)

const theme = useTheme()
const style = computed(() => {
  const styler = createStyler(theme.value.drawer)
  return styler(props)
})
</script>

<template>
  <DrawerRoot v-bind="rootProps">
    <DrawerTrigger v-if="slots.default" as-child :class="props.class">
      <slot></slot>
    </DrawerTrigger>

    <DrawerPortal :disabled="!portal">
      <DrawerOverlay v-if="overlay" :class="style.overlay({ class: props.ui?.overlay })" />

      <DrawerContent
        :class="style.content({ class: [!slots.default && props.class, props.ui?.content] })"
        v-bind="contentProps"
      >
        <slot name="handle">
          <div v-if="handle" :class="style.handle({ class: props.ui?.handle })"></div>
        </slot>

        <slot name="content">
          <div :class="style.container({ class: props.ui?.container })">
            <div
              v-if="slots.header || (title || slots.title) || (description || slots.description)"
              :class="style.header({ class: props.ui?.header })"
            >
              <slot name="header">
                <DrawerTitle
                  v-if="title || slots.title"
                  :class="style.title({ class: props.ui?.title })"
                >
                  <slot name="title">
                    {{ title }}
                  </slot>
                </DrawerTitle>

                <DrawerDescription
                  v-if="description || slots.description"
                  :class="style.description({ class: props.ui?.description })"
                >
                  <slot name="description">
                    {{ description }}
                  </slot>
                </DrawerDescription>
              </slot>
            </div>

            <div v-if="slots.body" :class="style.body({ class: props.ui?.body })">
              <slot name="body"></slot>
            </div>

            <div v-if="slots.footer" :class="style.footer({ class: props.ui?.footer })">
              <slot name="footer"></slot>
            </div>
          </div>
        </slot>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>
