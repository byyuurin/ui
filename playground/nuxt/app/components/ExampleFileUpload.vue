<script setup lang="ts">
import type { FileUploadProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<FileUploadProps<boolean>> = [
  { prop: 'color', value: 'primary', options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] },
  { prop: 'variant', value: 'area', options: ['area', 'button'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'layout', value: 'grid', options: ['grid', 'list'] },
  { prop: 'position', value: 'outside', options: ['inside', 'outside'] },
  { prop: 'accept', value: '', type: 'string', placeholder: '*' },
  { prop: 'label', value: '' },
  { prop: 'description', value: '' },
  { prop: 'multiple', value: false },
  { prop: 'dropzone', value: true },
  { prop: 'interactive', value: true },
  { prop: 'preview', value: true },
]

const files = shallowRef<File[] | null>()

const modelValue = computed(() => (multiple = false) => multiple ? files.value : files.value?.[0])

function onUpdate(value: File | File[] | null | undefined, multiple = false) {
  const values = Array.isArray(value)
    ? value
    : value == null ? [] : [value]

  files.value = multiple ? values : values.slice(-1)
}
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="FileUpload"
    description="An input element to upload files."
    :controls="controls"
  >
    <div class="flex">
      <UFileUpload
        :class="attrs.variant === 'area' ? 'w-full min-h-48' : ''"
        v-bind="attrs"
        :model-value="modelValue(attrs.multiple)"
        @update:model-value="onUpdate($event, attrs.multiple)"
      />
    </div>
  </ExampleView>
</template>
