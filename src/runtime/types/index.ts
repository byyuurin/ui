import type * as theme from '../theme'

export * from './components'
export * from './form'
export * from './locale'
export * from './utils'

type MergeThemes<T> = {
  [P in keyof T as T[P] extends undefined ? never : P]?: T[P] extends Array<infer V>
    ? V extends string ? string : V[]
    : T[P] extends object
      ? MergeThemes<T[P]>
      : T[P] extends string
        ? string
        : T[P]
}

export type ThemeExtension = MergeThemes<typeof theme>
