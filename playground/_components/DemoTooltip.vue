<script lang="ts" setup>
import {
  Button as UButton,
  Tooltip as UTooltip,
} from '@byyuurin/ui'
</script>

<template>
  <DemoBlock title="Tooltip">
    <div class="flex gap-4">
      <UTooltip text="hello" arrow>
        <UButton label="hover open" variant="link" />
      </UTooltip>
      <UTooltip text="hello" arrow open>
        <UButton label="always open" variant="link" />
      </UTooltip>
    </div>
  </DemoBlock>
</template>
