<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { DateValue } from '@internationalized/date'
import type { CalendarCellTriggerProps, CalendarRootEmits, CalendarRootProps, DateRange, RangeCalendarRootEmits, RangeCalendarRootProps } from 'reka-ui'
import type { calendar } from '../theme'
import type { ComponentAttrs } from '../types'

export interface CalendarEmits<R extends boolean, M extends boolean> extends Omit<CalendarRootEmits & RangeCalendarRootEmits, 'update:modelValue'> {
  'update:modelValue': [date: CalendarModelValue<R, M>]
}

export interface CalendarSlots {
  'heading'?: (props: { value: string }) => any
  'day'?: (props: Pick<CalendarCellTriggerProps, 'day'>) => any
  'week-day'?: (props: { day: string }) => any
}

type CalendarVariants = VariantProps<typeof calendar>

type CalendarDefaultValue<R extends boolean = false, M extends boolean = false> = R extends true
  ? DateRange
  : M extends true ? DateValue[] : DateValue

type CalendarModelValue<R extends boolean = false, M extends boolean = false> = R extends true
  ? (DateRange | null)
  : M extends true
    ? (DateValue[] | undefined)
    : (DateValue | undefined)

type _CalendarRootProps = Omit<CalendarRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'dir' | 'locale' | 'calendarLabel' | 'multiple'>
type _RangeCalendarRootProps = Omit<RangeCalendarRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'dir' | 'locale' | 'calendarLabel' | 'multiple'>

export interface CalendarProps<R extends boolean = false, M extends boolean = false> extends ComponentAttrs<typeof calendar>, _CalendarRootProps, _RangeCalendarRootProps {
  /**
   * The icon to use for the next year control.
   * @default app.icons.chevronDoubleRight
   */
  nextYearIcon?: string
  /**
   * The icon to use for the next month control.
   * @default app.icons.chevronRight
   */
  nextMonthIcon?: string
  /**
   * The icon to use for the previous year control.
   * @default app.icons.chevronDoubleLeft
   */
  prevYearIcon?: string
  /**
   * The icon to use for the previous month control.
   * @default app.icons.chevronLeft
   */
  prevMonthIcon?: string
  /**
   * @default "md"
   */
  size?: CalendarVariants['size']
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
}
</script>

<script setup lang="ts" generic="R extends boolean, M extends boolean">
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from 'reka-ui'
import { Calendar as BaseCalendar, RangeCalendar } from 'reka-ui/namespaced'
import { computed } from 'vue'
import { useLocale } from '../composables/useLocale'
import { useTheme } from '../composables/useTheme'
import Button from './Button.vue'

const props = withDefaults(defineProps<CalendarProps<R, M>>(), {
  fixedWeeks: true,
  monthControls: true,
  yearControls: true,
})
const emit = defineEmits<CalendarEmits<R, M>>()
defineSlots<CalendarSlots>()

const rootProps = useForwardPropsEmits(reactiveOmit(props, 'range', 'modelValue', 'defaultValue', 'size', 'monthControls', 'yearControls', 'class', 'ui'), emit)

const { code: locale, dir, t } = useLocale()
const { theme, generateStyle } = useTheme()

const nextYearIcon = computed(() => props.nextYearIcon || (dir.value === 'rtl' ? theme.value.app.icons.chevronDoubleLeft : theme.value.app.icons.chevronDoubleRight))
const nextMonthIcon = computed(() => props.nextMonthIcon || (dir.value === 'rtl' ? theme.value.app.icons.chevronLeft : theme.value.app.icons.chevronRight))
const prevYearIcon = computed(() => props.prevYearIcon || (dir.value === 'rtl' ? theme.value.app.icons.chevronDoubleRight : theme.value.app.icons.chevronDoubleLeft))
const prevMonthIcon = computed(() => props.prevMonthIcon || (dir.value === 'rtl' ? theme.value.app.icons.chevronRight : theme.value.app.icons.chevronLeft))

function paginateYear(date: DateValue, sign: -1 | 1) {
  if (sign === -1)
    return date.subtract({ years: 1 })

  return date.add({ years: 1 })
}

const Calendar = computed(() => props.range ? RangeCalendar : BaseCalendar)

const style = computed(() => generateStyle('calendar', props))
</script>

<template>
  <Calendar.Root
    v-slot="{ weekDays, grid }"
    v-bind="rootProps"
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    :locale="locale"
    :dir="dir"
    :class="style.root({ class: [props.class, props.ui?.root] })"
    data-part="root"
  >
    <Calendar.Header :class="style.header({ class: props.ui?.header })" data-part="header">
      <Calendar.Prev v-if="props.yearControls" :prev-page="date => paginateYear(date, -1)" :aria-label="t('calendar.prevYear')" as-child>
        <Button :icon="prevYearIcon" :size="props.size" variant="ghost" />
      </Calendar.Prev>
      <Calendar.Prev v-if="props.monthControls" :aria-label="t('calendar.prevMonth')" as-child>
        <Button :icon="prevMonthIcon" :size="props.size" variant="ghost" />
      </Calendar.Prev>

      <Calendar.Heading v-slot="{ headingValue }" :class="style.heading({ class: props.ui?.heading })" data-part="heading">
        <slot name="heading" :value="headingValue">
          {{ headingValue }}
        </slot>
      </Calendar.Heading>
      <Calendar.Next v-if="props.monthControls" :aria-label="t('calendar.nextMonth')" as-child>
        <Button :icon="nextMonthIcon" :size="props.size" variant="ghost" />
      </Calendar.Next>
      <Calendar.Next v-if="props.yearControls" :next-page="(date) => paginateYear(date, 1)" :aria-label="t('calendar.nextYear')" as-child>
        <Button :icon="nextYearIcon" :size="props.size" variant="ghost" />
      </Calendar.Next>
    </Calendar.Header>
    <div :class="style.body({ class: props.ui?.body })" data-part="body">
      <Calendar.Grid
        v-for="month in grid"
        :key="month.value.toString()"
        :class="style.grid({ class: props.ui?.grid })"
        data-part="grid"
      >
        <Calendar.GridHead>
          <Calendar.GridRow :class="style.gridWeekDaysRow({ class: props.ui?.gridWeekDaysRow })" data-part="grid-week-day-row">
            <Calendar.HeadCell v-for="day in weekDays" :key="day" :class="style.headCell({ class: props.ui?.headCell })" data-part="head-cell">
              <slot name="week-day" :day="day">
                {{ day }}
              </slot>
            </Calendar.HeadCell>
          </Calendar.GridRow>
        </Calendar.GridHead>
        <Calendar.GridBody :class="style.gridBody({ class: props.ui?.gridBody })" data-part="grid-body">
          <Calendar.GridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDates-${index}`"
            :class="style.gridRow({ class: props.ui?.gridRow })"
            data-part="grid-row"
          >
            <Calendar.Cell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
              :class="style.cell({ class: props.ui?.cell })"
              data-part="cell"
            >
              <Calendar.CellTrigger
                v-slot="{ disabled, unavailable }"
                :day="weekDate"
                :month="month.value"
                as-child
              >
                <div :class="style.cellTrigger({ class: props.ui?.cellTrigger, disabled: disabled || unavailable })" data-part="cell-trigger">
                  <slot name="day" :day="weekDate">
                    {{ weekDate.day }}
                  </slot>
                </div>
              </Calendar.CellTrigger>
            </Calendar.Cell>
          </Calendar.GridRow>
        </Calendar.GridBody>
      </Calendar.Grid>
    </div>
  </Calendar.Root>
</template>
