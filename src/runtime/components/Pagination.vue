<script lang="ts">
import type { PaginationRootEmits, PaginationRootProps } from 'reka-ui'
import theme from '#build/ui/pagination'
import type { ButtonProps, ComponentBaseProps, ComponentStyler, ComponentUIProps, IconProps, RuntimeAppConfig } from '../types'
import type { StaticSlot } from '../types/utils'

export interface PaginationProps extends ComponentBaseProps, Pick<PaginationRootProps, 'defaultPage' | 'disabled' | 'itemsPerPage' | 'page' | 'showEdges' | 'siblingCount' | 'total'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PaginationRootProps['as']
  /**
   * The icon to use for the first page control.
   * @default app.icons.doubleLeft
   */
  firstIcon?: IconProps['name']
  /**
   * The icon to use for the last page control.
   * @default app.icons.doubleRight
   */
  lastIcon?: IconProps['name']
  /**
   * The icon to use for the previous page control.
   * @default app.icons.chevronLeft
   */
  prevIcon?: IconProps['name']
  /**
   * The icon to use for the next page control.
   * @default app.icons.chevronRight
   */
  nextIcon?: IconProps['name']
  /**
   * The icon to use for the ellipsis control.
   * @default app.icons.ellipsis
   */
  ellipsisIcon?: IconProps['name']
  /**
   * The color of the pagination controls.
   * @default "neutral"
   */
  color?: ButtonProps['color']
  /**
   * The color of the active pagination control.
   * @default "primary"
   */
  activeColor?: ButtonProps['color']
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
   * @param page The page number to navigate to.
   */
  to?: (page: number) => ButtonProps['to']
  ui?: ComponentUIProps<typeof theme>
}

export interface PaginationEmits extends PaginationRootEmits {}

export interface PaginationSlots {
  first: StaticSlot
  prev: StaticSlot
  next: StaticSlot
  last: StaticSlot
  ellipsis: StaticSlot<{ ui: ComponentStyler<typeof theme> }>
  item: StaticSlot<{
    page: number
    pageCount: number
    item: {
      type: 'ellipsis'
    } | {
      type: 'page'
      value: number
    }
    index: number
  }>
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
  color: 'neutral',
  activeColor: 'primary',
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
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.pagination))
  return styler(props)
})

const firstIcon = computed(() => props.firstIcon || (dir.value === 'rtl' ? appConfig.ui.icons.chevronDoubleRight : appConfig.ui.icons.chevronDoubleLeft))
const prevIcon = computed(() => props.prevIcon || (dir.value === 'rtl' ? appConfig.ui.icons.chevronRight : appConfig.ui.icons.chevronLeft))
const nextIcon = computed(() => props.nextIcon || (dir.value === 'rtl' ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight))
const lastIcon = computed(() => props.lastIcon || (dir.value === 'rtl' ? appConfig.ui.icons.chevronDoubleLeft : appConfig.ui.icons.chevronDoubleRight))
</script>

<template>
  <PaginationRoot v-slot="{ page, pageCount }" v-bind="rootProps" :class="ui.root({ class: [props.ui?.root, props.class] })" data-part="root">
    <PaginationList v-slot="{ items }" :class="ui.list({ class: props.ui?.list })" data-part="list">
      <PaginationFirst v-if="props.showControls || !!slots.first" :class="ui.first({ class: props.ui?.first })" as-child data-part="first">
        <slot name="first">
          <Button :color="props.color" :variant="props.variant" :size="props.size" :icon="firstIcon" :to="props.to?.(1)" />
        </slot>
      </PaginationFirst>
      <PaginationPrev v-if="props.showControls || !!slots.prev" :class="ui.prev({ class: props.ui?.prev })" as-child data-part="perv">
        <slot name="prev">
          <Button :color="props.color" :variant="props.variant" :size="props.size" :icon="prevIcon" :to="page > 1 ? props.to?.(page - 1) : undefined" />
        </slot>
      </PaginationPrev>

      <template v-for="(item, index) in items" :key="index">
        <PaginationListItem v-if="item.type === 'page'" :value="item.value" :class="ui.item({ class: props.ui?.item })" as-child data-part="item">
          <slot name="item" v-bind="{ item, index, page, pageCount }">
            <Button
              :color="props.page === item.value ? props.activeColor : props.color"
              :variant="props.page === item.value ? props.activeVariant : props.variant"
              :size="props.size"
              :label="String(item.value)"
              :to="props.to?.(item.value)"
              :ui="{ label: ui.label({ class: props.ui?.label }) }"
              square
            />
          </slot>
        </PaginationListItem>

        <PaginationEllipsis v-else :class="ui.ellipsis({ class: props.ui?.ellipsis })" as-child data-part="ellipsis">
          <slot name="ellipsis" :ui="ui">
            <Button as="div" :color="props.color" :variant="props.variant" :size="props.size" :icon="ellipsisIcon || appConfig.ui.icons.ellipsis" />
          </slot>
        </PaginationEllipsis>
      </template>

      <PaginationNext v-if="props.showControls || !!slots.next" :class="ui.next({ class: props.ui?.next })" as-child data-part="next">
        <slot name="next">
          <Button :color="props.color" :variant="props.variant" :size="props.size" :icon="nextIcon" :to="page < pageCount ? props.to?.(page + 1) : undefined" />
        </slot>
      </PaginationNext>
      <PaginationLast v-if="props.showControls || !!slots.last" :class="ui.last({ class: props.ui?.last })" as-child data-part="last">
        <slot name="last">
          <Button :color="props.color" :variant="props.variant" :size="props.size" :icon="lastIcon" :to="props.to?.(pageCount)" />
        </slot>
      </PaginationLast>
    </PaginationList>
  </PaginationRoot>
</template>
