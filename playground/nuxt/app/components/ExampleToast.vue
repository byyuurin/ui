<script setup lang="ts">
import type { ToastProps, ToastProviderProps, ToastState } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

interface Props {
  color?: string
  duration?: ToastProviderProps['duration']
  position?: ToastProviderProps['position']
  expand?: ToastProviderProps['expand']
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

type ControlInfo = ToastProps & Pick<ToastProviderProps, 'position' | 'duration' | 'expand'> & Pick<ToastState, 'onClick'>

const controls: ControlItems<ControlInfo> = [
  { prop: 'position', label: 'Toaster.position', value: 'bottom-right', options: ['bottom-center', 'bottom-left', 'bottom-right', 'top-center', 'top-left', 'top-right'] },
  { prop: 'duration', label: 'Toaster.duration', value: 5000, options: [{ label: 'always', value: 0 }, { label: '5s', value: 5000 }, { label: '10s', value: 10000 }, { label: '30s', value: 30000 }] },
  { prop: 'expand', label: 'Toaster.expand', value: true },
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
    <div class="flex flex-wrap gap-4">
      <UButton v-for="(_, i) in examples" :key="i" :label="`Example ${i + 1}`" @click="addToast(attrs, i)" />
    </div>
  </ExampleView>
</template>
