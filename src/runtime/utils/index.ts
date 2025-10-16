import type { Locale } from '@byyuurin/ui-kit'
import { get } from '@byyuurin/ui-kit'
import { isEqual } from 'ohash'
import type { Messages } from '../types'

export * from './form'
export * from './link'
export * from './vue'
export { createTranslator, get, omit, pick, set } from '@byyuurin/ui-kit'
export { looseToNumber } from '@vue/shared'

export function defineLocale(locale: Locale<Messages>) {
  return locale
}

export function compare<T>(
  value?: T,
  currentValue?: T,
  comparator?: string | ((a: T, b: T) => boolean),
) {
  if (value === undefined || currentValue === undefined)
    return false

  if (typeof value === 'string')
    return value === currentValue

  if (typeof comparator === 'function')
    return comparator(value, currentValue)

  if (typeof comparator === 'string')
    return get(value!, comparator) === get(currentValue!, comparator)

  return isEqual(value, currentValue)
}

export function isArrayOfArray<T>(item: T[] | T[][]): item is T[][] {
  return Array.isArray(item[0])
}
