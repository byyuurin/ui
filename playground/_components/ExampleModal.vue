<script lang="ts" setup>
import type { ModalProps } from '@byyuurin/ui'
import { Button, Modal, useModal } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<ModalProps> = [
  { prop: 'title', value: 'Title' },
  { prop: 'description', value: 'description' },
  { prop: 'size', value: 'sm', options: ['sm', 'md', 'lg', 'xl', 'fullscreen'] },
  { prop: 'dismissible', value: true },
  { prop: 'close', value: true },
  { prop: 'blur', value: false },
  { prop: 'overlay', value: true },
  { prop: 'transition', value: true },
]

const modal = useModal()

const open = ref(false)
const slotsExample1 = ref(false)
const slotsExample2 = ref(false)
const slotsExample3 = ref(false)

function openModal() {
  modal.open(Modal, {
    title: 'Modal Title',
    description: 'Modal Description',
  })
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
        <Modal
          v-model:open="open"
          v-bind="attrs"
          :ui="{ overlay: 'z-1', content: 'z-1' }"
        >
          <Button>
            Open Modal
          </Button>

          <template #body>
            <Placeholder class="w-full h-100">
              <Button
                class="relative z-1 px-4"
                variant="outline"
                label="Close"
                round
                @click="open = false"
              />
            </Placeholder>
          </template>
        </Modal>
        <Modal
          v-model:open="slotsExample1"
          :ui="{ overlay: 'z-1', content: 'z-1' }"
          v-bind="attrs"
        >
          <Button>
            Slots example 1
          </Button>

          <template #close>
            <Placeholder label="#close" />
          </template>

          <template #title>
            <Placeholder label="#title" label-position="left" />
          </template>

          <template #description>
            <Placeholder class="h-8" label="#description" label-position="left" />
          </template>

          <template #body>
            <Placeholder class="w-full h-100">
              <div class="inline-flex items-center gap-4 flex-col">
                <span>#body</span>
                <Button
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
        </Modal>
        <Modal
          v-model:open="slotsExample2"
          :ui="{ overlay: 'z-1', content: 'z-1' }"
          v-bind="attrs"
        >
          <Button>
            Slots example 2
          </Button>

          <template #header>
            <Placeholder class="h-8" label="#header" />
          </template>

          <template #body>
            <Placeholder class="w-full h-100">
              <div class="inline-flex items-center gap-4 flex-col">
                <span>#body</span>
                <Button
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
        </Modal>
        <Modal
          v-model:open="slotsExample3"
          :ui="{ overlay: 'z-1', content: 'z-1' }"
          v-bind="attrs"
        >
          <Button>
            Slots example 3
          </Button>

          <template #content>
            <Placeholder class="w-full h-100">
              <div class="inline-flex items-center gap-4 flex-col">
                <span>#content</span>
                <Button
                  class="relative z-1 px-4"
                  variant="outline"
                  label="Close"
                  round
                  @click="slotsExample3 = false"
                />
              </div>
            </Placeholder>
          </template>
        </Modal>
      </div>
      <div class="flex flex-wrap gap-4">
        <Button label="Use `useModal`" @click="openModal" />
      </div>
    </div>
  </ExampleView>
</template>
