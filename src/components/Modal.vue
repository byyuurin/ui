<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { DialogContentProps, DialogRootEmits, DialogRootProps } from 'reka-ui'
import { modal } from '../theme'
import type { ComponentAttrs } from '../types'
import type { ButtonProps } from './index'

export interface ModalEmits extends DialogRootEmits {}

export interface ModalSlots {
  default?: (props: { open: boolean }) => any
  content?: (props?: any) => any
  header?: (props?: any) => any
  title?: (props?: any) => any
  description?: (props?: any) => any
  close?: (props?: any) => any
  body?: (props?: any) => any
  footer?: (props?: any) => any
}

type ModalVariants = VariantProps<typeof modal>

export interface ModalProps extends ComponentAttrs<typeof modal>, DialogRootProps {
  title?: string
  description?: string
  size?: ModalVariants['size']
  content?: Omit<DialogContentProps, 'as' | 'asChild' | 'forceMount'>
  overlay?: boolean
  transition?: boolean
  portal?: boolean
  required?: boolean
  close?: ButtonProps | boolean
  closeIcon?: string
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed, toRef } from 'vue'
import { createStyler } from '../internal'
import UButton from './Button.vue'

const props = withDefaults(defineProps<ModalProps>(), {
  size: 'md',
  portal: true,
  overlay: true,
  transition: true,
  close: true,
  closeIcon: 'i-carbon-close-large',
  modal: true,
})
const emit = defineEmits<ModalEmits>()
const slots = defineSlots<ModalSlots>()
const rootProps = useForwardPropsEmits(reactivePick(props, 'open', 'defaultOpen', 'modal'), emit)
const contentProps = toRef(() => ({
  ...props.content,
  ...(slots.description || props.description)
    ? {}
    : { 'aria-describedby': undefined },
}))
const contentEvents = computed(() => {
  if (props.required) {
    return {
      pointerDownOutside: (e: Event) => e.preventDefault(),
      interactOutside: (e: Event) => e.preventDefault(),
      escapeKeyDown: (e: Event) => e.preventDefault(),
    }
  }

  return {}
})

const style = computed(() => {
  const styler = createStyler(modal)
  return styler(props)
})
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
      <DialogOverlay v-if="props.overlay" :class="style.overlay({ class: props.ui?.overlay })" />

      <DialogContent :class="style.content({ class: props.ui?.content })" v-bind="contentProps" v-on="contentEvents">
        <slot name="content">
          <div
            v-if="slots.header || (props.title || slots.title) || (props.description || slots.description) || (props.close || slots.close)"
            :class="style.header({ class: props.ui?.header })"
          >
            <slot name="header">
              <DialogTitle
                v-if="props.title || slots.title"
                :class="style.title({ class: props.ui?.title })"
              >
                <slot name="title">
                  {{ props.title }}
                </slot>
              </DialogTitle>

              <DialogClose as-child>
                <slot name="close">
                  <UButton
                    v-if="props.close"
                    variant="ghost"
                    :icon="props.closeIcon"
                    v-bind="typeof props.close === 'boolean' ? {} : props.close"
                    :class="style.close({ class: props.ui?.close })"
                  />
                </slot>
              </DialogClose>

              <DialogDescription
                v-if="props.description || slots.description"
                :class="style.description({ class: props.ui?.description })"
              >
                <slot name="description">
                  {{ props.description }}
                </slot>
              </DialogDescription>
            </slot>
          </div>

          <div v-if="slots.body" :class="style.body({ class: props.ui?.body })">
            <slot name="body"></slot>
          </div>

          <div v-if="slots.footer" :class="style.footer({ class: props.ui?.footer })">
            <slot name="footer"></slot>
          </div>
        </slot>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
