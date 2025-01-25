<script setup lang="ts">
import { Input } from '@byyuurin/ui'
</script>

<template>
  <DemoBlock title="Input">
    <div class="flex flex-wrap gap-4 items-start children:max-w-35">
      <Input size="xs" placeholder="xs" />
      <Input size="sm" placeholder="sm" />
      <Input size="md" placeholder="md" />
      <Input size="lg" placeholder="lg" />
      <Input size="xl" placeholder="xl" />
    </div>
    <div class="flex flex-wrap gap-4 items-start children:max-w-35">
      <Input variant="outline" placeholder="outline" />
      <Input variant="soft" placeholder="soft" />
      <Input variant="ghost" placeholder="ghost" />
      <Input variant="none" placeholder="none" />
    </div>
    <div class="flex flex-wrap gap-4 items-start children:max-w-35">
      <Input variant="outline" placeholder="highlight" highlight />
      <Input variant="soft" placeholder="highlight" highlight />
      <Input variant="ghost" placeholder="highlight" highlight />
      <Input variant="none" placeholder="highlight" highlight />
    </div>
  </DemoBlock>
</template>
