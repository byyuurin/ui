import type { colors } from '@unocss/preset-wind4/colors'
import type { ModuleOptions } from './module'
import { pick } from './runtime/utils'
import type { AppConfigUI } from './setup'
import { icons } from './theme/app'

export function getDefaultConfig(theme?: ModuleOptions['theme']): AppConfigUI<VariantsColor> {
  return {
    colors: pick({
      primary: 'orange',
      secondary: 'teal',
      success: 'green',
      info: 'blue',
      warning: 'yellow',
      error: 'red',
      neutral: 'stone',
    }, [...(theme?.colors || []), 'neutral' as any]),
    icons,
  }
}

export const defaultOptions = {
  prefix: 'U',
  fonts: true,
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

/**
 * Override default variants from module options
 * @param result - The theme result object
 * @param defaultVariants - The default variants from module options
 * @param defaultVariants.color - The default color variant
 * @param defaultVariants.size - The default size variant
 * @returns The theme result with overridden default variants
 */
export function applyDefaultVariants(result: any, defaultVariants?: { color?: string, size?: string }): any {
  if (!result || !defaultVariants)
    return result

  if (defaultVariants.color && result.defaultVariants?.color && result.defaultVariants.color === 'primary')
    result.defaultVariants.color = defaultVariants.color

  if (defaultVariants.size && result.defaultVariants?.size && result.defaultVariants.size === 'md')
    result.defaultVariants.size = defaultVariants.size

  return result
}
