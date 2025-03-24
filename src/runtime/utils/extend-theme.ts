import { createDefu, defu } from 'defu'

export const extendTheme = createDefu((obj: any, key, value) => {
  if (typeof obj[key] === 'string' && typeof value !== 'string') {
    // type error, skip merge
    return true
  }

  if (key === 'compoundVariants' && Array.isArray(value)) {
    obj[key] = [...obj[key], ...value]
    return true
  }

  if (Array.isArray(value)) {
    // type error, skip merge
    return true
  }

  if (key === 'app') {
    obj[key] = defu(value, obj[key])
    return true
  }

  if (typeof obj[key] === 'string' && typeof value === 'string') {
    if (value.trim())
      obj[key] += ` ${value}`

    return true
  }

  if (Array.isArray(obj[key]) && typeof obj[key][0] === 'string' && typeof value === 'string') {
    if (value.trim())
      obj[key].push(value)

    return true
  }
})
