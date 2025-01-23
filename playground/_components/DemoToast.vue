<script setup lang="ts">
import { Button, useToast } from '@byyuurin/ui'

const toast = useToast()

function showToast() {
  toast.add({
    title: 'Toast title',
    description: 'description...',
    icon: 'i-carbon-activity',
    closeIcon: 'i-carbon-close-large',
    actions: [
      { label: 'YES', class: 'min-w-20 ui-green justify-center' },
      { label: 'NO', class: 'min-w-20 ui-rose justify-center' },
    ],
  })
}
</script>

<template>
  <DemoBlock title="Toast">
    <div>
      <Button label="Open" @click="showToast" />
    </div>
  </DemoBlock>
</template>
