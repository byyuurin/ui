<script setup lang="ts">
import type { DrawerProps } from '@byyuurin/ui'
import { Button, Drawer } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'
import Placeholder from './Placeholder.vue'

const open = ref(false)

const controls: ControlItems<DrawerProps> = [
  { prop: 'direction', value: 'bottom', options: ['top', 'bottom', 'left', 'right'] },
  { prop: 'dismissible', value: true },
  { prop: 'handle', value: true },
  { prop: 'blur', value: false },
  { prop: 'full', value: false },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Drawer"
    description="A drawer that smoothly slides in & out of the screen."
    :controls="controls"
  >
    <Drawer v-bind="attrs" v-model:open="open">
      <Button label="Open Drawer" />

      <template #content>
        <div class="overflow-auto">
          <div class="flex h-full justify-between flex-col gap-4 mx-auto p-4">
            <Placeholder :class="['top', 'bottom'].includes(attrs.direction!) ? 'w-full h-xl' : 'w-xl h-full'">
              <Button v-show="!attrs.dismissible" class="relative z-1 px-4" variant="outline" label="Close" round @click="open = false" />
            </Placeholder>
          </div>
        </div>
      </template>
    </Drawer>
  </ExampleView>
</template>
