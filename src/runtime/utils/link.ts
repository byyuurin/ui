import type {} from '@vue/shared'
import { reactivePick } from '@vueuse/core'
import type { LinkProps } from '../types'

export function pickLinkProps(
  props: LinkProps & Partial<Pick<HTMLAnchorElement, 'ariaLabel' | 'title'>>,
) {
  return reactivePick(props, 'ui', 'active', 'ariaLabel', 'as', 'disabled', 'href', 'rel', 'noRel', 'type', 'target', 'title', 'onClick')
}
