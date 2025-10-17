<script lang="ts" setup>
import type { ModalProps } from '@byyuurin/ui'
import Button from '@byyuurin/ui/components/Button.vue'
import Modal from '@byyuurin/ui/components/Modal.vue'
import type { ControlItems } from './ExampleView.vue'
import Placeholder from './Placeholder.vue'

const controls: ControlItems<ModalProps> = [
  { prop: 'title', value: 'Title', placeholder: 'No Title' },
  { prop: 'description', value: 'description', placeholder: 'No Description' },
  { prop: 'fullscreen', value: false, description: 'When `true`, the modal will take up the full screen.' },
  { prop: 'dismissible', value: true },
  { prop: 'close', value: true },
  { prop: 'overlay', value: true },
  { prop: 'transition', value: true },
]

const overlay = useOverlay()
const instance = overlay.create(
  (props) => h(
    Modal,
    props,
    {
      body: () => h(Placeholder, {
        class: 'size-full min-h-80 min-w-80',
        label: '#body',
      }, {
        default: () => h(Button, { label: 'Close', variant: 'outline', onClick: instance.close }),
      }),
    },
  ),
  { unmountOnHide: false },
)

const open = ref(false)
const slotsExample1 = ref(false)
const slotsExample2 = ref(false)
const slotsExample3 = ref(false)

function openOverlay(props: ModalProps) {
  instance.open(props)
}
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Modal"
    description="A dialog window that can be used to display a message or request user input."
    :controls="controls"
  >
    <div class="flex flex-col gap-4">
      <div class="flex flex-wrap gap-4">
        <UModal
          v-model:open="open"
          v-bind="attrs"
          :ui="{ overlay: 'z-1', content: 'z-1' }"
        >
          <UButton>
            Open Modal
          </UButton>

          <template #body>
            <Placeholder class="w-full h-100">
              <UButton
                class="relative z-1 px-4"
                variant="outline"
                label="Close"
                round
                @click="open = false"
              />
            </Placeholder>
          </template>
        </UModal>
        <UModal
          v-model:open="slotsExample1"
          :ui="{ overlay: 'z-1', content: 'z-1' }"
          v-bind="attrs"
        >
          <UButton>
            Slots example 1
          </UButton>

          <template #close>
            <Placeholder label="#close" />
          </template>

          <template #title>
            <Placeholder label="#title" label-position="left" />
          </template>

          <template #description>
            <Placeholder label="#description" label-position="left" />
          </template>

          <template #body>
            <Placeholder class="w-full h-100">
              <div class="inline-flex items-center gap-4 flex-col">
                <span>#body</span>
                <UButton
                  class="relative z-1 px-4"
                  variant="outline"
                  label="Close"
                  round
                  @click="slotsExample1 = false"
                />
              </div>
            </Placeholder>
          </template>
          <template #footer>
            <Placeholder label="#footer" class="flex-grow h-8" />
          </template>
        </UModal>
        <UModal
          v-model:open="slotsExample2"
          :ui="{ overlay: 'z-1', content: 'z-1' }"
          v-bind="attrs"
        >
          <UButton>
            Slots example 2
          </UButton>

          <template #header>
            <Placeholder class="h-8" label="#header" />
          </template>

          <template #body>
            <Placeholder class="w-full h-100">
              <div class="inline-flex items-center gap-4 flex-col">
                <span>#body</span>
                <UButton
                  class="relative z-1 px-4"
                  variant="outline"
                  label="Close"
                  round
                  @click="slotsExample2 = false"
                />
              </div>
            </Placeholder>
          </template>
          <template #footer>
            <Placeholder label="#footer" class="h-8" />
          </template>
        </UModal>
        <UModal
          v-model:open="slotsExample3"
          :ui="{ overlay: 'z-1', content: 'z-1' }"
          v-bind="attrs"
        >
          <UButton>
            Slots example 3
          </UButton>

          <template #content>
            <Placeholder class="w-full h-100">
              <div class="inline-flex items-center gap-4 flex-col">
                <span>#content</span>
                <UButton
                  class="relative z-1 px-4"
                  variant="outline"
                  label="Close"
                  round
                  @click="slotsExample3 = false"
                />
              </div>
            </Placeholder>
          </template>
        </UModal>
      </div>
      <div class="flex flex-wrap gap-4">
        <UButton label="useOverlay" @click="openOverlay(attrs)" />
      </div>
    </div>
  </ExampleView>
</template>
