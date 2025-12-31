import { reactivePick } from '@vueuse/core'
import { diff, isEqual } from 'ohash/utils'
import type { LinkProps } from '../types'

export const linkKeys = [
  'active',
  'activeClass',
  'ariaCurrentValue',
  'as',
  'disabled',
  'download',
  'exact',
  'exactActiveClass',
  'exactHash',
  'exactQuery',
  'external',
  'form',
  'formaction',
  'formenctype',
  'formmethod',
  'formnovalidate',
  'formtarget',
  'href',
  'hreflang',
  'inactiveClass',
  'media',
  'noPrefetch',
  'noRel',
  'onClick',
  'ping',
  'prefetch',
  'prefetchOn',
  'prefetchedClass',
  'referrerpolicy',
  'rel',
  'replace',
  'target',
  'title',
  'to',
  'trailingSlash',
  'type',
  'viewTransition',
] as const

export function pickLinkProps(
  link: LinkProps & { [key: string]: any },
) {
  const keys = Object.keys(link)

  const ariaKeys = keys.filter((key) => key.startsWith('aria-')) as Array<`aria-${string}`>
  const dataKeys = keys.filter((key) => key.startsWith('data-')) as Array<`data-${string}`>

  return reactivePick(
    link,
    ...linkKeys,
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
