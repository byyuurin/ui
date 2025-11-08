import { reactivePick } from '@vueuse/core'
import { diff, isEqual } from 'ohash/utils'
import type { LinkProps } from '../types'

export function pickLinkProps(
  link: LinkProps & { [key: string]: any },
) {
  const keys = Object.keys(link)

  const ariaKeys = keys.filter((key) => key.startsWith('aria-')) as Array<`aria-${string}`>
  const dataKeys = keys.filter((key) => key.startsWith('data-')) as Array<`data-${string}`>

  const pickProps: (keyof LinkProps | 'download' | 'title' | 'onClick')[] = [
    'active',
    'activeClass',
    'ariaCurrentValue',
    'as',
    'disabled',
    'exact',
    'exactActiveClass',
    'exactHash',
    'exactQuery',
    'external',
    'href',
    'download',
    'inactiveClass',
    'noPrefetch',
    'noRel',
    'prefetch',
    'prefetchedClass',
    'rel',
    'replace',
    'target',
    'to',
    'type',
    'title',
    'onClick',
    'title',
    'onClick',
  ] as const

  return reactivePick(
    link,
    ...pickProps,
    ...ariaKeys,
    ...dataKeys,
  )
}

export function isPartiallyEqual(item1: any, item2: any) {
  const diffedKeys = diff(item1, item2).reduce((filtered, q) => {
    if (q.type === 'added')
      filtered.add(q.key)

    return filtered
  }, new Set<string>())

  const item1Filtered = Object.fromEntries(Object.entries(item1).filter(([key]) => !diffedKeys.has(key)))
  const item2Filtered = Object.fromEntries(Object.entries(item2).filter(([key]) => !diffedKeys.has(key)))

  return isEqual(item1Filtered, item2Filtered)
}
