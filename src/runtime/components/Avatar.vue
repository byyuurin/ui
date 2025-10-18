<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { AvatarRootProps } from 'reka-ui'
import theme from '#build/ui/avatar'
import type { ComponentBaseProps, ComponentUIProps, IconProps, RuntimeAppConfig } from '../types'
import type { StaticSlot } from '../types/utils'

export interface AvatarSlots {
  default: StaticSlot
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
  icon?: IconProps['name']
  text?: string
  /** @default "md" */
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
import Icon from './Icon.vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<AvatarProps>()

const fallback = computed(() => props.text || (props.alt || '').split(' ').map((word) => word.charAt(0)).join('').slice(0, 2))

const { size } = useAvatarGroup(props)

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.avatar))
  return styler({
    ...props,
    size: size.value,
  })
})

const error = shallowRef(false)

watch(() => props.src, () => {
  if (error.value)
    error.value = false
})

function onError() {
  error.value = true
}
</script>

<template>
  <AvatarRoot :as="props.as" :class="ui.root({ class: [props.class, props.ui?.root] })" data-part="root" :style="props.style">
    <AvatarImage
      v-if="props.src && !error"
      :src="props.src"
      :alt="props.alt"
      :class="ui.image({ class: props.ui?.image })"
      data-part="image"
      @error="onError"
    />

    <AvatarFallback as-child>
      <Icon v-if="props.icon" :name="props.icon" :class="ui.icon({ class: props.ui?.icon })" data-part="icon" />
      <span v-else :class="ui.fallback({ class: props.ui?.fallback })" data-part="fallback">{{ fallback || '&nbsp;' }}</span>
    </AvatarFallback>
  </AvatarRoot>
</template>
