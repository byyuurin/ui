<script setup lang="ts">
import { Button as UButton, Popover as UPopover } from '@byyuurin/ui'
</script>

<template>
  <DemoBlock title="Popover">
    <div class="flex max-w-screen-sm gap-4">
      <UPopover arrow>
        <UButton label="Click" />

        <template #content>
          <p class="p-4 max-w-100">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque repellat iste, odio molestiae aut ad aliquid voluptatem esse, possimus in dicta perferendis debitis laborum eius tempore nulla magnam adipisci neque.
          </p>
        </template>
      </UPopover>
      <UPopover mode="hover" :content="{ side: 'right' }" arrow>
        <UButton label="Hover" />

        <template #content>
          <p class="p-4 max-w-100">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque repellat iste, odio molestiae aut ad aliquid voluptatem esse, possimus in dicta perferendis debitis laborum eius tempore nulla magnam adipisci neque.
          </p>
        </template>
      </UPopover>
    </div>
  </DemoBlock>
</template>
