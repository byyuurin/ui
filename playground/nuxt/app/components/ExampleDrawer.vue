<script setup lang="ts">
import type { DrawerProps } from '@byyuurin/ui'
import { Button, Drawer } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'
import Placeholder from './Placeholder.vue'

const overlay = useOverlay()
const instance = overlay.create(
  (props) => h(
    Drawer,
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

const controls: ControlItems<DrawerProps> = [
  { prop: 'title', value: 'Title', placeholder: 'No Title' },
  { prop: 'description', value: 'Description', placeholder: 'No Description' },
  { prop: 'direction', value: 'bottom', options: ['top', 'bottom', 'left', 'right'] },
  { prop: 'dismissible', value: true },
  { prop: 'close', value: true },
  { prop: 'overlay', value: true, description: 'Render an overlay behind the drawer.' },
  { prop: 'inset', value: false, description: 'Whether to inset the drawer from the edges.' },
  { prop: 'transition', value: true },
]

function openOverlay(props: DrawerProps) {
  instance.open(props)
}
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Drawer"
    description="A drawer that smoothly slides in & out of the screen."
    :controls="controls"
  >
    <div class="flex flex-col gap-4">
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

          <template #close>
            <Placeholder label="#close" label-position="left" />
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
      <div class="flex flex-wrap gap-4">
        <UButton label="useOverlay" @click="openOverlay(attrs)" />
      </div>
    </div>
  </ExampleView>
</template>
