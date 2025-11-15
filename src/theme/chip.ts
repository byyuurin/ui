/* @unocss-include */
import { ct } from '@byyuurin/ui-kit'
import type { VariantsColor } from '../defaults'
import type { ModuleOptions } from '../module'

export default (options: Required<ModuleOptions>) => ct({
  parts: {
    root: 'relative inline-flex items-center justify-center shrink-0',
    base: 'rounded-full ring ring-bg flex items-center justify-center text-inverted font-medium whitespace-nowrap',
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, { base: `bg-${color}` }])) as Record<VariantsColor, { base: string }>,
      neutral: { base: 'bg-inverted' },
    },
    size: {
      '3xs': { base: 'h-1 min-w-1 text-1' },
      '2xs': { base: 'h-1.25 min-w-1.25 text-1.25' },
      'xs': { base: 'h-1.5 min-w-1.5 text-1.5' },
      'sm': { base: 'h-1.75 min-w-1.75 text-1.75' },
      'md': { base: 'h-2 min-w-2 text-2' },
      'lg': { base: 'h-2.25 min-w-2.25 text-2.25' },
      'xl': { base: 'h-2.5 min-w-2.5 text-2.5' },
      '2xl': { base: 'h-2.75 min-w-2.75 text-2.75' },
      '3xl': { base: 'h-3 min-w-3 text-3' },
    },
    position: {
      'top-right': { base: 'top-0 right-0' },
      'bottom-right': { base: 'bottom-0 right-0' },
      'top-left': { base: 'top-0 left-0' },
      'bottom-left': { base: 'bottom-0 left-0' },
    },
    show: {
      true: {
        base: 'animate-[scale-in_200ms_ease-out]',
      },
    },
    inset: {
      false: '',
    },
    standalone: {
      false: { base: 'absolute' },
    },
  },
  compoundVariants: [
    {
      position: 'top-right',
      inset: false,
      class: {
        base: '-translate-y-1/2 translate-x-1/2 transform',
      },
    },
    {
      position: 'bottom-right',
      inset: false,
      class: {
        base: 'translate-y-1/2 translate-x-1/2 transform',
      },
    },
    {
      position: 'top-left',
      inset: false,
      class: {
        base: '-translate-y-1/2 -translate-x-1/2 transform',
      },
    },
    {
      position: 'bottom-left',
      inset: false,
      class: {
        base: 'translate-y-1/2 -translate-x-1/2 transform',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary',
    position: 'top-right',
  },
})
