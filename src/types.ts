export type MaybeArray<T> = T | T[]

export interface ComponentProps {
  class?: MaybeArray<string | Record<string, boolean>>
}
