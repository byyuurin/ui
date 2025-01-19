<script lang="ts" setup>
import { Button as UButton } from '@byyuurin/ui'
</script>

<template>
  <DemoBlock title="Button">
    <div class="flex max-w-screen-sm gap-4">
      <UButton label="Solid" />
      <UButton label="Solid" round />
      <UButton label="Solid" disabled />
    </div>
    <div class="flex max-w-screen-sm gap-4">
      <UButton label="Outline" variant="outline" />
      <UButton label="Outline" variant="outline" round />
      <UButton label="Outline" variant="outline" disabled />
    </div>
    <div class="flex max-w-screen-sm gap-4">
      <UButton label="Soft" variant="soft" />
      <UButton label="Soft" variant="soft" round />
      <UButton label="Soft" variant="soft" disabled />
    </div>
    <div class="flex max-w-screen-sm gap-4">
      <UButton label="Ghost" variant="ghost" />
      <UButton label="Ghost" variant="ghost" round />
      <UButton label="Ghost" variant="ghost" disabled />
    </div>
    <div class="flex max-w-screen-sm gap-4">
      <UButton label="Link" variant="link" />
      <UButton label="Link" variant="link" disabled />
    </div>
    <div class="flex items-start gap-4">
      <UButton size="xs" icon="i-carbon-asleep-filled" />
      <UButton size="sm" icon="i-carbon-asleep-filled" />
      <UButton size="md" icon="i-carbon-asleep-filled" />
      <UButton size="lg" icon="i-carbon-asleep-filled" />
      <UButton size="xl" icon="i-carbon-asleep-filled" />
    </div>
    <div class="flex items-start gap-4">
      <UButton label="Size: xs" size="xs" />
      <UButton label="Size: sm" size="sm" />
      <UButton label="Size: md" size="md" />
      <UButton label="Size: lg" size="lg" />
      <UButton label="Size: xl" size="xl" />
    </div>
    <div class="flex items-start gap-4">
      <UButton size="xs" icon="i-carbon-asleep-filled">
        Size: xs
      </UButton>
      <UButton size="sm" icon="i-carbon-asleep-filled">
        Size: sm
      </UButton>
      <UButton size="md" icon="i-carbon-asleep-filled">
        Size: md
      </UButton>
      <UButton size="lg" icon="i-carbon-asleep-filled">
        Size: lg
      </UButton>
      <UButton size="xl" icon="i-carbon-asleep-filled">
        Size: xl
      </UButton>
    </div>
  </DemoBlock>
</template>
