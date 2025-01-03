<script lang="ts" setup>
</script>

<template>
  <div class="ui-green-600">
    <div class="grid grid-cols-3 max-w-screen-sm gap-4 p-4 all:min-w-40">
      <UButton label="Solid" />
      <UButton label="Solid" round />
      <UButton label="Solid" disabled />
      <UButton label="Outline" variant="outline" />
      <UButton label="Outline" variant="outline" round />
      <UButton label="Outline" variant="outline" disabled />
      <UButton label="Soft" variant="soft" />
      <UButton label="Soft" variant="soft" round />
      <UButton label="Soft" variant="soft" disabled />
      <UButton label="Ghost" variant="ghost" />
      <UButton label="Ghost" variant="ghost" round />
      <UButton label="Ghost" variant="ghost" disabled />
      <UButton label="Link" variant="link" />
      <UButton label="Link" variant="link" round />
      <UButton label="Link" variant="link" disabled />
    </div>
    <div class="flex items-start gap-4 p-4">
      <UButton size="xs">
        size: xs
      </UButton>
      <UButton size="sm">
        size: sm
      </UButton>
      <UButton size="md">
        size: md
      </UButton>
      <UButton size="lg">
        size: lg
      </UButton>
      <UButton size="xl">
        size: xl
      </UButton>
    </div>
  </div>
</template>
