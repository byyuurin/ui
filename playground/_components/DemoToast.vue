<script setup lang="ts">
import type { ToasterProps } from '@byyuurin/ui'
import { Button, Input, useToast } from '@byyuurin/ui'
import { computed, reactive } from 'vue'

const props = withDefaults(defineProps<{
  color?: string
  duration?: ToasterProps['duration']
  position?: ToasterProps['position']
  expand?: boolean
}>(), {
  duration: 5000,
  position: 'bottom-right',
  expand: true,
})

const emit = defineEmits<{
  (event: 'update:duration', value: ToasterProps['duration']): void
  (event: 'update:position', value: ToasterProps['position']): void
  (event: 'update:expand', value: boolean): void
}>()

const attrs = reactive({
  duration: computed({
    get: () => props.duration,
    set: (value) => emit('update:duration', value),
  }),
  position: computed({
    get: () => props.position,
    set: (value) => emit('update:position', value),
  }),
  expand: computed({
    get: () => props.expand,
    set: (value) => emit('update:expand', value),
  }),
})

const positionOptions = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const

const toast = useToast()

function showToast() {
  toast.add({
    title: 'Toast title',
    description: 'description...',
    icon: 'i-carbon-notification',
    actions: [
      { label: 'YES', class: 'min-w-20 ui-green justify-center' },
      { label: 'NO', class: 'min-w-20 ui-rose justify-center' },
    ],
    ui: { progress: props.color },
  })
}
</script>

<template>
  <DemoBlock title="Toast">
    <div>
      <div class="grid sm:grid-cols-[auto_1fr] items-center gap-2 py-4 gap-x-4 children:max-w-35">
        <label class="opacity-80">duration:</label>
        <Input v-model="attrs.duration" variant="soft" type="text" />
        <label class="opacity-80">position:</label>
        <select v-model="attrs.position" class="p-1 bg-ui-cb/5">
          <option v-for="option in positionOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <label class="opacity-80">expand:</label>
        <input v-model="attrs.expand" type="checkbox" class="size-5 accent-ui-cb" />
      </div>
      <Button label="Open" @click="showToast" />
    </div>
  </DemoBlock>
</template>
