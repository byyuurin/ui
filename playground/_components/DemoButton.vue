<script lang="ts" setup>
import { Button } from '@byyuurin/ui'
</script>

<template>
  <DemoBlock title="Button">
    <div class="flex flex-wrap gap-4">
      <Button label="Solid" />
      <Button label="Solid" round />
      <Button label="Solid" disabled />
    </div>
    <div class="flex flex-wrap gap-4">
      <Button label="Outline" variant="outline" />
      <Button label="Outline" variant="outline" round />
      <Button label="Outline" variant="outline" disabled />
    </div>
    <div class="flex flex-wrap gap-4">
      <Button label="Soft" variant="soft" />
      <Button label="Soft" variant="soft" round />
      <Button label="Soft" variant="soft" disabled />
    </div>
    <div class="flex flex-wrap gap-4">
      <Button label="Ghost" variant="ghost" />
      <Button label="Ghost" variant="ghost" round />
      <Button label="Ghost" variant="ghost" disabled />
    </div>
    <div class="flex flex-wrap gap-4">
      <Button label="Link" variant="link" />
      <Button label="Link" variant="link" disabled />
    </div>
    <div class="flex flex-wrap items-start gap-4">
      <Button size="xs" icon="i-carbon-asleep-filled" />
      <Button size="sm" icon="i-carbon-asleep-filled" />
      <Button size="md" icon="i-carbon-asleep-filled" />
      <Button size="lg" icon="i-carbon-asleep-filled" />
      <Button size="xl" icon="i-carbon-asleep-filled" />
    </div>
    <div class="flex flex-wrap items-start gap-4">
      <Button label="Size: xs" size="xs" />
      <Button label="Size: sm" size="sm" />
      <Button label="Size: md" size="md" />
      <Button label="Size: lg" size="lg" />
      <Button label="Size: xl" size="xl" />
    </div>
    <div class="flex flex-wrap items-start gap-4">
      <Button size="xs" icon="i-carbon-asleep-filled">
        Size: xs
      </Button>
      <Button size="sm" icon="i-carbon-asleep-filled">
        Size: sm
      </Button>
      <Button size="md" icon="i-carbon-asleep-filled">
        Size: md
      </Button>
      <Button size="lg" icon="i-carbon-asleep-filled">
        Size: lg
      </Button>
      <Button size="xl" icon="i-carbon-asleep-filled">
        Size: xl
      </Button>
    </div>
  </DemoBlock>
</template>
