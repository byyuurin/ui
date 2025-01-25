<script setup lang="ts">
import type { DrawerProps } from '@byyuurin/ui'
import { Button, Drawer } from '@byyuurin/ui'

const open = ref(false)

const drawerProps = reactive<Pick<DrawerProps, 'open' | 'direction' | 'handle' | 'dismissible' | 'blur' | 'full'>>({
  direction: 'bottom',
  dismissible: true,
  handle: true,
  blur: false,
  full: false,
})

const directionOptions: Array<DrawerProps['direction']> = ['top', 'bottom', 'left', 'right']
</script>

<template>
  <DemoBlock title="Drawer">
    <div>
      <div class="color-ui-base grid sm:grid-cols-[auto_1fr] items-center gap-2 py-4 gap-x-4 children:max-w-35">
        <label class="opacity-80">direction:</label>
        <select v-model="drawerProps.direction" class="p-1 bg-ui-base/10">
          <option v-for="option in directionOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <label class="opacity-80">dismissible:</label>
        <input v-model="drawerProps.dismissible" type="checkbox" class="size-5" />
        <label class="opacity-80">handle:</label>
        <input v-model="drawerProps.handle" type="checkbox" class="size-5" />
        <label class="opacity-80">blur:</label>
        <input v-model="drawerProps.blur" type="checkbox" class="size-5" />
        <label class="opacity-80">full:</label>
        <input v-model="drawerProps.full" type="checkbox" class="size-5" />
      </div>
      <Drawer v-model:open="open" v-bind="drawerProps" :ui="{ overlay: 'z-1', content: 'z-1' }">
        <Button label="Open" />

        <template #content>
          <div class="overflow-auto">
            <div class="flex h-full justify-between flex-col gap-4 mx-auto p-4 max-w-screen-sm">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, nam accusantium quas, rem ipsa eveniet autem quasi, odio dolorem a dolorum! Nesciunt sequi deleniti reiciendis dolore distinctio debitis in inventore!
              </p>
              <Button class="justify-center" label="Close" @click="open = false" />
            </div>
          </div>
        </template>
      </Drawer>
    </div>
  </DemoBlock>
</template>
