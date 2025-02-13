<script setup lang="ts">
import type { ToasterProps, ToastProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

interface Props extends Pick<ToasterProps, 'duration' | 'position' | 'expand'> {
  color?: string
  expand?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  duration: 5000,
  position: 'bottom-right',
  expand: true,
})

const emit = defineEmits<{
  (event: 'update:duration', value: Props['duration']): void
  (event: 'update:position', value: Props['position']): void
  (event: 'update:expand', value: Props['expand']): void
}>()

type ControlInfo = ToastProps & Pick<ToasterProps, 'position' | 'duration' | 'expand'>

const controls: ControlItems<ControlInfo> = [
  { prop: 'position', value: 'bottom-right', options: ['bottom-center', 'bottom-left', 'bottom-right', 'top-center', 'top-left', 'top-right'] },
  { prop: 'duration', value: 5000, options: [{ label: 'always', value: 0 }, { label: '5s', value: 5000 }, { label: '10s', value: 10000 }, { label: '30s', value: 30000 }] },
  { prop: 'expand', value: true },
  { prop: 'title', value: '', placeholder: 'Title' },
  { prop: 'description', value: '', placeholder: 'Description' },
]

const toast = useToast()

function addToast({ title, description }: ControlInfo) {
  toast.add({
    title: title || 'Title',
    description: description || 'Description',
    icon: 'animate-head-shake animate-count-infinite i-carbon-notification',
    actions: [
      { class: 'min-w-20 justify-center', label: 'YES' },
      { class: 'min-w-20 justify-center', label: 'NO', variant: 'outline' },
    ],
    ui: { progress: props.color },
  })
}

function handleUpdateToaster({ position, duration, expand }: ControlInfo) {
  if (props.position !== position)
    emit('update:position', position)

  if (props.duration !== duration)
    emit('update:duration', duration)

  if (props.expand !== expand)
    emit('update:expand', expand)
}
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Toast"
    description="A succinct message to provide information or feedback to the user."
    :controls="controls"
    @change="handleUpdateToaster"
  >
    <UButton label="Add Toast" @click="addToast(attrs)" />
  </ExampleView>
</template>
