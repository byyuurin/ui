import { reactivePick } from '@vueuse/core'
import type { LinkProps } from '../types'

export function pickLinkProps(
  link: LinkProps & { [key: string]: any },
) {
  const keys = Object.keys(link)

  const ariaKeys = keys.filter((key) => key.startsWith('aria-')) as Array<`aria-${string}`>
  const dataKeys = keys.filter((key) => key.startsWith('data-')) as Array<`data-${string}`>

  const pickProps: (keyof LinkProps | 'title')[] = [
    'active',
    'activeClass',
    'ariaCurrentValue',
    'as',
    'disabled',
    'disableClass',
    'exact',
    'exactActiveClass',
    'exactHash',
    'exactQuery',
    'external',
    'href',
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
  ]

  return reactivePick(
    link,
    ...pickProps,
    ...ariaKeys,
    ...dataKeys,
  )
}
