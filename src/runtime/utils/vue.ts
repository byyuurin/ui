import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'

export function defineInjection<T>(name: string): {
  InjectionKey: InjectionKey<T>
  provide: (value: T) => void
  inject: () => T | undefined
}

export function defineInjection<T>(name: string, defaultValue: T): {
  InjectionKey: InjectionKey<T>
  provide: (value: T) => void
  inject: () => T
}

export function defineInjection<T>(
  name: string,
  defaultValue?: T,
) {
  const InjectionKey: InjectionKey<T> = Symbol(name)

  return {
    InjectionKey,
    provide: (value: T) => provide(InjectionKey, value),
    inject: () => inject(InjectionKey, defaultValue),
  }
}
