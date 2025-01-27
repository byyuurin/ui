<script lang="ts" setup>
import type { ModalProps } from '@byyuurin/ui'
import { Button, Modal } from '@byyuurin/ui'
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

const demo1 = ref(false)
const demo2 = ref(false)
const demo3 = ref(false)
const demo4 = ref(false)
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Modal"
    description="A dialog window that can be used to display a message or request user input."
    :controls="controls"
  >
    <div class="flex gap-4">
      <Modal
        v-model:open="demo1"
        v-bind="attrs"
        :ui="{ overlay: 'z-1', content: 'z-1' }"
      >
        <Button>
          Open
        </Button>

        <template #body>
          <Placeholder class="w-full h-full min-h-32">
            <Button
              v-show="(!attrs.dismissible && !attrs.close) || (attrs.size === 'fullscreen' && !attrs.close)"
              class="relative z-1 px-4"
              variant="outline"
              label="Close"
              round
              @click="demo1 = false"
            />
          </Placeholder>
        </template>
      </Modal>
      <Modal
        v-model:open="demo2"
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
          <Placeholder class="w-full h-full min-h-32">
            <div class="inline-flex items-center gap-4 flex-col">
              <span>#body</span>
              <Button
                v-show="(!attrs.dismissible && !attrs.close) || (attrs.size === 'fullscreen' && !attrs.close)"
                class="relative z-1 px-4"
                variant="outline"
                label="Close"
                round
                @click="demo2 = false"
              />
            </div>
          </Placeholder>
        </template>
        <template #footer>
          <Placeholder label="#footer" class="flex-grow h-8" />
        </template>
      </Modal>
      <Modal
        v-model:open="demo3"
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
          <Placeholder class="w-full h-full min-h-32">
            <div class="inline-flex items-center gap-4 flex-col">
              <span>#body</span>
              <Button
                v-show="!attrs.dismissible || attrs.size === 'fullscreen'"
                class="relative z-1 px-4"
                variant="outline"
                label="Close"
                round
                @click="demo3 = false"
              />
            </div>
          </Placeholder>
        </template>
        <template #footer>
          <Placeholder label="#footer" class="h-8" />
        </template>
      </Modal>
      <Modal
        v-model:open="demo4"
        :ui="{ overlay: 'z-1', content: 'z-1' }"
        v-bind="attrs"
      >
        <Button>
          Slots example 3
        </Button>

        <template #content>
          <Placeholder class="w-full h-full min-h-64">
            <div class="inline-flex items-center gap-4 flex-col">
              <span>#content</span>
              <Button
                v-show="!attrs.dismissible || attrs.size === 'fullscreen'"
                class="relative z-1 px-4"
                variant="outline"
                label="Close"
                round
                @click="demo4 = false"
              />
            </div>
          </Placeholder>
        </template>
      </Modal>
    </div>
  </ExampleView>
</template>
