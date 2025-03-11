<script lang="ts">
import type { PaginationRootEmits, PaginationRootProps } from 'reka-ui'
import type { pagination } from '../theme'
import type { ButtonProps, ComponentAttrs } from '../types'

export interface PaginationEmits extends PaginationRootEmits {}

export interface PaginationSlots {
  first?: (props?: {}) => any
  prev?: (props?: {}) => any
  next?: (props?: {}) => any
  last?: (props?: {}) => any
  ellipsis?: (props?: {}) => any
  item?: (props: {
    page: number
    pageCount: number
    item: {
      type: 'ellipsis'
    } | {
      type: 'page'
      value: number
    }
    index: number
  }) => any
}

export interface PaginationProps extends ComponentAttrs<typeof pagination>, Pick<PaginationRootProps, 'as' | 'defaultPage' | 'disabled' | 'itemsPerPage' | 'page' | 'showEdges' | 'siblingCount' | 'total'> {
  /**
   * The icon to use for the first page control.
   * @default app.icons.doubleLeft
   */
  firstIcon?: string
  /**
   * The icon to use for the last page control.
   * @default app.icons.doubleRight
   */
  lastIcon?: string
  /**
   * The icon to use for the previous page control.
   * @default app.icons.arrowLeft
   */
  prevIcon?: string
  /**
   * The icon to use for the next page control.
   * @default app.icons.arrowRight
   */
  nextIcon?: string
  /**
   * The icon to use for the ellipsis control.
   * @default app.icons.ellipsis
   */
  ellipsisIcon?: string
  /**
   * The size of the pagination controls.
   * @default 'md'
   */
  size?: ButtonProps['size']
  /**
   * The variant of the pagination controls.
   * @default 'outline'
   */
  variant?: ButtonProps['variant']
  /**
   * The variant of the active pagination control.
   * @default 'solid'
   */
  activeVariant?: ButtonProps['variant']
  /**
   * Whether to show the first, previous, next, and last controls.
   * @default true
   */
  showControls?: boolean
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { PaginationEllipsis, PaginationFirst, PaginationLast, PaginationList, PaginationListItem, PaginationNext, PaginationPrev, PaginationRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'
import Button from './Button.vue'

const props = withDefaults(defineProps<PaginationProps>(), {
  variant: 'outline',
  activeVariant: 'solid',
  showControls: true,
  showEdges: false,
  itemsPerPage: 10,
  siblingCount: 2,
  total: 0,
})

const emit = defineEmits<PaginationEmits>()
const slots = defineSlots<PaginationSlots>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'defaultPage', 'disabled', 'itemsPerPage', 'page', 'showEdges', 'siblingCount', 'total'), emit)

const { theme, createStyler } = useTheme()

const firstIcon = computed(() => props.firstIcon || theme.value.app.icons.doubleLeft)
const prevIcon = computed(() => props.prevIcon || theme.value.app.icons.arrowLeft)
const nextIcon = computed(() => props.nextIcon || theme.value.app.icons.arrowRight)
const lastIcon = computed(() => props.lastIcon || theme.value.app.icons.doubleRight)
const ellipsisIcon = computed(() => props.ellipsisIcon || theme.value.app.icons.ellipsis)

const style = computed(() => {
  const styler = createStyler(theme.value.pagination)
  return styler(props)
})
</script>

<template>
  <PaginationRoot v-slot="{ page, pageCount }" v-bind="rootProps" :class="style.root({ class: [props.class, props.ui?.root] })">
    <PaginationList v-slot="{ items }" :class="style.list({ class: props.ui?.list })">
      <PaginationFirst v-if="props.showControls || !!slots.first" as-child>
        <slot name="first">
          <Button :class="style.item({ class: props.ui?.item })" :variant="props.variant" :size="props.size" :icon="firstIcon" />
        </slot>
      </PaginationFirst>
      <PaginationPrev v-if="props.showControls || !!slots.prev" as-child>
        <slot name="prev">
          <Button :class="style.item({ class: props.ui?.item })" :variant="props.variant" :size="props.size" :icon="prevIcon" />
        </slot>
      </PaginationPrev>

      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'" :key="index" as-child :value="item.value">
          <slot name="item" v-bind="{ item, index, page, pageCount }">
            <Button
              :class="style.item({ class: props.ui?.item })"
              :variant="props.page === item.value ? props.activeVariant : props.variant"
              :size="props.size"
              :label="String(item.value)"
              :ui="{ label: style.label() }"
            />
          </slot>
        </PaginationListItem>

        <PaginationEllipsis v-else :key="item.type" :index="index" as-child>
          <slot name="ellipsis">
            <Button
              :variant="props.variant"
              :size="props.size"
              :icon="ellipsisIcon"
              :disabled="props.disabled /* TODO: remove after reka-ui update */"
              :class="[
                style.item({ class: props.ui?.item }),
                style.ellipsis({ class: props.ui?.ellipsis }),
              ]"
            />
          </slot>
        </PaginationEllipsis>
      </template>

      <PaginationNext v-if="props.showControls || !!slots.next" as-child>
        <slot name="next">
          <Button :class="style.item({ class: props.ui?.item })" :variant="props.variant" :size="props.size" :icon="nextIcon" />
        </slot>
      </PaginationNext>
      <PaginationLast v-if="props.showControls || !!slots.last" as-child>
        <slot name="last">
          <Button :class="style.item({ class: props.ui?.item })" :variant="props.variant" :size="props.size" :icon="lastIcon" />
        </slot>
      </PaginationLast>
    </PaginationList>
  </PaginationRoot>
</template>
