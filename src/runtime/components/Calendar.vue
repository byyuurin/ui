<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { DateValue } from '@internationalized/date'
import type { CalendarCellTriggerProps, CalendarRootEmits, CalendarRootProps, DateRange, RangeCalendarRootEmits, RangeCalendarRootProps } from 'reka-ui'
import theme from '#build/ui/calendar'
import type { ButtonProps, ComponentBaseProps, ComponentUIProps, IconProps, LinkPropsKeys, RuntimeAppConfig } from '../types'
import type { MaybeNull, StaticSlot } from '../types/utils'

type CalendarDefaultValue<R extends boolean = false, M extends boolean = false> = R extends true
  ? DateRange
  : M extends true ? DateValue[] : DateValue

type CalendarModelValue<R extends boolean = false, M extends boolean = false> = R extends true
  ? MaybeNull<DateRange>
  : M extends true
    ? (DateValue[] | undefined)
    : (DateValue | undefined)

type _CalendarRootProps = Omit<CalendarRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'dir' | 'locale' | 'calendarLabel' | 'multiple'>
type _RangeCalendarRootProps = Omit<RangeCalendarRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'dir' | 'locale' | 'calendarLabel' | 'multiple'>

type ThemeVariants = VariantProps<typeof theme>

export interface CalendarProps<R extends boolean = false, M extends boolean = false> extends ComponentBaseProps, _CalendarRootProps, _RangeCalendarRootProps {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: CalendarRootProps['as']
  /**
   * The icon to use for the next year control.
   * @default app.icons.chevronDoubleRight
   */
  nextYearIcon?: IconProps['name']
  /**
   * Configure the next year button.
   */
  nextYear?: Omit<ButtonProps, LinkPropsKeys>
  /**
   * The icon to use for the next month control.
   * @default app.icons.chevronRight
   */
  nextMonthIcon?: IconProps['name']
  /**
   * Configure the next month button.
   */
  nextMonth?: Omit<ButtonProps, LinkPropsKeys>
  /**
   * The icon to use for the previous year control.
   * @default app.icons.chevronDoubleLeft
   */
  prevYearIcon?: IconProps['name']
  /**
   * Configure the prev year button.
   */
  prevYear?: Omit<ButtonProps, LinkPropsKeys>
  /**
   * The icon to use for the previous month control.
   * @default app.icons.chevronLeft
   */
  prevMonthIcon?: IconProps['name']
  /**
   * Configure the prev month button.
   */
  prevMonth?: Omit<ButtonProps, LinkPropsKeys>
  /**
   * @default "md"
   */
  size?: ThemeVariants['size']
  color?: ThemeVariants['color']
  variant?: ThemeVariants['variant']
  /** Whether or not a range of dates can be selected */
  range?: R & boolean
  /** Whether or not multiple dates can be selected */
  multiple?: M & boolean
  /** Show month controls */
  monthControls?: boolean
  /** Show year controls */
  yearControls?: boolean
  defaultValue?: CalendarDefaultValue<R, M>
  modelValue?: CalendarDefaultValue<R, M>
  ui?: ComponentUIProps<typeof theme>
}

export interface CalendarEmits<R extends boolean, M extends boolean> extends Omit<CalendarRootEmits & RangeCalendarRootEmits, 'update:modelValue'> {
  'update:modelValue': [date: CalendarModelValue<R, M>]
}

export interface CalendarSlots {
  'heading': StaticSlot<{ value: string }>
  'day': StaticSlot<Pick<CalendarCellTriggerProps, 'day'>>
  'week-day': StaticSlot<{ day: string }>
}
</script>

<script setup lang="ts" generic="R extends boolean, M extends boolean">
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from 'reka-ui'
import { Calendar as BaseCalendar, RangeCalendar } from 'reka-ui/namespaced'
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { pick } from '../utils'
import { cv, merge } from '../utils/style'
import Button from './Button.vue'

const props = withDefaults(defineProps<CalendarProps<R, M>>(), {
  fixedWeeks: true,
  monthControls: true,
  yearControls: true,
  numberOfMonths: 1,
})
const emit = defineEmits<CalendarEmits<R, M>>()
defineSlots<CalendarSlots>()

const rootProps = useForwardPropsEmits(reactiveOmit(props, 'range', 'modelValue', 'defaultValue', 'size', 'color', 'variant', 'monthControls', 'yearControls', 'class', 'ui'), emit)

const { dir, t } = useLocale()

const appConfig = useAppConfig() as RuntimeAppConfig

const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.calendar))

  return styler({
    ...pick(props, ['color', 'variant', 'size']),
    outsideView: props.numberOfMonths === 1,
  })
})

