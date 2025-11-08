<script lang="ts" setup>
import type { ButtonProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const icon = 'i-lucide:paperclip'

const controls: ControlItems<ButtonProps> = [
  { prop: 'color', value: 'primary', options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] },
  { prop: 'variant', value: 'solid', options: ['solid', 'outline', 'soft', 'subtle', 'ghost', 'link'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'label', value: '', placeholder: 'Text' },
  { prop: 'href', value: '' },
  { prop: 'target', value: null, options: [{ label: 'none', value: null }, '_blank', '_parent', '_self', '_top'] },
  { prop: 'active', value: false },
  { prop: 'disabled', value: false },
  { prop: 'loading', value: false },
]

function toBindProps(attrs: ButtonProps) {
  const cloned = { ...attrs }

  try {
    if (!/^https?:\/\/.+$/.test(cloned.href as string))
      throw new Error('Invalid URL')
  }
  catch {
    cloned.href = undefined
  }

  return cloned
}
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Button"
    description="A button element that can act as a link or trigger an action."
    :controls="controls"
  >
    <div class="flex flex-wrap items-start gap-4">
      <UButton v-bind="toBindProps(attrs)" label="" :icon="icon" />
      <UButton v-bind="toBindProps(attrs)" :label="attrs.label || 'Text only'" />
      <UButton v-bind="toBindProps(attrs)" :label="attrs.label || 'Text with leadingIcon'" :leading-icon="icon" />
      <UButton v-bind="toBindProps(attrs)" :label="attrs.label || 'Text with icon'" :trailing-icon="icon" />
      <UButton v-bind="toBindProps(attrs)" :label="attrs.label || 'Text with avatar'" :avatar="{ src: 'https://i.pravatar.cc/100?img=3' }" />
    </div>
    <div class="py-4">
      <UButton v-bind="toBindProps(attrs)" :label="attrs.label || 'Text'">
        <template #leading>
          <Placeholder label="#leading" />
        </template>

        <template #default>
          <Placeholder label="#default" />
        </template>

        <template #trailing>
          <Placeholder label="#trailing" />
        </template>
      </UButton>
    </div>
  </ExampleView>
</template>
