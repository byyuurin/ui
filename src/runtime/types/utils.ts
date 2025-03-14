import type { ClassValue, CVReturnType, VariantProps } from '@byyuurin/ui-kit'

export type HintString<T extends string> = T & (string & {})

export type MaybeArray<T> = T | T[]
export type MaybeArrayOfArray<T> = T[] | T[][]

export type MaybeArrayOfArrayItem<T> = T extends Array<infer V1>
  ? V1 extends Array<infer V2> ? V2 : V1
  : never

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
      ? (props: VariantProps<T> & StylerBaseProps) => StylerReturnType<T>
      : (props?: StylerBaseProps) => StylerReturnType<T>
  : never

export interface SelectModelValueEmits<T, V, M extends boolean = false, DV = T> {
  (event: 'update:modelValue', payload: SelectModelValue<T, V, M, DV>): void
}

export type SelectModelValue<T, V, M extends boolean = false, DV = T> = (
  T extends Record<string, any>
    ? V extends keyof T
      ? T[V]
      : DV
    : T
) extends infer U
  ? M extends true
    ? U[]
    : U
  : never

export type SelectOptionKey<T> = T extends Record<string, any> ? keyof T : string
