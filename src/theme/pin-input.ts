/* @unocss-include */
import { ct } from '@byyuurin/ui-kit'
import type { VariantsColor } from '../defaults'
import type { ModuleOptions } from '../module'

export default (options: Required<ModuleOptions>) => ct({
  parts: {
    root: 'relative inline-flex items-center gap-1.5',
    base: [
      'rounded-md border-0 placeholder:text-dimmed text-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
      options.theme.transitions && 'transition-colors',
    ],
  },
  variants: {
    size: {
      xs: {
        base: 'size-6 text-xs',
      },
      sm: {
        base: 'size-7 text-xs',
      },
      md: {
        base: 'size-8 text-sm',
      },
      lg: {
        base: 'size-9 text-sm',
      },
      xl: {
        base: 'size-10 text-base',
      },
    },
    variant: {
      outline: {
        base: 'text-highlighted bg-default ring ring-inset ring-accented',
      },
      soft: {
        base: 'text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50',
      },
      subtle: {
        base: 'text-highlighted bg-elevated ring ring-inset ring-accented',
      },
      ghost: {
        base: 'text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent',
      },
      none: {
        base: 'text-highlighted bg-transparent',
      },
    },
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])) as Record<VariantsColor, ''>,
      neutral: '',
    },
    highlight: {
      true: '',
    },
  },
  compoundVariants: [
    ...(options.theme.colors || []).map((color: string) => ({
      color: color as VariantsColor,
      variant: ['outline' as const, 'subtle' as const],
      class: { base: `focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-${color}` },
    })),
    ...(options.theme.colors || []).map((color: string) => ({
      color: color as VariantsColor,
      highlight: true,
      class: { base: `ring ring-inset ring-${color}` },
    })),
    {
      color: 'neutral',
      variant: ['outline', 'subtle'],
      class: { base: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted' },
    },
    {
      color: 'neutral',
      highlight: true,
      class: { base: 'ring ring-inset ring-inverted' },
    },
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary',
    variant: 'outline',
  },
})
