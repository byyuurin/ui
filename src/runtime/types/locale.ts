import type { Locale as DefineLocale, LocaleDirection } from '@byyuurin/ui-kit'

export type DefineLocaleOptions<M> = DefineLocale<M>
export type Locale<M> = Required<DefineLocale<M>>
export type Direction = LocaleDirection

export interface Messages {
  alert: {
    close: string
  }
  calendar: {
    prevYear: string
    nextYear: string
    prevMonth: string
    nextMonth: string
  }
  carousel: {
    dots: string
    prev: string
    next: string
    goto: string
  }
  inputNumber: {
    increment: string
    decrement: string
  }
  modal: {
    close: string
  }
  table: {
    noData: string
  }
  toast: {
    close: string
  }
}
