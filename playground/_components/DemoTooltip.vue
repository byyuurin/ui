<script lang="ts" setup>
import { Button, Input, Tooltip } from '@byyuurin/ui'

const label = ref('')
const message = ref('')
const arrow = ref(true)
</script>

<template>
  <DemoBlock title="Tooltip">
    <div class="grid sm:grid-cols-[auto_1fr] items-center gap-2 py-4 gap-x-4 children:max-w-35">
      <label class="opacity-80">label:</label>
      <Input v-model="label" variant="soft" placeholder="label" />
      <label class="opacity-80">message:</label>
      <Input v-model="message" variant="soft" placeholder="message" />
      <label class="opacity-80">arrow:</label>
      <input v-model="arrow" type="checkbox" class="size-5 accent-ui-cb" />
    </div>
    <div class="flex gap-4">
      <Tooltip :text="message || 'message'" :arrow="arrow">
        <Button :label="label || 'label'" variant="link" />
      </Tooltip>
    </div>
  </DemoBlock>
</template>
