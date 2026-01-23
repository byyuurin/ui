<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/marquee'
import type { ComponentBaseProps, ComponentStyler, RuntimeAppConfig } from '../types'
import type { StaticSlot } from '../types/utils'

type ThemeVariants = VariantProps<typeof theme>

export interface MarqueeProps extends ComponentBaseProps {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  /**
   * Pause the marquee on hover.
   * @default false
   */
  pauseOnHover?: boolean
  /**
   * Reverse the direction of the marquee.
   * @default false
   */
  reverse?: boolean
  /**
   * The orientation of the marquee.
   * @default "horizontal"
   */
  orientation?: ThemeVariants['orientation']
  /**
   * The number of times the marquee should repeat.
   * @default 4
   */
  repeat?: number
  /**
   * Display an overlay on the marquee.
   * @default true
   */
  overlay?: boolean
  ui?: ComponentStyler<typeof theme>
}

export interface MarqueeSlots {
  default: StaticSlot
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { pick } from '../utils'
import { cv, merge } from '../utils/style'

const props = withDefaults(defineProps<MarqueeProps>(), {
  orientation: 'horizontal',
  repeat: 4,
  overlay: true,
})

defineSlots<MarqueeSlots>()

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.marquee))
  return styler(pick(props, ['pauseOnHover', 'orientation', 'reverse', 'overlay']))
})
</script>

<template>
  <Primitive :as="props.as" :data-orientation="props.orientation" data-part="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div v-for="i in props.repeat" :key="i" data-part="content" :class="ui.content({ class: props.ui?.content })">
      <slot></slot>
    </div>
  </Primitive>
</template>

<style>
@keyframes marquee {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(calc(-100% - var(--gap)), 0, 0);
  }
}

@keyframes marquee-rtl {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(calc(100% + var(--gap)), 0, 0);
  }
}

@keyframes marquee-vertical {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, calc(-100% - var(--gap)), 0);
  }
}

@keyframes marquee-vertical-rtl {
  from {
    transform: translate3d(0, calc(-100% - var(--gap)), 0);
  }
  to {
    transform: translate3d(0, calc(-100% * var(--gap)), 0);
  }
}
</style>
