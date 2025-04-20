<script lang="ts">
import type { CollapsibleRootEmits, CollapsibleRootProps } from 'reka-ui'
import type { collapsible } from '../theme'
import type { ComponentAttrs } from '../types'

export interface CollapsibleEmits extends CollapsibleRootEmits {}

export interface CollapsibleSlots {
  default?: (props: { open: boolean }) => any
  content?: (props?: {}) => any
}

export interface CollapsibleProps extends ComponentAttrs<typeof collapsible>, Pick<CollapsibleRootProps, 'as' | 'defaultOpen' | 'open' | 'disabled' | 'unmountOnHide'> {
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'

const props = withDefaults(defineProps<CollapsibleProps>(), {
  unmountOnHide: true,
})
const emit = defineEmits<CollapsibleEmits>()
const slots = defineSlots<CollapsibleSlots>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'defaultOpen', 'open', 'disabled', 'unmountOnHide'), emit)

const { generateStyle } = useTheme()
const style = computed(() => generateStyle('collapsible', props))
</script>

<template>
  <CollapsibleRoot
    v-slot="{ open }"
    v-bind="rootProps"
    :class="style.root({ class: [props.class, props.ui?.root] })"
    data-part="root"
  >
    <CollapsibleTrigger v-if="slots.default" as-child>
      <slot :open="open"></slot>
    </CollapsibleTrigger>

    <CollapsibleContent :class="style.content({ class: props.ui?.content })" data-part="content">
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
