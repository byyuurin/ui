import type { ClassValue, CRRule, CVCompoundVariants, CVMeta, CVSlots, CVVariants } from '@byyuurin/ui-kit'
import { cv } from '@byyuurin/ui-kit'
import type { Styler } from '../types'

export function prepareStyler(rules: CRRule[] = []) {
  const createVariants = cv(rules)

  function createStyler<
    V extends CVVariants<S, B>,
    CV extends CVCompoundVariants<V, S, B>,
    B extends ClassValue = undefined,
    S extends CVSlots = undefined,
  >(
    theme: CVMeta<V, CV, never, B, S>,
  ) {
    const ui = createVariants(theme)
    const styler: Styler<typeof ui> = (props: any) => ui(props)
    return styler
  }

  return { createStyler }
}
