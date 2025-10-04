<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { AvatarRootProps } from 'reka-ui'
import theme from '#build/ui/avatar'
import type { ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'

export interface AvatarSlots {
  default?: (props?: {}) => any
}

type ThemeVariants = VariantProps<typeof theme>

export interface AvatarProps extends ComponentBaseProps {
  /**
   * The element or component this component should render as.
   * @default "span"
   */
  as?: AvatarRootProps['as']
  src?: string
  alt?: string
  icon?: string
  text?: string
  size?: ThemeVariants['size']
  style?: string | HTMLElement['style']
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script setup lang="ts">
import { AvatarFallback, AvatarImage, AvatarRoot } from 'reka-ui'
import { computed, shallowRef, watch } from 'vue'
import { useAppConfig } from '#imports'
import { useAvatarGroup } from '../composables/useAvatarGroup'
import { cv, merge } from '../utils/style'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AvatarProps>(), {
  src: '',
})

const { size } = useAvatarGroup(props)
const fallback = computed(() => props.text || (props.alt || '').split(' ').map((word) => word.charAt(0)).join('').slice(0, 2))

const appConfig = useAppConfig() as RuntimeAppConfig
const style = computed(() => {
  const ui = cv(merge(theme, appConfig.ui.avatar))
  return ui({
    ...props,
    size: size.value,
  })
})

const error = shallowRef(false)

watch(() => props.src, () => {
  if (error.value)
    error.value = false
})
</script>

<template>
  <AvatarRoot :as="props.as" :class="style.root({ class: [props.class, props.ui?.root] })" :data-part="$attrs['data-part'] ?? 'root'" :style="props.style">
    <AvatarImage
      :src="props.src"
      :alt="props.alt"
      :class="style.image({ class: props.ui?.image })"
      data-part="image"
    />

    <AvatarFallback as-child>
      <span v-if="props.icon" :class="style.icon({ class: [props.icon, props.ui?.icon] })" data-part="icon"></span>
      <span v-else :class="style.fallback({ class: props.ui?.fallback })" data-part="fallback">{{ fallback || '&nbsp;' }}</span>
    </AvatarFallback>
  </AvatarRoot>
</template>
