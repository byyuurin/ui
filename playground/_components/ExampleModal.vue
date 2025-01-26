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
</script>

<template>
  <ExampleView v-slot="attrs" title="Modal" :controls="controls">
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
              v-show="!attrs.dismissible && !attrs.close"
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
          Slots
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
                v-show="!attrs.dismissible"
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
    </div>
  </ExampleView>
</template>
