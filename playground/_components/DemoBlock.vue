<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <div>
    <h2 class="px-4 font-600 text-xl leading-loose bg-ui-cb/10">
      {{ props.title }}
    </h2>
    <div class="p-8 px-4 flex flex-col gap-4">
      <slot></slot>
    </div>
  </div>
</template>
