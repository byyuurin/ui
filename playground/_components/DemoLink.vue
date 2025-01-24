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
  </DemoBlock>
</template>
