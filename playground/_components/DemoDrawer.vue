<script setup lang="ts">
import { Button, Drawer } from '@byyuurin/ui'
</script>

<template>
  <DemoBlock title="Drawer">
    <div>
      <Drawer>
        <Button label="Open" />

        <template #content>
          <p class="m-4 p-4 pb-1/10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, nam accusantium quas, rem ipsa eveniet autem quasi, odio dolorem a dolorum! Nesciunt sequi deleniti reiciendis dolore distinctio debitis in inventore!
          </p>
        </template>
      </Drawer>
    </div>
  </DemoBlock>
</template>
