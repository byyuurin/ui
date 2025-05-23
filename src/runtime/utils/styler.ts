import type { ClassValue, CRRule, CVCompoundVariants, CVDefaultVariants, CVParts, CVScope, CVVariants } from '@byyuurin/ui-kit'
import { cv } from '@byyuurin/ui-kit'
import type { Styler } from '../types'

export function prepareStyler(rules: CRRule[] = []) {
  const createVariants = cv(rules)

  function createStyler<
    V extends CVVariants<P, B>,
    CV extends CVCompoundVariants<V, P, B>,
    DV extends CVDefaultVariants<V, P>,
    B extends ClassValue = undefined,
    P extends CVParts = undefined,
  >(
    scope: CVScope<V, CV, DV, B, P>,
  ) {
    const ui = createVariants(scope)
    const styler: Styler<typeof ui> = (props: any) => ui(props)
    return styler
  }

  return { createStyler }
}
