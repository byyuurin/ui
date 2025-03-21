<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import type { avatarGroup } from '../theme'
import type { ComponentAttrs } from '../types'

export interface AvatarGroupSlots {
  default?: (props?: {}) => any
}

type AvatarGroupVariants = VariantProps<typeof avatarGroup>

export interface AvatarGroupProps extends ComponentAttrs<typeof avatarGroup> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  size?: AvatarGroupVariants['size']
  /**
   * The maximum number of avatars to display.
   */
  max?: number | string
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { provideAvatarGroup } from '../app/injections'
import { useTheme } from '../composables/useTheme'
import Avatar from './Avatar.vue'

const props = defineProps<AvatarGroupProps>()
const slots = defineSlots<AvatarGroupSlots>()

const max = computed(() => typeof props.max === 'string' ? Number.parseInt(props.max, 10) : props.max)

const children = computed(() => {
  let nodes = slots.default?.()

  if (Array.isArray(nodes) && nodes?.length) {
    nodes = nodes.flatMap((child) => {
      if (typeof child.type === 'symbol') {
        // `v-if="false"` or commented node
        if (typeof child.children === 'string')
          return null

        return child.children
      }

      return child
    }).filter(Boolean)
  }

  return nodes || []
})

const visibleAvatars = computed(() => {
  if (children.value.length === 0)
    return []

  if (!max.value || max.value <= 0)
    return [...children.value].reverse()

  return [...children.value].slice(0, max.value).reverse()
})

const hiddenCount = computed(() => {
  if (children.value.length === 0)
    return 0

  return children.value.length - visibleAvatars.value.length
})

const { generateStyle } = useTheme()
const style = computed(() => generateStyle('avatarGroup', props))

provideAvatarGroup(computed(() => props))
</script>

<template>
  <Primitive :as="props.as" :class="style.root({ class: [props.class, props.ui?.root] })">
    <Avatar v-if="hiddenCount > 0" :text="`+${hiddenCount}`" :class="style.base({ class: props.ui?.base })" />
    <component :is="avatar" v-for="(avatar, index) in visibleAvatars" :key="index" :class="style.base({ class: props.ui?.base })" />
  </Primitive>
</template>
