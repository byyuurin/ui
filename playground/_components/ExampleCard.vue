<script setup lang="ts">
import { Card } from '@byyuurin/ui'
</script>

<template>
  <ExampleView title="Card">
    <Card>
      <template #header>
        <Placeholder class="h-8" label="#header" />
      </template>
      <Placeholder class="h-32" />
      <template #footer>
        <Placeholder class="h-8" label="#footer" />
      </template>
    </Card>
  </ExampleView>
</template>
