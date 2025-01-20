<script lang="ts" setup>
import { Link as ULink } from '@byyuurin/ui'
</script>

<template>
  <DemoBlock title="Link">
    <div class="flex items-start gap-4">
      <ULink>
        Link
      </ULink>
      <ULink active>
        Link (active)
      </ULink>
      <ULink disabled>
        Link (disabled)
      </ULink>
    </div>
    <div class="flex items-start gap-4">
      <ULink
        :ui="{
          active: 'color-green',
          inactive: 'color-green/90 hover:color-green',
          disabled: 'color-green/50 hover:color-green/50',
        }"
      >
        Custom Link
      </ULink>
      <ULink
        :ui="{
          active: 'color-green',
          inactive: 'color-green/90 hover:color-green',
          disabled: 'color-green/50 hover:color-green/50',
        }"
        active
      >
        Custom Link (active)
      </ULink>
      <ULink
        :ui="{
          active: 'color-green',
          inactive: 'color-green/90 hover:color-green',
          disabled: 'color-green/50 hover:color-green/50',
        }"
        disabled
      >
        Custom Link (disabled)
      </ULink>
    </div>
  </DemoBlock>
</template>
