<script setup lang="ts">
import type { ToastProps, ToastProviderProps } from '@byyuurin/ui'
import type { Toast } from '@byyuurin/ui/composables/useToast.js'
import type { ControlItems } from './ExampleView.vue'

interface Props {
  color?: string
  duration?: ToastProviderProps['duration']
  position?: ToastProviderProps['position']
  expand?: ToastProviderProps['expand']
  max?: ToastProviderProps['max']
  progress?: ToastProviderProps['progress']
}

const props = withDefaults(defineProps<Props>(), {
  duration: 5000,
  position: 'bottom-right',
  expand: true,
  max: 5,
})

const emit = defineEmits<{
  (event: 'update:duration', value: Props['duration']): void
  (event: 'update:position', value: Props['position']): void
  (event: 'update:expand', value: Props['expand']): void
  (event: 'update:max', value: Props['max']): void
  (event: 'update:progress', value: Props['progress']): void
}>()

type ControlInfo = ToastProps & Pick<ToastProviderProps, 'position' | 'duration' | 'expand' | 'max' | 'progress'> & Pick<Toast, 'onClick'>

const controls: ControlItems<ControlInfo> = [
  { prop: 'position', label: 'Provider.position', value: 'bottom-right', options: ['bottom-center', 'bottom-left', 'bottom-right', 'top-center', 'top-left', 'top-right'] },
  { prop: 'duration', label: 'Provider.duration', value: 5000, options: [{ label: 'always', value: 0 }, { label: '5s', value: 5000 }, { label: '10s', value: 10000 }, { label: '30s', value: 30000 }] },
  { prop: 'max', label: 'Provider.max', value: 5 },
  { prop: 'expand', label: 'Provider.expand', value: true },
  { prop: 'progress', label: 'Provider.progress', value: true },
  { prop: 'color', value: 'primary', options: ['primary', 'secondary', 'success', 'error', 'info', 'warning', 'neutral'] },
  { prop: 'orientation', value: 'vertical', options: ['horizontal', 'vertical'] },
  { prop: 'title', value: 'Title' },
  { prop: 'description', value: 'Description' },
  { prop: 'close', value: true },
]

const toast = useToast()

const examples: ControlInfo[] = [
  {
    icon: 'i-carbon-notification',
    ui: { icon: 'animate-head-shake animate-count-infinite' },
  },
  {
    avatar: { src: 'https://i.pravatar.cc/100' },
  },
  {
    actions: [
      { class: 'min-w-20 justify-center', label: 'YES' },
      { class: 'min-w-20 justify-center', label: 'NO', variant: 'outline' },
    ],
  },
  {
    onClick: (target) => {
      if (target.id) {
        // eslint-disable-next-line no-console
        console.log('remove toast', target.id)
        toast.remove(target.id)
      }
    },
  },
]

function addToast(attrs: ControlInfo, presetIndex = 0) {
  toast.add({
    ...attrs,
    ui: { progress: props.color },
    ...examples[presetIndex],
  })
}

function handleUpdateProvider({ position, duration, expand, max, progress }: ControlInfo) {
  if (props.position !== position)
    emit('update:position', position)

  if (props.duration !== duration)
    emit('update:duration', duration)

  if (props.expand !== expand)
    emit('update:expand', expand)

  if (props.max !== max)
    emit('update:max', max)

  if (props.progress !== progress)
    emit('update:progress', progress)
}
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Toast"
    description="A succinct message to provide information or feedback to the user."
    :controls="controls"
    @change="handleUpdateProvider"
  >
    <div class="flex flex-wrap gap-4">
      <UButton v-for="(_, i) in examples" :key="i" :label="`Example ${i + 1}`" @click="addToast(attrs, i)" />
    </div>
  </ExampleView>
</template>
