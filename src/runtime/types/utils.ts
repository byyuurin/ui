import type { ClassValue, CTReturn, CVReturnType, VariantProps } from '@byyuurin/ui-kit'
import type { AcceptableValue as RekaAcceptableValue } from 'reka-ui'

export type MaybeArray<T> = T | T[]

export type AcceptableValue = Exclude<RekaAcceptableValue, Record<string, any>>

export type EmitsToProps<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: T[K] extends [...args: infer Args]
    ? (...args: Args) => void
    : never
}

type AllKeys<T> = T extends any ? keyof T : never
type NonCommonKeys<T extends object> = Exclude<AllKeys<T>, keyof T>
type PickTypeOf<T, K extends string | number | symbol> = K extends AllKeys<T>
  ? T extends { [k in K]?: any }
    ? T[K]
    : undefined
  : never

export type MergeTypes<T extends object> = {
  [TK in keyof T]: PickTypeOf<T, TK>;
} & {
  [TK in NonCommonKeys<T>]?: PickTypeOf<T, TK>;
}

// ref: https://github.com/nuxt/ui/pull/3331
export type DynamicSlots<
  T extends { slot?: string },
  SlotExtra extends string | undefined = undefined,
  SlotProps extends object = Record<string, never>,
> = {
  [ K in T['slot'] as K extends string
    ? SlotExtra extends string
      ? (K | `${K}-${SlotExtra}`)
      : K
    : never
  ]?: (props: { item: Extract<T, { slot: K extends `${infer Base}-${SlotExtra}` ? Base : K }> } & Omit<SlotProps, 'item'>) => any
}

export type ArrayOrNested<T> = T[] | T[][]
export type NestedItem<T> = T extends Array<infer I> ? NestedItem<I> : T
export type GetItemKeys<T> = keyof Extract<NestedItem<T>, object>
export type GetItemValue<I, VK extends GetItemKeys<I> | undefined, T extends NestedItem<I> = NestedItem<I>> =
  T extends object
    ? VK extends undefined
      ? T
      : VK extends keyof T ? T[VK] : never
    : T

export type GetModelValue<
  T,
  VK extends GetItemKeys<T> | undefined,
  M extends boolean,
> = M extends true
  ? GetItemValue<T, VK>[]
  : GetItemValue<T, VK>

export interface GetModelValueEmits<
  T,
  VK extends GetItemKeys<T> | undefined,
  M extends boolean,
> {
  /** Event handler called when the value changes. */
  'update:modelValue': [payload: GetModelValue<T, VK, M>]
}

export type GetObjectField<MaybeObject, Key extends string> = MaybeObject extends Record<string, any>
  ? MaybeObject[Key]
  : never

export interface ComponentAttrs<T> {
  class?: MaybeArray<string | Record<string, boolean>>
  ui?: T extends { slots: infer S }
    ? { [Slot in keyof S]?: string }
    : never
}

export type StylerTheme<T> = T extends CTReturn<infer V, any, any, infer B, infer S>
  ? CVReturnType<V, S, B>
  : never

export interface StylerBaseProps {
  class?: ClassValue
}

export type StylerProps<T> = T extends CTReturn<infer V, any, any, infer B, infer S>
  ? Parameters<Styler<CVReturnType<V, S, B>>>[0]
  : never

export type StylerReturnType<T> = T extends CVReturnType<infer V, infer S, infer B>
  ? ReturnType<CVReturnType<V, S, B>>
  : never

export type Styler<T> = T extends CVReturnType<infer V, any, any>
  ? [keyof V] extends string[]
      ? (props: VariantProps<T> & StylerBaseProps) => StylerReturnType<T>
      : (props?: StylerBaseProps) => StylerReturnType<T>
  : never
