import { isEqual } from 'ohash'
import type { Messages } from '../types'
import type { Locale } from './translator'

export * from './form'
export * from './link'
export * from './translator'
export * from './vue'
export { looseToNumber } from '@vue/shared'

export function defineLocale(locale: Locale<Messages>) {
  return locale
}

export function pick<
  Data extends object,
  Keys extends keyof Data,
>(
  data: Data,
  keys: Keys[],
): Pick<Data, Keys> {
  const result = {} as Pick<Data, Keys>

  for (const key of keys)
    result[key] = data[key]

  return result
}

export function omit<
  Data extends object,
  Keys extends keyof Data,
>(
  data: Data,
  keys: Keys[],
): Omit<Data, Keys> {
  const result = { ...data }

  for (const key of keys)
    delete result[key]

  return result as Omit<Data, Keys>
}

export function get(object: Record<string, any> | undefined, path: (string | number)[] | string, defaultValue?: any): any {
  if (typeof path === 'string') {
    path = path.split('.').map((key) => {
      const numKey = Number(key)
      return Number.isNaN(numKey) ? key : numKey
    })
  }

  let result: any = object

  for (const key of path) {
    if (result === undefined || result === null)
      return defaultValue

    result = result[key]
  }

  return result === undefined ? defaultValue : result
}

export function set(object: Record<string, any>, path: (string | number)[] | string, value: any): void {
  if (typeof path === 'string') {
    path = path.split('.').map((key) => {
      const numKey = Number(key)
      return Number.isNaN(numKey) ? key : numKey
    })
  }

  path.reduce((acc, key, i) => {
    if (acc[key] === undefined)
      acc[key] = {}

    if (i === path.length - 1)
      acc[key] = value

    return acc[key]
  }, object)
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
