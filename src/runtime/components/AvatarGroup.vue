<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/avatar-group'
import type { ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'
import type { StaticSlot } from '../types/utils'

type ThemeVariants = VariantProps<typeof theme>

export interface AvatarGroupProps extends ComponentBaseProps {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  size?: ThemeVariants['size']
  /**
   * The maximum number of avatars to display.
   */
  max?: number | string
  ui?: ComponentUIProps<typeof theme>
}

export interface AvatarGroupSlots {
  default: StaticSlot
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { provideAvatarGroup } from '../composables/useAvatarGroup'
import { pick } from '../utils'
import { cv, merge } from '../utils/style'
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

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.avatarGroup))
  return styler(pick(props, ['size']))
})

provideAvatarGroup(computed(() => props))
</script>

<template>
  <Primitive :as="props.as" data-part="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <Avatar v-if="hiddenCount > 0" :text="`+${hiddenCount}`" data-part="base" :class="ui.base({ class: props.ui?.base })" />
    <component :is="avatar" v-for="(avatar, index) in visibleAvatars" :key="index" data-part="base" :class="ui.base({ class: props.ui?.base })" />
  </Primitive>
</template>
