import { get } from '@byyuurin/ui-kit'
import { isEqual } from 'ohash'
import type { GetItemKeys, Nullable } from '../types/utils'

export * from './form'
export * from './link'
export * from './vue'
export { get, omit, pick, set } from '@byyuurin/ui-kit'
export { looseToNumber } from '@vue/shared'

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

export function isEmpty(value: unknown): boolean {
  if (value == null)
    return true

  if (typeof value === 'boolean' || typeof value === 'number')
    return false

  if (typeof value === 'string')
    return value.trim().length === 0

  if (Array.isArray(value))
    return value.length === 0

  if (value instanceof Map || value instanceof Set)
    return value.size === 0

  if (value instanceof Date || value instanceof RegExp || typeof value === 'function')
    return false

  if (typeof value === 'object') {
    for (const _ in value as object) {
      if (Object.hasOwn(value, _))
        return false
    }

    return true
  }

  return false
}

export function getDisplayValue<T extends Array<any>, V>(
  items: T,
  value: Nullable<V>,
  options: {
    valueKey?: GetItemKeys<T>
    labelKey?: GetItemKeys<T>
  } = {},
): string | undefined {
  const { valueKey, labelKey } = options

  const foundItem = items.find((item) => {
    const itemValue = (typeof item === 'object' && item !== null && valueKey)
      ? get(item, valueKey as string)
      : item
    return compare(itemValue, value)
  })

  if (isEmpty(value) && foundItem)
    return labelKey ? get(foundItem as Record<string, any>, labelKey as string) : undefined

  if (isEmpty(value))
    return undefined

  const source = foundItem ?? value

  if (source === null || source === undefined)
    return undefined

  if (typeof source === 'object')
    return labelKey ? get(source as Record<string, any>, labelKey as string) : undefined

  return String(source)
}

export function isArrayOfArray<T>(item: T[] | T[][]): item is T[][] {
  return Array.isArray(item[0])
}
