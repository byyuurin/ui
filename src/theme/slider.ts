/* @unocss-include */
import { ct } from '@byyuurin/ui-kit'
import type { VariantsColor } from '../defaults'
import type { ModuleOptions } from '../module'

export default (options: Required<ModuleOptions>) => ct({
  parts: {
    root: 'relative flex items-center select-none touch-none',
    track: 'relative bg-accented overflow-hidden rounded-full grow',
    range: 'absolute rounded-full',
    thumb: 'rounded-full ring-2 ring-bg/10 focus-visible:ring-bg focus-visible:outline-2 focus-visible:outline-offset-2',
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, {
        range: `bg-${color}`,
        thumb: `bg-${color} focus-visible:outline-${color}`,
      }])) as Record<VariantsColor, { range: string, thumb: string }>,
      neutral: {
        range: 'bg-inverted',
        thumb: 'bg-inverted focus-visible:outline-inverted',
      },
    },
    size: {
      xs: {
        thumb: 'size-3',
      },
      sm: {
        thumb: 'size-3.5',
      },
      md: {
        thumb: 'size-4',
      },
      lg: {
        thumb: 'size-4.5',
      },
      xl: {
        thumb: 'size-5',
      },
    },
    orientation: {
      horizontal: {
        root: 'w-full',
        range: 'h-full',
      },
      vertical: {
        root: 'flex-col h-full',
        range: 'w-full',
      },
    },
    disabled: {
      true: {
        root: 'opacity-75 cursor-not-allowed',
      },
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      size: 'xs',
      class: {
        track: 'h-1.5',
      },
    },
    {
      orientation: 'horizontal',
      size: 'sm',
      class: {
        track: 'h-1.75',
      },
    },
    {
      orientation: 'horizontal',
      size: 'md',
      class: {
        track: 'h-2',
      },
    },
    {
      orientation: 'horizontal',
      size: 'lg',
      class: {
        track: 'h-2.25',
      },
    },
    {
      orientation: 'horizontal',
      size: 'xl',
      class: {
        track: 'h-2.5',
      },
    },
    {
      orientation: 'vertical',
      size: 'xs',
      class: {
        track: 'w-1.5',
      },
    },
    {
      orientation: 'vertical',
      size: 'sm',
      class: {
        track: 'w-1.75',
      },
    },
    {
      orientation: 'vertical',
      size: 'md',
      class: {
        track: 'w-2',
      },
    },
    {
      orientation: 'vertical',
      size: 'lg',
      class: {
        track: 'w-2.25',
      },
    },
    {
      orientation: 'vertical',
      size: 'xl',
      class: {
        track: 'w-2.5',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
})
