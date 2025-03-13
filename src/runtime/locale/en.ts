import { defineLocale } from '../utils'

export default defineLocale({
  name: 'English',
  code: 'en',
  messages: {
    alert: {
      close: 'Close',
    },
    carousel: {
      prev: 'Prev',
      next: 'Next',
      goto: 'Go to slide {page}',
    },
    inputNumber: {
      increment: 'Increment',
      decrement: 'Decrement',
    },
    modal: {
      close: 'Close',
    },
    table: {
      noData: 'No data',
    },
    toast: {
      close: 'Close',
    },
  },
})
