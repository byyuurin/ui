import type { ClassValue, CVCompoundVariants, CVDefaultVariants, CVScopeMeta, VariantProps } from '@byyuurin/ui-kit'

export interface ComponentBaseProps {
  class?: ClassValue
}

export type ComponentStyler<T> = T extends { parts: infer P, variants: infer V }
  ? {
      [Part in keyof P]: V extends undefined
        ? (props: { class?: ClassValue }) => string
        : (props?: VariantProps<T> & { class?: ClassValue }) => string
    }
  : Record<string, never>

export type ComponentUIProps<T> = T extends { parts: infer P }
  ? { [Part in keyof P]?: string }
  : Record<string, never>

type UIConfigPartial<T> = {
  [P in keyof T as T[P] extends undefined ? never : P]?: T[P] extends Array<infer V>
    ? V extends string
      ? V extends '' ? '' : V
      : V[]
    : T[P] extends object
      ? UIConfigPartial<T[P]>
      : T[P] extends string
        ? T[P] extends '' ? '' : string
        : T[P]
}

type _Variants<T> = T & Record<string, never>

export type UIConfig<Themes extends Record<string, any>> = {
  [Component in keyof Themes]?: Themes[Component] extends CVScopeMeta<infer V, any, any, infer B, infer P>
    ? UIConfigPartial<CVScopeMeta<_Variants<V>, CVCompoundVariants<_Variants<V>, P, B>, CVDefaultVariants<_Variants<V>, P>, B, P>>
    : never
}
