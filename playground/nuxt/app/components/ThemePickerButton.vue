<script lang="ts" setup>
import { colors } from '@unocss/preset-wind4/colors'

const props = defineProps<{
  label?: string
  icon?: string
  chip?: string
  selected?: boolean
}>()

const slots = defineSlots<{
  leading?: any
}>()

const color = computed(() => {
  const result = {
    light: '',
    dark: '',
  }

  if (props.chip && props.chip in colors) {
    const colorWithShades = colors[props.chip as keyof typeof colors]
    result.light = colorWithShades['500']
    result.dark = colorWithShades['400']
  }

  return result
})
</script>

<template>
  <UButton
    size="sm"
    color="neutral"
    variant="outline"
    :icon="props.icon"
    :label="props.label"
    class="capitalize ring-default rounded-sm text-2.75"
    :class="[props.selected ? 'bg-elevated' : 'hover:bg-elevated/50']"
  >
    <template v-if="props.chip || slots.leading" #leading>
      <slot name="leading">
        <span
          class="inline-block size-2 rounded-full bg-[--color-light] dark:bg-[--color-dark]"
          :style="{
            '--color-light': color.light,
            '--color-dark': color.dark,
          }"
        ></span>
      </slot>
    </template>
  </UButton>
</template>
