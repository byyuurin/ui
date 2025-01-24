<script setup lang="ts">
import { Input } from '@byyuurin/ui'
</script>

<template>
  <DemoBlock title="Input">
    <div class="flex max-w-screen-sm gap-4 items-start">
      <Input size="xs" placeholder="placeholder..." />
      <Input size="sm" placeholder="placeholder..." />
      <Input size="md" placeholder="placeholder..." />
      <Input size="lg" placeholder="placeholder..." />
      <Input size="xl" placeholder="placeholder..." />
    </div>
    <div class="flex max-w-screen-sm gap-4 items-start">
      <Input variant="outline" placeholder="placeholder..." />
      <Input variant="soft" placeholder="placeholder..." />
      <Input variant="ghost" placeholder="placeholder..." />
      <Input variant="none" placeholder="placeholder..." />
    </div>
  </DemoBlock>
</template>
