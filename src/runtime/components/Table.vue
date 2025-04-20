<script lang="ts">
import type { CellContext, ColumnDef, ColumnFiltersOptions, ColumnFiltersState, ColumnOrderState, ColumnPinningOptions, ColumnPinningState, ColumnSizingInfoState, ColumnSizingOptions, ColumnSizingState, CoreOptions, ExpandedOptions, ExpandedState, FacetedOptions, GlobalFilterOptions, GroupingOptions, GroupingState, HeaderContext, PaginationOptions, PaginationState, Row, RowData, RowPinningOptions, RowPinningState, RowSelectionOptions, RowSelectionState, SortingOptions, SortingState, Updater, VisibilityOptions, VisibilityState } from '@tanstack/vue-table'
import type { PrimitiveProps } from 'reka-ui'
import type { Ref } from 'vue'
import type { table } from '../theme'
import type { ComponentAttrs } from '../types'

type DynamicHeaderSlots<T, K = keyof T> = Record<string, (props: HeaderContext<T, unknown>) => any> & Record<`${K extends string ? K : never}-header`, (props: HeaderContext<T, unknown>) => any>

type DynamicCellSlots<T, K = keyof T> = Record<string, (props: CellContext<T, unknown>) => any> & Record<`${K extends string ? K : never}-cell`, (props: CellContext<T, unknown>) => any>

export type TableSlots<T> = {
  expanded?: (props: { row: Row<T> }) => any
  empty?: any
  loading?: any
  caption?: any
} & DynamicHeaderSlots<T> & DynamicCellSlots<T>

export type TableData = RowData
export type TableColumn<T extends TableData, D = unknown> = ColumnDef<T, D> & { title?: string }

export interface TableOptions<T extends TableData> extends Omit<CoreOptions<T>, 'data' | 'columns' | 'getCoreRowModel' | 'state' | 'onStateChange' | 'renderFallbackValue'> {
  state?: CoreOptions<T>['state']
  onStateChange?: CoreOptions<T>['onStateChange']
  renderFallbackValue?: CoreOptions<T>['renderFallbackValue']
}

export interface TableProps<T extends TableData> extends ComponentAttrs<typeof table>, TableOptions<T> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  data?: T[]
  columns?: TableColumn<T>[]
  caption?: string
  /**
   * The text to display when the table is empty.
   * @default t('table.noData')
   */
  empty?: string
  /**
   * Whether the table should have a sticky header.
   * @default false
   */
  sticky?: boolean
  /** Whether the table should be in loading state. */
  loading?: boolean
  /**
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/global-filtering#table-options)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/global-filtering)
   */
  globalFilterOptions?: Omit<GlobalFilterOptions<T>, 'onGlobalFilterChange'>
  /**
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#table-options)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  columnFiltersOptions?: Omit<ColumnFiltersOptions<T>, 'getFilteredRowModel' | 'onColumnFiltersChange'>
  /**
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-pinning#table-options)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-pinning)
   */
  columnPinningOptions?: Omit<ColumnPinningOptions, 'onColumnPinningChange'>
  /**
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-sizing#table-options)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-sizing)
   */
  columnSizingOptions?: Omit<ColumnSizingOptions, 'onColumnSizingChange' | 'onColumnSizingInfoChange'>
  /**
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-visibility#table-options)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-visibility)
   */
  visibilityOptions?: Omit<VisibilityOptions, 'onColumnVisibilityChange'>
  /**
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/sorting#table-options)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/sorting)
   */
  sortingOptions?: Omit<SortingOptions<T>, 'getSortedRowModel' | 'onSortingChange'>
  /**
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/grouping#table-options)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/grouping)
   */
  groupingOptions?: Omit<GroupingOptions, 'onGroupingChange'>
  /**
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/expanding#table-options)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/expanding)
   */
  expandedOptions?: Omit<ExpandedOptions<T>, 'getExpandedRowModel' | 'onExpandedChange'>
  /**
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/row-selection#table-options)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/row-selection)
   */
  rowSelectionOptions?: Omit<RowSelectionOptions<T>, 'onRowSelectionChange'>
  /**
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/row-pinning#table-options)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/row-pinning)
   */
  rowPinningOptions?: Omit<RowPinningOptions<T>, 'onRowPinningChange'>
  /**
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/pagination#table-options)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/pagination)
   */
  paginationOptions?: Omit<PaginationOptions, 'onPaginationChange'>
  /**
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-faceting#table-options)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-faceting)
   */
  facetedOptions?: FacetedOptions<T>
}
</script>

<script setup lang="ts" generic="T extends TableData">
import { FlexRender, getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getSortedRowModel, useVueTable } from '@tanstack/vue-table'
import { reactiveOmit } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { upperFirst } from 'scule'
import { computed } from 'vue'
import { useLocale } from '../composables/useLocale'
import { useTheme } from '../composables/useTheme'

const props = defineProps<TableProps<T>>()
const slots = defineSlots<TableSlots<T>>()

const globalFilterState = defineModel<string>('globalFilter', { default: undefined })
const columnFiltersState = defineModel<ColumnFiltersState>('columnFilters', { default: [] })
const columnOrderState = defineModel<ColumnOrderState>('columnOrder', { default: [] })
const columnVisibilityState = defineModel<VisibilityState>('columnVisibility', { default: {} })
const columnPinningState = defineModel<ColumnPinningState>('columnPinning', { default: {} })
const columnSizingState = defineModel<ColumnSizingState>('columnSizing', { default: {} })
const columnSizingInfoState = defineModel<ColumnSizingInfoState>('columnSizingInfo', { default: {} })
const rowSelectionState = defineModel<RowSelectionState>('rowSelection', { default: {} })
const rowPinningState = defineModel<RowPinningState>('rowPinning', { default: {} })
const sortingState = defineModel<SortingState>('sorting', { default: [] })
const groupingState = defineModel<GroupingState>('grouping', { default: [] })
const expandedState = defineModel<ExpandedState>('expanded', { default: {} })
const paginationState = defineModel<PaginationState>('pagination', { default: {} })

