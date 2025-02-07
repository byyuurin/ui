<script lang="ts" setup>
const props = withDefaults(defineProps<{
  label?: string
  labelPosition?: 'left' | 'right' | 'center'
}>(), {
  labelPosition: 'center',
})
</script>

<template>
  <span class="group relative overflow-hidden rounded-ui-base border border-dashed border-ui-c1 px-4 flex items-center justify-center">
    <svg class="absolute inset-0 h-full w-full stroke-ui-base/10" fill="none">
      <defs>
        <pattern
          id="pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e"
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3" />
        </pattern>
      </defs>
      <rect stroke="none" fill="url(#pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e)" width="100%" height="100%" />
    </svg>

    <slot>
      <span
        class="w-full"
        :class="{
          'text-center': props.labelPosition === 'center',
          'text-left': props.labelPosition === 'left',
          'text-right': props.labelPosition === 'right',
        }"
      >{{ props.label }}</span>
    </slot>
  </span>
</template>
