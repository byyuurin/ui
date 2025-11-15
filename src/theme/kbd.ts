/* @unocss-include */
import { ct } from '@byyuurin/ui-kit'
import type { VariantsColor } from '../defaults'
import type { ModuleOptions } from '../module'

export default (options: Required<ModuleOptions>) => ct({
  base: 'inline-flex items-center justify-center p-1 rounded-sm font-medium font-sans',
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
      sm: 'h-4 min-w-4 text-2',
      md: 'h-5 min-w-5 text-3',
      lg: 'h-6 min-w-6 text-4',
    },
  },
  compoundVariants: [
    ...(options.theme.colors || []).map((color: string) => ({
      color: color as VariantsColor,
      variant: 'solid' as const,
      class: `text-inverted bg-${color}`,
    })),
    ...(options.theme.colors || []).map((color: string) => ({
      color: color as VariantsColor,
      variant: 'outline' as const,
      class: `ring ring-inset ring-${color}/50 text-${color}`,
    })),
    ...(options.theme.colors || []).map((color: string) => ({
      color: color as VariantsColor,
      variant: 'soft' as const,
      class: `text-${color} bg-${color}/10`,
    })),
    ...(options.theme.colors || []).map((color: string) => ({
      color: color as VariantsColor,
      variant: 'subtle' as const,
      class: `text-${color} ring ring-inset ring-${color}/25 bg-${color}/10`,
    })),
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