const data = computed(() => props.data ?? [])
const columns = computed<TableColumn<T>[]>(
  () =>
    props.columns ?? Object.keys(data.value[0] ?? {}).map(
      (accessorKey: string) => ({ accessorKey, header: upperFirst(accessorKey) }),
    ),
)

const tableApi = useVueTable({
  ...reactiveOmit(props, 'data', 'columns', 'caption', 'sticky', 'loading', 'class', 'ui'),
  data,
  columns: columns.value,
  getCoreRowModel: getCoreRowModel(),

  ...props.globalFilterOptions,
  onGlobalFilterChange: (updaterOrValue) => valueUpdater(updaterOrValue, globalFilterState),

  ...props.columnFiltersOptions,
  getFilteredRowModel: getFilteredRowModel(),
  onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFiltersState),
  onColumnOrderChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnOrderState),

  ...props.visibilityOptions,
  onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibilityState),

  ...props.columnPinningOptions,
  onColumnPinningChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnPinningState),

  ...props.columnSizingOptions,
  onColumnSizingChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnSizingState),
  onColumnSizingInfoChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnSizingInfoState),

  ...props.rowSelectionOptions,
  onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelectionState),

  ...props.rowPinningOptions,
  onRowPinningChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowPinningState),

  ...props.sortingOptions,
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sortingState),

  ...props.groupingOptions,
  onGroupingChange: (updaterOrValue) => valueUpdater(updaterOrValue, groupingState),

  ...props.expandedOptions,
  getExpandedRowModel: getExpandedRowModel(),
  onExpandedChange: (updaterOrValue) => valueUpdater(updaterOrValue, expandedState),

  ...props.paginationOptions,
  onPaginationChange: (updaterOrValue) => valueUpdater(updaterOrValue, paginationState),

  ...props.facetedOptions,
  state: {
    get globalFilter() {
      return globalFilterState.value
    },
    get columnFilters() {
      return columnFiltersState.value
    },
    get columnOrder() {
      return columnOrderState.value
    },
    get columnVisibility() {
      return columnVisibilityState.value
    },
    get columnPinning() {
      return columnPinningState.value
    },
    get expanded() {
      return expandedState.value
    },
    get rowSelection() {
      return rowSelectionState.value
    },
    get sorting() {
      return sortingState.value
    },
    get grouping() {
      return groupingState.value
    },
    get rowPinning() {
      return rowPinningState.value
    },
    get columnSizing() {
      return columnSizingState.value
    },
    get columnSizingInfo() {
      return columnSizingInfoState.value
    },
    get pagination() {
      return paginationState.value
    },
  },
})

function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value = typeof updaterOrValue === 'function' ? updaterOrValue(ref.value) : updaterOrValue
}

const { t } = useLocale()
const { generateStyle } = useTheme()
const style = computed(() => generateStyle('table', props))

defineExpose({
  tableApi,
})
</script>

<template>
  <Primitive :as="props.as" :class="style.root({ class: [props.class, props.ui?.root] })" data-part="root">
    <table :class="style.base({ class: props.ui?.base })" data-part="base">
      <caption v-if="props.caption || slots.caption" :class="style.caption({ class: props.caption })" data-part="caption">
        <slot name="caption">
          {{ props.caption }}
        </slot>
      </caption>

      <thead :class="style.thead({ class: props.ui?.thead })" data-part="thead">
        <tr v-for="headerGroup in tableApi.getHeaderGroups()" :key="headerGroup.id" :class="style.tr({ class: props.ui?.tr })" data-part="tr">
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            :data-pinned="header.column.getIsPinned()"
            :class="style.th({ class: props.ui?.th, pinned: !!header.column.getIsPinned() })"
            data-part="th"
          >
            <slot :name="`${header.id}-header`" v-bind="header.getContext()">
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext" />
            </slot>
          </th>
        </tr>
      </thead>

      <tbody :class="style.tbody({ class: props.ui?.tbody })" data-part="tbody">
        <template v-if="tableApi.getRowModel().rows.length > 0">
          <template v-for="row in tableApi.getRowModel().rows" :key="row.id">
            <tr :data-selected="row.getIsSelected()" :data-expanded="row.getIsExpanded()" :class="style.tr({ class: props.ui?.tr })">
              <td
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                :class="style.td({ class: props.ui?.td, pinned: !!cell.column.getIsPinned() })"
                data-part="td"
                :data-pinned="cell.column.getIsPinned()"
              >
                <slot :name="`${cell.column.id}-cell`" v-bind="cell.getContext()">
                  <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                </slot>
              </td>
            </tr>
            <tr v-if="row.getIsExpanded()" :class="style.tr({ class: props.ui?.tr, expanded: true })" data-part="tr">
              <td :colspan="row.getAllCells().length" :class="style.td({ class: props.ui?.td })" data-part="td">
                <slot name="expanded" :row="row"></slot>
              </td>
            </tr>
          </template>
        </template>

        <tr v-else-if="props.loading && slots.loading">
          <td :colspan="columns.length" :class="style.loading({ class: props.ui?.loading })" data-part="loading">
            <slot name="loading"></slot>
          </td>
        </tr>

        <tr v-else :class="style.tr({ class: props.ui?.tr })" data-part="tr">
          <td :colspan="columns.length" :class="style.empty({ class: props.ui?.empty })" data-part="empty">
            <slot name="empty">
              {{ props.empty || t('table.noData') }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </Primitive>
</template>
