import type { ClassValue, CRRule, CVCompoundVariants, CVDefaultVariants, CVMeta, CVSlots, CVVariants } from '@byyuurin/ui-kit'
import { cv } from '@byyuurin/ui-kit'
import type { Styler } from '../types'

export function prepareStyler(rules: CRRule[] = []) {
  const createVariants = cv(rules)

  function createStyler<
    V extends CVVariants<S, B>,
    CV extends CVCompoundVariants<V, S, B>,
    DV extends CVDefaultVariants<V, S>,
    B extends ClassValue = undefined,
    S extends CVSlots = undefined,
  >(
    theme: CVMeta<V, CV, DV, B, S>,
  ) {
    const ui = createVariants(theme)
    const styler: Styler<typeof ui> = (props: any) => ui(props)
    return styler
  }

  return { createStyler }
}
