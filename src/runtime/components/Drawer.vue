<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { DialogContentEmits, DialogContentProps, DialogRootEmits, DialogRootProps } from 'reka-ui'
import theme from '#build/ui/drawer'
import type { ButtonProps, ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'
import type { EmitsToProps } from '../types/utils'

export interface DrawerEmits extends DialogRootEmits {
  'after-leave': []
}

export interface DrawerSlots {
  default?: any
  content?: any
  header?: any
  title?: any
  description?: any
  close?: (props: { ui?: ComponentUIProps<typeof theme> }) => any
  body?: any
  footer?: any
}

type ThemeVariants = VariantProps<typeof theme>

export interface DrawerProps extends ComponentBaseProps, DialogRootProps {
  title?: string
  description?: string
  /** The content of the drawer. */
  content?: Omit<DialogContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<DialogContentEmits>>
  /**
   * Render an overlay behind the drawer.
   * @default true
   */
  overlay?: boolean
  /** @default true */
  transition?: boolean
  /**
   * The direction of the drawer.
   * @default "bottom"
   */
  direction?: ThemeVariants['direction']
  /**
   * Whether to inset the drawer from the edges.
   */
  inset?: boolean
  /**
   * Render the drawer in a portal.
   * @default true
   */
  portal?: boolean
  /**
   * Display a close button to dismiss the drawer.
   * @default true
   */
  close?: ButtonProps | boolean
  /** @default app.icons.close */
  closeIcon?: string
  /**
   * When `false`, the drawer will not close when clicking outside or pressing escape.
   * @default true
   */
  dismissible?: boolean
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger, useForwardPropsEmits, VisuallyHidden } from 'reka-ui'
import { computed, toRef } from 'vue'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { cv, merge } from '../utils/style'
import Button from './Button.vue'

const props = withDefaults(defineProps<DrawerProps>(), {
  direction: 'bottom',
  modal: true,
  portal: true,
  overlay: true,
  transition: true,
  dismissible: true,
  close: true,
})
const emit = defineEmits<DrawerEmits>()
const slots = defineSlots<DrawerSlots>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'open', 'defaultOpen', 'modal'), emit)
const contentProps = toRef(() => ({
  ...props.content,
  ...(slots.content || slots.header || (!props.description && !slots.description)) ? { 'aria-describedby': undefined } : {},
}))
const contentEvents = computed(() => {
  if (props.dismissible)
    return {}

  return {
    pointerDownOutside: (e: Event) => e.preventDefault(),
    interactOutside: (e: Event) => e.preventDefault(),
    escapeKeyDown: (e: Event) => e.preventDefault(),
  }
})

const { t } = useLocale()

const appConfig = useAppConfig() as RuntimeAppConfig
const style = computed(() => {
  const ui = cv(merge(theme, appConfig.ui.drawer))
  return ui(props)
})
</script>

<template>
  <DialogRoot v-slot="{ open }" v-bind="rootProps">
    <DialogTrigger v-if="slots.default" as-child :class="props.class">
      <slot :open="open"></slot>
    </DialogTrigger>

    <DialogPortal :disabled="!props.portal">
      <DialogOverlay v-if="props.overlay" :class="style.overlay({ class: props.ui?.overlay })" data-part="overlay" />

      <DialogContent
        :class="style.content({ class: [!slots.default && props.class, props.ui?.content] })"
        :data-direction="props.direction"
        data-part="content"
        v-bind="contentProps"
        v-on="contentEvents"
        @after-leave="emit('after-leave')"
      >
        <VisuallyHidden v-if="slots.content || slots.header || (!props.title && !slots.title)">
          <DialogTitle />
        </VisuallyHidden>

        <slot name="content">
          <div :class="style.container({ class: props.ui?.container })" data-part="container">
            <div
              v-if="slots.header || props.title || slots.title || props.description || slots.description || props.close || slots.close"
              :class="style.header({ class: props.ui?.header })"
              data-part="header"
            >
              <slot name="header">
                <DialogTitle
                  v-if="props.title || slots.title"
                  :class="style.title({ class: props.ui?.title })"
                  data-part="title"
                >
                  <slot name="title">
                    {{ props.title }}
                  </slot>
                </DialogTitle>

                <DialogClose v-if="props.close || slots.close" as-child>
                  <slot name="close" :ui="props.ui">
                    <Button
                      variant="ghost"
                      :icon="props.closeIcon || appConfig.ui.icons.close"
                      v-bind="typeof props.close === 'boolean' ? {} : props.close"
                      :aria-label="t('modal.close')"
                      :class="style.close({ class: props.ui?.close })"
                      data-part="close"
                    />
                  </slot>
                </DialogClose>

                <DialogDescription
                  v-if="props.description || slots.description"
                  :class="style.description({ class: props.ui?.description })"
                  data-part="description"
                >
                  <slot name="description">
                    {{ props.description }}
                  </slot>
                </DialogDescription>
              </slot>
            </div>

            <div v-if="slots.body" :class="style.body({ class: props.ui?.body })" data-part="body">
              <slot name="body"></slot>
            </div>

            <div v-if="slots.footer" :class="style.footer({ class: props.ui?.footer })" data-part="footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </slot>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
