<script lang="ts">
import { Card as UCard } from '@byyuurin/ui'
</script>

<script setup lang="ts">
</script>

<template>
  <DemoBlock title="Card">
    <div class="max-w-screen-sm">
      <UCard>
        <template #header>
          #header
        </template>
        #default
        <template #footer>
          #footer
        </template>
      </UCard>
    </div>
  </DemoBlock>
</template>
