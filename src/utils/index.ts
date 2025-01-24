import type { InjectionKey } from 'vue'
import { inject as vueInject, provide as vueProvide } from 'vue'

export function createInjection<T>(name: string): {
  injectionKey: InjectionKey<T>
  provide: (value: T) => void
  inject: () => T | undefined
}

export function createInjection<T>(name: string, defaultValue: T,): {
  injectionKey: InjectionKey<T>
  provide: (value: T) => void
  inject: () => T
}

export function createInjection<T>(
  name: string,
  defaultValue?: T,
) {
  const injectionKey: InjectionKey<T> = Symbol(name)
  const provide = (value: T) => vueProvide(injectionKey, value)
  const inject = () => vueInject(injectionKey, defaultValue)

  return {
    injectionKey,
    provide,
    inject,
  }
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
