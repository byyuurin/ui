import { reactivePick } from '@vueuse/core'
import type { InjectionKey, MaybeRefOrGetter } from 'vue'
import { inject as vueInject, provide as vueProvide, toValue } from 'vue'
import type { LinkProps } from '../components'

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

export function pickLinkProps(
  props: LinkProps & Partial<Pick<HTMLAnchorElement, 'ariaLabel' | 'title'>>,
) {
  return reactivePick(props, 'ui', 'active', 'ariaLabel', 'as', 'disabled', 'href', 'rel', 'noRel', 'type', 'target', 'title', 'onClick')
}
