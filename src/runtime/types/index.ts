import type * as _components from '../components'
import type * as theme from '../theme'
import type { PartialTheme } from '.'

export * from './components'
export * from './utils'

export type ThemeExtension = PartialTheme<typeof theme>
export type ComponentName = keyof typeof _components
