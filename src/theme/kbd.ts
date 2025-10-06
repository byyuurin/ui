/* @unocss-include */
import { ct } from '@byyuurin/ui-kit'
import type { VariantsColor } from '../defaults'
import type { ModuleOptions } from '../module'

export default (options: Required<ModuleOptions>) => ct({
  base: 'inline-flex items-center justify-center px-1 rounded-sm font-medium font-sans',
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])) as Record<VariantsColor, ''>,
      neutral: '',
    },
    variant: {
      solid: '',
      outline: '',
      soft: '',
      subtle: '',
    },
    size: {
      sm: 'h-4 min-w-[1rem] text-[0.625rem]',
      md: 'h-5 min-w-[1.25rem] text-[0.6875rem]',
      lg: 'h-6 min-w-[1.5rem] text-[0.75rem]',
    },
  },
  compoundVariants: [
    ...(options.theme.colors || []).map((color: string) => ({
      color: color as VariantsColor,
      variant: 'solid',
      class: `text-inverted bg-${color}`,
    } as const)),
    ...(options.theme.colors || []).map((color: string) => ({
      color: color as VariantsColor,
      variant: 'outline',
      class: `ring ring-inset ring-${color}/50 text-${color}`,
    } as const)),
    ...(options.theme.colors || []).map((color: string) => ({
      color: color as VariantsColor,
      variant: 'soft',
      class: `text-${color} bg-${color}/10`,
    } as const)),
    ...(options.theme.colors || []).map((color: string) => ({
      color: color as VariantsColor,
      variant: 'subtle',
      class: `text-${color} ring ring-inset ring-${color}/25 bg-${color}/10`,
    } as const)),
    {
      color: 'neutral',
      variant: 'solid',
      class: 'text-inverted bg-inverted',
    },
    {
      color: 'neutral',
      variant: 'outline',
      class: 'ring ring-inset ring-accented text-default bg-default',
    },
    {
      color: 'neutral',
      variant: 'soft',
      class: 'text-default bg-elevated',
    },
    {
      color: 'neutral',
      variant: 'subtle',
      class: 'ring ring-inset ring-accented text-default bg-elevated',
    },
  ],
  defaultVariants: {
    variant: 'outline',
    color: 'neutral',
    size: 'md',
  },
})
