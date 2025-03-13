import type * as theme from '../theme'
import type { PartialTheme } from './utils'

export * from './components'
export * from './locale'
export * from './utils'

export type ThemeExtension = PartialTheme<typeof theme>
