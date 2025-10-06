<script lang="ts">
import type { PaginationRootEmits, PaginationRootProps } from 'reka-ui'
import theme from '#build/ui/pagination'
import type { ButtonProps, ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'

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

export interface PaginationProps extends ComponentBaseProps, Pick<PaginationRootProps, 'as' | 'defaultPage' | 'disabled' | 'itemsPerPage' | 'page' | 'showEdges' | 'siblingCount' | 'total'> {
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
   * @default app.icons.chevronLeft
   */
  prevIcon?: string
  /**
   * The icon to use for the next page control.
   * @default app.icons.chevronRight
   */
  nextIcon?: string
  /**
   * The icon to use for the ellipsis control.
   * @default app.icons.ellipsis
   */
  ellipsisIcon?: string
  /**
   * The size of the pagination controls.
   * @default "md"
   */
  size?: ButtonProps['size']
  /**
   * The variant of the pagination controls.
   * @default "outline"
   */
  variant?: ButtonProps['variant']
  /**
   * The variant of the active pagination control.
   * @default "solid"
   */
  activeVariant?: ButtonProps['variant']
  /**
   * Whether to show the first, previous, next, and last controls.
   * @default true
   */
  showControls?: boolean
  /**
   * A function to render page controls as links.
   */
  to?: (page: number) => ButtonProps['to']
  ui?: ComponentUIProps<typeof theme>
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { PaginationEllipsis, PaginationFirst, PaginationLast, PaginationList, PaginationListItem, PaginationNext, PaginationPrev, PaginationRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { cv, merge } from '../utils/style'
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

const { dir } = useLocale()
const appConfig = useAppConfig() as RuntimeAppConfig
const style = computed(() => {
  const ui = cv(merge(theme, appConfig.ui.pagination))
  return ui(props)
})

const firstIcon = computed(() => props.firstIcon || (dir.value === 'rtl' ? appConfig.ui.icons.chevronDoubleRight : appConfig.ui.icons.chevronDoubleLeft))
const prevIcon = computed(() => props.prevIcon || (dir.value === 'rtl' ? appConfig.ui.icons.chevronRight : appConfig.ui.icons.chevronLeft))
const nextIcon = computed(() => props.nextIcon || (dir.value === 'rtl' ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight))
const lastIcon = computed(() => props.lastIcon || (dir.value === 'rtl' ? appConfig.ui.icons.chevronDoubleLeft : appConfig.ui.icons.chevronDoubleRight))
const ellipsisIcon = computed(() => props.ellipsisIcon || appConfig.ui.icons.ellipsis)
</script>

<template>
  <PaginationRoot v-slot="{ page, pageCount }" v-bind="rootProps" :class="style.root({ class: [props.class, props.ui?.root] })" data-part="root">
    <PaginationList v-slot="{ items }" :class="style.list({ class: props.ui?.list })" data-part="list">
      <PaginationFirst v-if="props.showControls || !!slots.first" :class="style.first({ class: props.ui?.first })" data-part="first" as-child>
        <slot name="first">
          <Button :variant="props.variant" :size="props.size" :icon="firstIcon" :to="props.to?.(1)" />
        </slot>
      </PaginationFirst>
      <PaginationPrev v-if="props.showControls || !!slots.prev" :class="style.prev({ class: props.ui?.prev })" data-part="perv" as-child>
        <slot name="prev">
          <Button :variant="props.variant" :size="props.size" :icon="prevIcon" :to="page > 1 ? props.to?.(page - 1) : undefined" />
        </slot>
      </PaginationPrev>

      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" :class="style.item({ class: props.ui?.item })" data-part="item" as-child>
          <slot name="item" v-bind="{ item, index, page, pageCount }">
            <Button
              :variant="props.page === item.value ? props.activeVariant : props.variant"
              :size="props.size"
              :label="String(item.value)"
              :to="props.to?.(item.value)"
              :ui="{ label: style.label({ class: props.ui?.label }) }"
              square
            />
          </slot>
        </PaginationListItem>

        <PaginationEllipsis
          v-else
          :key="item.type"
          :index="index"
          :disabled="props.disabled"
          :class="[
            style.item({ class: props.ui?.item }),
            style.ellipsis({ class: props.ui?.ellipsis }),
          ]"
          data-part="ellipsis"
          as-child
        >
          <slot name="ellipsis">
            <Button
              :variant="props.variant"
              :size="props.size"
              :icon="ellipsisIcon"
            />
          </slot>
        </PaginationEllipsis>
      </template>

      <PaginationNext v-if="props.showControls || !!slots.next" :class="style.next({ class: props.ui?.next })" data-part="next" as-child>
        <slot name="next">
          <Button :variant="props.variant" :size="props.size" :icon="nextIcon" :to="page < pageCount ? props.to?.(page + 1) : undefined" />
        </slot>
      </PaginationNext>
      <PaginationLast v-if="props.showControls || !!slots.last" :class="style.last({ class: props.ui?.last })" data-part="last" as-child>
        <slot name="last">
          <Button :variant="props.variant" :size="props.size" :icon="lastIcon" :to="props.to?.(pageCount)" />
        </slot>
      </PaginationLast>
    </PaginationList>
  </PaginationRoot>
</template>
