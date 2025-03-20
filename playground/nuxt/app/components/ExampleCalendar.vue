<script setup lang="ts">
import type { CalendarProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const singleValue = ref()
const multipleValue = ref<any[]>()
const rangeValue = ref<any>()

const controls: ControlItems<CalendarProps<boolean, boolean>> = [
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'weekStartsOn', value: null, options: [0, 1, 2, 3, 4, 5, 6], placeholder: 'auto' },
  { prop: 'numberOfMonths', value: 1, min: 1 },
  { prop: 'initialFocus', value: true },
  { prop: 'yearControls', value: true },
  { prop: 'monthControls', value: true },
  { prop: 'readonly', value: false },
  { prop: 'disabled', value: false },
  { prop: 'fixedWeeks', value: false, description: 'Whether or not to always display 6 weeks in the calendar' },
]

const toMultipleAttrs = (attrs: CalendarProps<boolean, boolean>) => attrs as CalendarProps<boolean, true>
const toRangeAttrs = (attrs: CalendarProps<boolean, boolean>) => attrs as CalendarProps<true, boolean>
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Calendar"
    description="A calendar component for selecting single dates, multiple dates or date ranges."
    :controls="controls"
  >
    <div class="flex flex-wrap items-start gap-4 gap-x-8">
      <UCard title="Single">
        <UCalendar v-bind="attrs" v-model="singleValue" />
      </UCard>
      <UCard title="Multiple">
        <UCalendar v-bind="toMultipleAttrs(attrs)" v-model="multipleValue" multiple />
      </UCard>
      <UCard title="Range">
        <UCalendar v-bind="toRangeAttrs(attrs)" v-model="rangeValue" range />
      </UCard>
      <UCard title="Disable Days">
        <UCalendar v-bind="attrs" v-model="singleValue" :is-date-disabled="(date) => date.day >= 10 && date.day <= 16" />
      </UCard>
      <UCard title="Unavailable Days">
        <UCalendar v-bind="attrs" v-model="singleValue" :is-date-unavailable="(date) => date.day >= 10 && date.day <= 16" />
      </UCard>
    </div>
  </ExampleView>
</template>
