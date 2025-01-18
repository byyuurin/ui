<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <div class="p-4">
    <h2 class="font-600 text-xl leading-normal mb-4 border-b border-dotted">
      {{ props.title }}
    </h2>
    <div class="flex flex-col gap-4">
      <slot></slot>
    </div>
  </div>
</template>
