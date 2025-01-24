import type { ClassValue, CVReturnType, VariantProps } from '@byyuurin/ui-kit'

export type HintString<T extends string> = T & (string & {})

export type MaybeArray<T> = T | T[]

export type PartialTheme<T> = {
  [P in keyof T as T[P] extends undefined ? never : P]?: T[P] extends Array<infer V>
    ? V extends string ? string : V[]
    : T[P] extends object
      ? PartialTheme<T[P]>
      : T[P] extends string
        ? string
        : T[P]
}

export type DynamicSlots<T extends { slot?: string }, SlotProps, Slot = T['slot']> =
  Record<string, SlotProps> & (Slot extends string ? Record<Slot, SlotProps> : Record<string, never>)

export interface ComponentAttrs<T> {
  class?: MaybeArray<string | Record<string, boolean>>
  ui?: T extends { slots: infer S }
    ? { [Slot in keyof S]?: string }
    : never
}

export interface StylerBaseProps {
  class?: ClassValue
}

export type StylerReturnType<T> = T extends CVReturnType<infer V, infer S, infer B>
  ? ReturnType<CVReturnType<V, S, B>>
  : never

export type Styler<T> = T extends CVReturnType<infer V, any, any>
  ? [keyof V] extends string[]
      ? (props: Required<VariantProps<T>> & StylerBaseProps) => StylerReturnType<T>
      : (props?: StylerBaseProps) => StylerReturnType<T>
  : never
