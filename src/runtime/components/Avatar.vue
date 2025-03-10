<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import type { avatar } from '../theme'
import type { ComponentAttrs } from '../types'

export interface AvatarSlots {
  default?: (props?: {}) => any
}

type AvatarVariants = VariantProps<typeof avatar>

export interface AvatarProps extends ComponentAttrs<typeof avatar> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'span'
   */
  as?: PrimitiveProps['as']
  src?: string
  alt?: string
  icon?: string
  text?: string
  size?: AvatarVariants['size']
  style?: string | HTMLElement['style']
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed, shallowRef, watch } from 'vue'
import { useAvatarGroup } from '../composables/useAvatarGroup'
import { useTheme } from '../composables/useTheme'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AvatarProps>(), {
  as: 'span',
})

const { size } = useAvatarGroup(props)
const fallback = computed(() => props.text || (props.alt || '').split(' ').map((word) => word.charAt(0)).join('').slice(0, 2))

const { theme, createStyler } = useTheme()
const style = computed(() => {
  const styler = createStyler(theme.value.avatar)
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
  <Primitive :as="props.as" :class="style.root({ class: [props.class, props.ui?.root] })" :style="props.style">
    <img
      v-if="props.src && !error"
      :src="props.src"
      :alt="props.alt"
      role="img"
      v-bind="$attrs"
      :class="style.image({ class: props.ui?.image })"
      @error="onError"
    />

    <slot v-else>
      <span v-if="props.icon" :class="style.icon({ class: [props.icon, props.ui?.icon] })"></span>
      <span v-else :class="style.fallback({ class: props.ui?.fallback })">{{ fallback || '&nbsp;' }}</span>
    </slot>
  </Primitive>
</template>
