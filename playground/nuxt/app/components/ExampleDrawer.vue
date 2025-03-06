<script setup lang="ts">
import type { DrawerProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const open = ref(false)
const slotsExample1 = ref(false)
const slotsExample2 = ref(false)
const slotsExample3 = ref(false)

const controls: ControlItems<DrawerProps> = [
  { prop: 'title', value: 'Title', placeholder: 'No Title' },
  { prop: 'description', value: 'Description', placeholder: 'No Description' },
  { prop: 'direction', value: 'bottom', options: ['top', 'bottom', 'left', 'right'] },
  { prop: 'dismissible', value: true },
  { prop: 'overlay', value: true, description: 'Render an overlay behind the drawer.' },
  { prop: 'inset', value: false, description: 'Whether to inset the drawer from the edges.' },
  { prop: 'handle', value: true, description: 'Render a handle on the drawer.' },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Drawer"
    description="A drawer that smoothly slides in & out of the screen."
    :controls="controls"
  >
    <div class="flex flex-wrap gap-4">
      <UDrawer v-bind="attrs" v-model:open="open">
        <UButton label="Open Drawer" />

        <template #body>
          <Placeholder class="h-full" :class="['top', 'bottom'].includes(attrs.direction!) ? 'min-h-sm' : 'min-w-sm'">
            <div class="inline-flex items-center gap-4 flex-col">
              <span>#body</span>
              <UButton
                class="relative z-1 px-4"
                variant="outline"
                label="Close"
                round
                @click="open = false"
              />
            </div>
          </Placeholder>
        </template>

        <template #footer>
          <Placeholder label="#footer" />
        </template>
      </UDrawer>

      <UDrawer v-bind="attrs" v-model:open="slotsExample1">
        <UButton label="Slots example 1" />

        <template #title>
          <Placeholder label="#title" label-position="left" />
        </template>

        <template #description>
          <Placeholder label="#description" label-position="left" />
        </template>

        <template #body>
          <Placeholder class="h-full" :class="['top', 'bottom'].includes(attrs.direction!) ? 'min-h-sm' : 'min-w-sm'" label="#body">
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
          <Placeholder label="#footer" />
        </template>

        <template #handle>
          <Placeholder label="#handle" />
        </template>
      </UDrawer>

      <UDrawer v-bind="attrs" v-model:open="slotsExample2">
        <UButton label="Slots example 2" />

        <template #header>
          <Placeholder label="#header" />
        </template>

        <template #body>
          <Placeholder class="h-full" :class="['top', 'bottom'].includes(attrs.direction!) ? 'min-h-sm' : 'min-w-sm'">
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
          <Placeholder label="#footer" />
        </template>

        <template #handle>
          <Placeholder label="#handle" />
        </template>
      </UDrawer>

      <UDrawer v-bind="attrs" v-model:open="slotsExample3">
        <UButton label="Slots example 3" />

        <template #content>
          <Placeholder class="min-w-sm min-h-sm">
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

        <template #handle>
          <Placeholder label="#handle" />
        </template>
      </UDrawer>
    </div>
  </ExampleView>
</template>
