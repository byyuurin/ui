<script lang="ts">
import type { CollapsibleRootEmits, CollapsibleRootProps } from 'reka-ui'
import theme from '#build/ui/collapsible'
import type { ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'
import type { StaticSlot } from '../types/utils'

export interface CollapsibleEmits extends CollapsibleRootEmits {}

export interface CollapsibleSlots {
  default: StaticSlot<{ open: boolean }>
  content: StaticSlot
}

export interface CollapsibleProps extends ComponentBaseProps, Pick<CollapsibleRootProps, 'defaultOpen' | 'open' | 'disabled' | 'unmountOnHide'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: CollapsibleRootProps['as']
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { cv, merge } from '../utils/style'

const props = withDefaults(defineProps<CollapsibleProps>(), {
  unmountOnHide: true,
})
const emit = defineEmits<CollapsibleEmits>()
const slots = defineSlots<CollapsibleSlots>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'defaultOpen', 'open', 'disabled', 'unmountOnHide'), emit)

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.collapsible))
  return styler(props)
})
</script>

<template>
  <CollapsibleRoot
    v-slot="{ open }"
    v-bind="rootProps"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    data-part="root"
  >
    <CollapsibleTrigger v-if="!!slots.default" as-child>
      <slot :open="open"></slot>
    </CollapsibleTrigger>

    <CollapsibleContent :class="ui.content({ class: props.ui?.content })" data-part="content">
      <slot name="content"></slot>
    </CollapsibleContent>
  </CollapsibleRoot>
</template>

<style>
@keyframes collapsible-up {
  from {
    height: var(--reka-collapsible-content-height);
  }

  to {
    height: 0;
  }
}

@keyframes collapsible-down {
  from {
    height: 0;
  }

  to {
    height: var(--reka-collapsible-content-height);
  }
}
</style>
