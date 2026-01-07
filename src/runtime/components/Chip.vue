<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/chip'
import type { ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'
import type { StaticSlot } from '../types/utils'

type ThemeVariants = VariantProps<typeof theme>

export interface ChipProps extends ComponentBaseProps {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  /** Display some text inside the chip. */
  text?: string | number
  /** @default "md" */
  size?: ThemeVariants['size']
  /** @default "primary" */
  color?: ThemeVariants['color']
  /** @default "top-right" */
  position?: ThemeVariants['position']
  show?: boolean
  /** When `true`, keep the chip inside the component for rounded elements. */
  inset?: boolean
  /** When `true`, render the chip relatively to the parent. */
  standalone?: boolean
  ui?: ComponentUIProps<typeof theme>
}

export interface ChipEmits {
  'update:show': [show: boolean]
}

export interface ChipSlots {
  default: StaticSlot
  content: StaticSlot
}
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { Primitive, Slot } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useAvatarGroup } from '../composables/useAvatarGroup'
import { pick } from '../utils'
import { cv, merge } from '../utils/style'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ChipProps>(), {
  show: true,
})

const emit = defineEmits<ChipEmits>()
defineSlots<ChipSlots>()

const show = useVModel(props, 'show', emit)

const { size } = useAvatarGroup(props)

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.chip))

  return styler({
    ...pick(props, ['color', 'position', 'inset', 'standalone']),
    size: size.value,
  })
})
</script>

<template>
  <Primitive
    :as="props.as"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    data-part="root"
  >
    <Slot v-bind="$attrs">
      <slot></slot>
    </Slot>

    <span v-if="show" :class="ui.base({ class: props.ui?.base })" data-part="base">
      <slot name="content">
        {{ props.text }}
      </slot>
    </span>
  </Primitive>
</template>
