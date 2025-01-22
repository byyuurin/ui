<script lang="ts" setup>
import { Button, Tooltip } from '@byyuurin/ui'
</script>

<template>
  <DemoBlock title="Tooltip">
    <div class="flex gap-4">
      <Tooltip text="tooltip message" arrow>
        <Button label="open" variant="link" />
      </Tooltip>
    </div>
  </DemoBlock>
</template>
