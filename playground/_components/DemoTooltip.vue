<script lang="ts" setup>
import {
  Button as UButton,
  Tooltip as UTooltip,
} from '@byyuurin/ui'
</script>

<template>
  <DemoBlock title="Tooltip">
    <div class="flex gap-4">
      <UTooltip text="tooltip message" arrow>
        <UButton label="open" variant="link" />
      </UTooltip>
    </div>
  </DemoBlock>
</template>
