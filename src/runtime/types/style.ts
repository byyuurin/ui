import type { ClassProp, ClassValue, CVDefaultVariants, CVParts, CVScopeMeta, CVVariants, MaybeArray, StringToBoolean, VariantProps } from '@byyuurin/ui-kit'

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
      ? V extends '' ? '' : string
      : V[]
    : T[P] extends object
      ? UIConfigPartial<T[P]>
      : T[P] extends string
        ? T[P] extends '' ? '' : string
        : T[P]
}

type PartsName<P extends CVParts, B extends ClassValue> = B extends undefined ? keyof P : keyof P | 'base'

type PartsClassValue<S extends CVParts, B extends ClassValue> = {
  [K in PartsName<S, B>]?: string;
}

type CVCompoundVariants<V extends CVVariants<P>, P extends CVParts, B extends ClassValue> = Array<{
  [K in keyof V]?: MaybeArray<StringToBoolean<keyof V[K]>>;
} & (P extends undefined ? ClassProp<PartsClassValue<P, B> | string> : ClassProp<PartsClassValue<P, B>>)>

export type UIConfig<Themes extends Record<string, any>> = {
  [Component in keyof Themes]?: Themes[Component] extends CVScopeMeta<infer V, any, any, infer B, infer P>
    ? UIConfigPartial<CVScopeMeta<V, CVCompoundVariants<V, P, B>, CVDefaultVariants<V, P>, B, P>>
    : never
}
