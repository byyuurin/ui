<script lang="ts">
import type { DialogContentEmits, DialogContentProps, DialogRootEmits, DialogRootProps } from 'reka-ui'
import theme from '#build/ui/modal'
import type { ButtonProps, ComponentBaseProps, ComponentStyler, ComponentUIProps, IconProps, LinkPropsKeys, RuntimeAppConfig } from '../types'
import type { EmitsToProps, StaticSlot } from '../types/utils'

export interface ModalProps extends ComponentBaseProps, DialogRootProps {
  title?: string
  description?: string
  /** The content of the modal. */
  content?: Omit<DialogContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<DialogContentEmits>>
  /**
   * Render an overlay behind the modal.
   * @default true
   */
  overlay?: boolean
  /**
   * Animate the modal when opening or closing.
   * @default true
   */
  transition?: boolean
  /**
   * When `true`, the modal will take up the full screen.
   * @default false
   */
  fullscreen?: boolean
  /**
   * Render the modal in a portal.
   * @default true
   */
  portal?: boolean | string | HTMLElement
  /**
   * Display a close button to dismiss the modal.
   * @default true
   */
  close?: boolean | Omit<ButtonProps, LinkPropsKeys>
  /** @default app.icons.close */
  closeIcon?: IconProps['name']
  /**
   * When `false`, the modal will not close when clicking outside or pressing escape.
   * @default true
   */
  dismissible?: boolean
  ui?: ComponentUIProps<typeof theme>
}

export interface ModalEmits extends DialogRootEmits {
  'after-leave': []
  'after-enter': []
  'close-prevent': []
}

export interface ModalSlots {
  default: StaticSlot<{ open: boolean }>
  content: StaticSlot<{ close: () => void }>
  header: StaticSlot<{ close: () => void }>
  title: StaticSlot
  description: StaticSlot
  close?: StaticSlot<{ close: () => void, ui: ComponentStyler<typeof theme> }>
  body: StaticSlot<{ close: () => void }>
  footer: StaticSlot<{ close: () => void }>
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger, useForwardPropsEmits, VisuallyHidden } from 'reka-ui'
import { computed, toRef } from 'vue'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { usePortal } from '../composables/usePortal'
import { pick } from '../utils'
import { cv, merge } from '../utils/style'
import Button from './Button.vue'

const props = withDefaults(defineProps<ModalProps>(), {
  modal: true,
  portal: true,
  overlay: true,
  transition: true,
  dismissible: true,
  close: true,
})
const emit = defineEmits<ModalEmits>()
const slots = defineSlots<ModalSlots>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'open', 'defaultOpen', 'modal'), emit)
const portalProps = usePortal(toRef(() => props.portal))
const contentProps = computed(() => ({
  ...props.content,
  ...(!!slots.content || !!slots.header || (!props.description && !slots.description)) ? { 'aria-describedby': undefined } : {},
}))
const contentEvents = computed(() => {
  if (props.dismissible)
    return {}

  const events = ['pointerDownOutside', 'interactOutside', 'escapeKeyDown']

  return events.reduce((acc, curr) => {
    acc[curr] = (e: Event) => {
      e.preventDefault()
      emit('close-prevent')
    }

    return acc
  }, {} as Record<typeof events[number], (e: Event) => void>)
})

const { t } = useLocale()
const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.modal))
  return styler(pick(props, ['transition', 'fullscreen', 'overlay']))
})
</script>

<template>
  <DialogRoot v-slot="{ open, close }" v-bind="rootProps">
    <DialogTrigger v-if="!!slots.default" as-child :class="props.class">
      <slot :open="open"></slot>
    </DialogTrigger>

    <DialogPortal v-bind="portalProps">
      <DialogOverlay v-if="props.overlay" data-part="overlay" :class="ui.overlay({ class: props.ui?.overlay })" />

      <DialogContent
        data-part="content"
        :class="ui.content({ class: [props.ui?.content, !slots.default && props.class] })"
        v-bind="contentProps"
        @after-enter="emit('after-enter')"
        @after-leave="emit('after-leave')"
        v-on="contentEvents"
      >
        <VisuallyHidden v-if="!!slots.content || !!slots.header || (!props.title && !slots.title)">
          <DialogTitle />
        </VisuallyHidden>

        <slot name="content" :close="close">
          <div
            v-if="slots.header || props.title || slots.title || props.description || slots.description || props.close || slots.close"
            data-part="header"
            :class="ui.header({ class: props.ui?.header })"
          >
            <slot name="header" :close="close">
              <DialogTitle
                v-if="props.title || slots.title"
                data-part="title"
                :class="ui.title({ class: props.ui?.title })"
              >
                <slot name="title">
                  {{ props.title }}
                </slot>
              </DialogTitle>

              <DialogClose v-if="props.close || slots.close" as-child>
                <slot name="close" :close="close" :ui="ui">
                  <Button
                    variant="ghost"
                    color="neutral"
                    :icon="props.closeIcon || appConfig.ui.icons.close"
                    :aria-label="t('modal.close')"
                    v-bind="typeof props.close === 'object' ? props.close : {}"
                    data-part="close"
                    :class="ui.close({ class: props.ui?.close })"
                  />
                </slot>
              </DialogClose>

              <DialogDescription
                v-if="props.description || slots.description"
                data-part="description"
                :class="ui.description({ class: props.ui?.description })"
              >
                <slot name="description">
                  {{ props.description }}
                </slot>
              </DialogDescription>
            </slot>
          </div>

          <div v-if="slots.body" data-part="body" :class="ui.body({ class: props.ui?.body })">
            <slot name="body" :close="close"></slot>
          </div>

          <div v-if="slots.footer" data-part="footer" :class="ui.footer({ class: props.ui?.footer })">
            <slot name="footer" :close="close"></slot>
          </div>
        </slot>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
