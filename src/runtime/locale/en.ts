import { defineLocale } from '../utils/locale'

export default defineLocale({
  name: 'English',
  code: 'en',
  messages: {
    alert: {
      close: 'Close',
    },
    calendar: {
      prevYear: 'Previous year',
      nextYear: 'Next year',
      prevMonth: 'Previous month',
      nextMonth: 'Next month',
    },
    carousel: {
      dots: 'Choose slide to display',
      prev: 'Prev',
      next: 'Next',
      goto: 'Go to slide {page}',
    },
    fileUpload: {
      removeFile: 'Remove {filename}',
    },
    inputNumber: {
      increment: 'Increment',
      decrement: 'Decrement',
    },
    modal: {
      close: 'Close',
    },
    select: {
      create: 'Create "{label}"',
      noData: 'No data',
      noMatch: 'No matching data',
      search: 'Search…',
    },
    table: {
      noData: 'No data',
    },
    toast: {
      close: 'Close',
    },
  },
})
