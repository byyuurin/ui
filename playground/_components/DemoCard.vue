<script setup lang="ts">
import { Card } from '@byyuurin/ui'
</script>

<template>
  <DemoBlock title="Card">
    <div class="max-w-xl">
      <Card>
        <template #header>
          #header
        </template>
        #default
        <template #footer>
          #footer
        </template>
      </Card>
    </div>
  </DemoBlock>
</template>
