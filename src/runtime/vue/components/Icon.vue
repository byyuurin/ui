<script lang="ts">
import type { IconProps as NuxtIconProps } from '../../types'

export interface IconProps {
  name: NuxtIconProps['name']
}
</script>

<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'

const props = defineProps<IconProps>()
</script>

<template>
  <IconifyIcon v-if="typeof props.name === 'string'" :icon="props.name.replace(/^i-/, '')" />
  <component :is="props.name" v-else />
</template>
