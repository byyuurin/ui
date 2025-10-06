import type { colors } from '@unocss/preset-wind4/colors'
import type * as ui from '#build/ui'
import type { ModuleOptions } from './module'
import type { UIConfig } from './runtime/types'
import { pick } from './runtime/utils'
import { icons } from './theme/app'

export function getDefaultUIConfig(colors?: string[]): AppConfigUI {
  return {
    colors: pick({
      primary: 'green',
      secondary: 'blue',
      success: 'green',
      info: 'blue',
      warning: 'yellow',
      error: 'red',
      neutral: 'slate',
    }, [...(colors || []), 'neutral' as any]),
    icons,
  }
}

export const defaultOptions = {
  prefix: 'U',
  colorMode: true,
  theme: {
    colors: undefined,
    transitions: true,
  },
} satisfies ModuleOptions

export const themeSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export type VariantsSize = typeof themeSizes[number]

export const defaultColors = ['primary', 'secondary', 'success', 'info', 'warning', 'error'] as const

export type VariantsColor = typeof defaultColors[number]

export function resolveColors(colors?: string[]) {
  return colors?.length
    ? [...new Set(['primary', ...colors])]
    : [...defaultColors]
}

function pickColorNames<Color extends keyof typeof colors>(colors: Color[]) {
  return colors
}

export const neutralColors = pickColorNames(['slate', 'gray', 'zinc', 'neutral', 'stone', 'light', 'dark'])
export type NeutralColor = typeof neutralColors[number]
export type Color = keyof Omit<typeof colors, NeutralColor | 'black' | 'white'> | (string & {})

export type AppConfigIcons = Record<keyof typeof icons | (string & {}), string>
export type AppConfigUI = {
  colors?: { [UIThemeColor: string]: Color } & { neutral?: NeutralColor | (string & {}) }
  icons?: Partial<AppConfigIcons>
} & UIConfig<typeof ui>
