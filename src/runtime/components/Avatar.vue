<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/avatar'
import type { ChipProps, ComponentBaseProps, ComponentUIProps, IconProps, RuntimeAppConfig } from '../types'
import type { StaticSlot } from '../types/utils'

export interface AvatarSlots {
  default: StaticSlot
}

type ThemeVariants = VariantProps<typeof theme>

interface InnerAs {
  root?: PrimitiveProps['as']
  img?: PrimitiveProps['as']
}

export interface AvatarProps extends ComponentBaseProps {
  /**
   * The element or component this component should render as.
   * @default "span"
   */
  as?: PrimitiveProps['as'] | InnerAs
  src?: string
  alt?: string
  icon?: IconProps['name']
  text?: string
  /** @default "md" */
  size?: ThemeVariants['size']
  chip?: boolean | ChipProps
  style?: string | HTMLElement['style']
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script setup lang="ts">
import { defu } from 'defu'
import { Primitive } from 'reka-ui'
import { computed, shallowRef, watch } from 'vue'
import ImageComponent from '#build/ui-image-component'
import { useAppConfig } from '#imports'
import { useAvatarGroup } from '../composables/useAvatarGroup'
import { cv, merge } from '../utils/style'
import Chip from './Chip.vue'
import Icon from './Icon.vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<AvatarProps>()

const as = computed<InnerAs>(() => {
  if (typeof props.as === 'string' || (props.as && 'render' in props.as && typeof props.as.render === 'function'))
    return { root: props.as }

  return defu(props.as, { root: 'span' })
})

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

const sizePx = computed(() => ({
  '3xs': 16,
  '2xs': 20,
  'xs': 24,
  'sm': 28,
  'md': 32,
  'lg': 36,
  'xl': 40,
  '2xl': 44,
  '3xl': 48,
})[props.size || 'md'])

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
  <component
    :is="props.chip ? Chip : Primitive"
    :as="as.root"
    v-bind="props.chip ? (typeof props.chip === 'object' ? { inset: true, ...props.chip } : { inset: true }) : {}"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    data-part="root"
    :style="props.style"
  >
    <component
      :is="as.img || ImageComponent"
      v-if="props.src && !error"
      :src="props.src"
      :alt="props.alt"
      :width="sizePx"
      :height="sizePx"
      v-bind="$attrs"
      :class="ui.image({ class: props.ui?.image })"
      data-part="image"
      @error="onError"
    />

    <slot v-else v-bind="$attrs">
      <Icon v-if="props.icon" :name="props.icon" :class="ui.icon({ class: props.ui?.icon })" data-part="icon" />
      <span v-else :class="ui.fallback({ class: props.ui?.fallback })" data-part="fallback">
        <template v-if="fallback">{{ fallback }}</template>
        <template v-else>&nbsp;</template>
      </span>
    </slot>
  </component>
</template>