const nextYearIcon = computed(() => props.nextYearIcon || (dir.value === 'rtl' ? appConfig.ui.icons.chevronDoubleLeft : appConfig.ui.icons.chevronDoubleRight))
const nextMonthIcon = computed(() => props.nextMonthIcon || (dir.value === 'rtl' ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight))
const prevYearIcon = computed(() => props.prevYearIcon || (dir.value === 'rtl' ? appConfig.ui.icons.chevronDoubleRight : appConfig.ui.icons.chevronDoubleLeft))
const prevMonthIcon = computed(() => props.prevMonthIcon || (dir.value === 'rtl' ? appConfig.ui.icons.chevronRight : appConfig.ui.icons.chevronLeft))

function paginateYear(date: DateValue, sign: -1 | 1) {
  if (sign === -1)
    return date.subtract({ years: 1 })

  return date.add({ years: 1 })
}

const Calendar = computed(() => props.range ? RangeCalendar : BaseCalendar)
</script>

<template>
  <Calendar.Root
    v-slot="{ weekDays, grid }"
    v-bind="rootProps"
    :model-value="(props.modelValue as DateValue | DateValue[])"
    :default-value="(props.defaultValue as DateValue)"
    :class="ui.root({ class: [props.class, props.ui?.root] })"
    data-part="root"
  >
    <Calendar.Header :class="ui.header({ class: props.ui?.header })" data-part="header">
      <Calendar.Prev v-if="props.yearControls" :prev-page="date => paginateYear(date, -1)" :aria-label="t('calendar.prevYear')" as-child>
        <Button :icon="prevYearIcon" :size="props.size" color="neutral" variant="ghost" v-bind="props.prevYear" />
      </Calendar.Prev>
      <Calendar.Prev v-if="props.monthControls" :aria-label="t('calendar.prevMonth')" as-child>
        <Button :icon="prevMonthIcon" :size="props.size" color="neutral" variant="ghost" v-bind="props.prevMonth" />
      </Calendar.Prev>

      <Calendar.Heading v-slot="{ headingValue }" :class="ui.heading({ class: props.ui?.heading })" data-part="heading">
        <slot name="heading" :value="headingValue">
          {{ headingValue }}
        </slot>
      </Calendar.Heading>
      <Calendar.Next v-if="props.monthControls" :aria-label="t('calendar.nextMonth')" as-child>
        <Button :icon="nextMonthIcon" :size="props.size" color="neutral" variant="ghost" v-bind="props.nextMonth" />
      </Calendar.Next>
      <Calendar.Next v-if="props.yearControls" :next-page="(date) => paginateYear(date, 1)" :aria-label="t('calendar.nextYear')" as-child>
        <Button :icon="nextYearIcon" :size="props.size" color="neutral" variant="ghost" v-bind="props.nextYear" />
      </Calendar.Next>
    </Calendar.Header>
    <div :class="ui.body({ class: props.ui?.body })" data-part="body">
      <Calendar.Grid
        v-for="month in grid"
        :key="month.value.toString()"
        :class="ui.grid({ class: props.ui?.grid })"
        data-part="grid"
      >
        <Calendar.GridHead>
          <Calendar.GridRow :class="ui.gridWeekDaysRow({ class: props.ui?.gridWeekDaysRow })" data-part="gridWeekDaysRow">
            <Calendar.HeadCell v-for="day in weekDays" :key="day" :class="ui.headCell({ class: props.ui?.headCell })" data-part="headCell">
              <slot name="week-day" :day="day">
                {{ day }}
              </slot>
            </Calendar.HeadCell>
          </Calendar.GridRow>
        </Calendar.GridHead>
        <Calendar.GridBody :class="ui.gridBody({ class: props.ui?.gridBody })" data-part="gridBody">
          <Calendar.GridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDates-${index}`"
            :class="ui.gridRow({ class: props.ui?.gridRow })"
            data-part="gridRow"
          >
            <Calendar.Cell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
              :class="ui.cell({ class: props.ui?.cell })"
              data-part="cell"
            >
              <Calendar.CellTrigger
                :day="weekDate"
                :month="month.value"
                :class="ui.cellTrigger({ class: props.ui?.cellTrigger })"
                data-part="cellTrigger"
              >
                <slot name="day" :day="weekDate">
                  {{ weekDate.day }}
                </slot>
              </Calendar.CellTrigger>
            </Calendar.Cell>
          </Calendar.GridRow>
        </Calendar.GridBody>
      </Calendar.Grid>
    </div>
  </Calendar.Root>
</template>
