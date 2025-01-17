import type { InjectionKey, MaybeRefOrGetter } from 'vue'
import { inject as vueInject, provide as vueProvide, toValue } from 'vue'

export function createInjection<T>(
  name: string,
  defaultValue?: MaybeRefOrGetter<T>,
) {
  const injectionKey: InjectionKey<T> = Symbol(name)
  const provide = (value: T) => vueProvide(injectionKey, value)
  const inject = () => vueInject(injectionKey, toValue(defaultValue))

  return {
    injectionKey,
    provide,
    inject,
  }
}
