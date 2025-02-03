import { createDefu } from 'defu'

export const extendTheme = createDefu((obj: any, key, value) => {
  if (key === 'global') {
    obj[key] = { ...obj[key], ...value }
    return true
  }

  if (typeof obj[key] === 'string' && typeof value === 'string') {
    if (value.trim())
      obj[key] += ` ${value}`

    return true
  }

  if (Array.isArray(obj[key]) && typeof value === 'string') {
    obj[key].push(value)
    return true
  }
})
