<script setup lang="ts">
import { Button, Popover } from '@byyuurin/ui'
</script>

<template>
  <DemoBlock title="Popover">
    <div class="flex flex-wrap gap-4">
      <Popover arrow>
        <Button label="Click" />

        <template #content>
          <p class="p-4 max-w-100">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque repellat iste, odio molestiae aut ad aliquid voluptatem esse, possimus in dicta perferendis debitis laborum eius tempore nulla magnam adipisci neque.
          </p>
        </template>
      </Popover>
      <Popover mode="hover" :content="{ side: 'right' }" arrow>
        <Button label="Hover" />

        <template #content>
          <p class="p-4 max-w-100">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque repellat iste, odio molestiae aut ad aliquid voluptatem esse, possimus in dicta perferendis debitis laborum eius tempore nulla magnam adipisci neque.
          </p>
        </template>
      </Popover>
    </div>
  </DemoBlock>
</template>
