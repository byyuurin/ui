<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { DialogContentEmits, DialogContentProps, DialogRootEmits, DialogRootProps } from 'reka-ui'
import type { modal } from '../theme'
import type { ButtonProps, ComponentAttrs, EmitsToProps } from '../types'

export interface ModalEmits extends DialogRootEmits {
  'after-leave': []
}

export interface ModalSlots {
  default?: (props: { open: boolean }) => any
  content?: any
  header?: any
  title?: any
  description?: any
  close?: (props: { ui: ComponentAttrs<typeof modal>['ui'] }) => any
  body?: any
  footer?: any
}

type ModalVariants = VariantProps<typeof modal>

export interface ModalProps extends ComponentAttrs<typeof modal>, DialogRootProps {
  title?: string
  description?: string
  size?: ModalVariants['size']
  content?: Omit<DialogContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<DialogContentEmits>>
  /** @default true */
  portal?: boolean
  /** @default true */
  overlay?: boolean
  /** @default true */
  transition?: boolean
  /**
   * When `false`, the modal will not close when clicking outside or pressing escape.
   * @default true
   */
  dismissible?: boolean
  /**
   * Display a close button to dismiss the modal.
   * @default true
   */
  close?: ButtonProps | boolean
  /** @default app.icons.close */
  closeIcon?: string
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger, useForwardPropsEmits, VisuallyHidden } from 'reka-ui'
import { computed, toRef } from 'vue'
import { useLocale } from '../composables/useLocale'
import { useTheme } from '../composables/useTheme'
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
const { theme, generateStyle } = useTheme()
const style = computed(() => generateStyle('modal', props))
</script>

<template>
  <DialogRoot v-slot="{ open }" v-bind="rootProps">
    <DialogTrigger
      v-if="slots.default"
      :class="props.class"
      as-child
    >
      <slot :open="open"></slot>
    </DialogTrigger>
    <DialogPortal :disabled="!props.portal">
      <DialogOverlay v-if="props.overlay" :class="style.overlay({ class: props.ui?.overlay })" data-part="overlay" />

      <DialogContent :class="style.content({ class: props.ui?.content })" data-part="content" v-bind="contentProps" v-on="contentEvents" @after-leave="emit('after-leave')">
        <VisuallyHidden v-if="slots.content || slots.header || (!props.title && !slots.title)">
          <DialogTitle />
        </VisuallyHidden>

        <slot name="content">
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
                    :icon="props.closeIcon || theme.app.icons.close"
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
        </slot>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
