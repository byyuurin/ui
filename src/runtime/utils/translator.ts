import { get } from './index'

type DepthLimit = [1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
type DepthReduce<N extends number> = N extends keyof DepthLimit ? DepthLimit[N] : 0

export type FlatObjectPath<
  T,
  ParentPath extends string = '',
  Depth extends number = 5,
> = Depth extends 0
  ? never
  : T extends Record<string, any>
    ? {
        [TK in keyof T]: T[TK] extends Record<string, any>
          ? FlatObjectPath<T[TK], ParentPath extends '' ? TK & string : `${ParentPath}.${TK & string}`, DepthReduce<Depth>>
          : ParentPath extends '' ? TK & string : `${ParentPath}.${TK & string}`
      }[keyof T]
    : never

export type Direction = 'ltr' | 'rtl'

export interface Locale<M> {
  name: string
  code: string
  /** @default "ltr" */
  dir?: Direction
  messages: M
}

export type TranslatorOptions = Record<string, string | number>
export type Translator<M = Record<string, string>> = (path: FlatObjectPath<M>, options?: TranslatorOptions) => string

export function translate<M>(locale: Locale<M>, path: string, options: TranslatorOptions = {}): string {
  const prop: string = get(locale, `messages.${path}`, path)
  return prop.replace(/\{(\w+)\}/g, (_, key) => `${options[key] ?? key}`)
}

export function createTranslator<M>(locale: Locale<M>): Translator<M> {
  return (path, options) => translate(locale, path, options)
}
