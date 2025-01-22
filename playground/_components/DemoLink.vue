<script lang="ts" setup>
import { Link } from '@byyuurin/ui'
</script>

<template>
  <DemoBlock title="Link">
    <div class="flex items-start gap-4">
      <Link>
        Link
      </Link>
      <Link active>
        Link (active)
      </Link>
      <Link disabled>
        Link (disabled)
      </Link>
    </div>
    <div class="flex items-start gap-4">
      <Link
        :ui="{
          active: 'color-green',
          inactive: 'color-green/90 hover:color-green',
          disabled: 'color-green/50 hover:color-green/50',
        }"
      >
        Custom Link
      </Link>
      <Link
        :ui="{
          active: 'color-green',
          inactive: 'color-green/90 hover:color-green',
          disabled: 'color-green/50 hover:color-green/50',
        }"
        active
      >
        Custom Link (active)
      </Link>
      <Link
        :ui="{
          active: 'color-green',
          inactive: 'color-green/90 hover:color-green',
          disabled: 'color-green/50 hover:color-green/50',
        }"
        disabled
      >
        Custom Link (disabled)
      </Link>
    </div>
  </DemoBlock>
</template>
