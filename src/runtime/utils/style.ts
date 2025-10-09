import { createCV, cx } from '@byyuurin/ui-kit'
import { createDefu } from 'defu'
import { unoMerge } from '#build/uno-merge'

export const cv = createCV((...classValues) => unoMerge(cx(...classValues)))

const mergeFn = createDefu((obj: any, key, value) => {
  if (typeof obj[key] === 'string' && typeof value !== 'string') {
    // type error, skip merge
    return true
  }

  if (obj[key] === '') {
    // placeholder only
    return true
  }

  if (Array.isArray(value) && key !== 'compoundVariants') {
    // type error, skip merge
    return true
  }

  if (Array.isArray(value) && key === 'compoundVariants') {
    obj[key] ||= []
    obj[key] = [...obj[key], ...value].filter(Boolean)

    return true
  }

  if (typeof obj[key] === 'string' && typeof value === 'string') {
    if (value.trim())
      obj[key] += ` ${value}`

    return true
  }

  if (Array.isArray(obj[key]) && typeof obj[key][0] === 'string' && typeof value === 'string') {
    if (value.trim())
      obj[key] = [...obj[key], value]

    return true
  }
})

export function merge<T extends object, V extends object | undefined = undefined>(theme: T, overrides?: V) {
  return mergeFn(overrides || {}, theme)
}
