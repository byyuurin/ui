/* @unocss-include */
import { ct } from '@byyuurin/ui-kit'
import type { VariantsColor } from '../defaults'
import type { ModuleOptions } from '../module'

export default (options: Required<ModuleOptions>) => ct({
  parts: {
    root: 'relative',
    fieldset: 'flex gap-x-2',
    legend: 'mb-1 block font-medium text-default',
    item: 'flex items-start',
    container: 'flex items-center',
    base: 'rounded-full ring ring-inset ring-accented overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2',
    indicator: [
      'flex items-center justify-center size-full rounded-full scale-0 data-[state=checked]:scale-65',
      options.theme.transitions && 'transition-transform',
    ],
    wrapper: 'w-full',
    label: 'block font-medium text-default cursor-pointer',
    description: 'text-muted',
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, {
        base: `focus-visible:outline-${color} data-[state=checked]:ring-${color}/50`,
        indicator: `bg-${color}`,
      }])) as Record<VariantsColor, { base: string, indicator: string }>,
      neutral: {
        base: 'focus-visible:outline-inverted data-[state=checked]:ring-[--ui-text]/50',
        indicator: 'bg-inverted',
      },
    },
    variant: {
      list: {
        item: '',
      },
      card: {
        item: 'border border-muted rounded-lg',
      },
      table: {
        item: 'border border-muted',
      },
    },
    orientation: {
      horizontal: {
        fieldset: 'flex-row',
      },
      vertical: {
        fieldset: 'flex-col',
      },
    },
    indicator: {
      start: {
        item: 'flex-row',
        wrapper: 'ms-2',
      },
      end: {
        item: 'flex-row-reverse',
        wrapper: 'me-2',
      },
      hidden: {
        base: 'sr-only',
        wrapper: 'text-center',
      },
    },
    size: {
      xs: {
        fieldset: 'gap-y-0.5',
        legend: 'text-xs',
        base: 'size-3',
        item: 'text-xs',
        container: 'h-4',
        indicator: '',
      },
      sm: {
        fieldset: 'gap-y-0.5',
        legend: 'text-xs',
        base: 'size-3.5',
        item: 'text-xs',
        container: 'h-4',
        indicator: '',
      },
      md: {
        fieldset: 'gap-y-1',
        legend: 'text-sm',
        base: 'size-4',
        item: 'text-sm',
        container: 'h-5',
        indicator: '',
      },
      lg: {
        fieldset: 'gap-y-1',
        legend: 'text-sm',
        base: 'size-4.5',
        item: 'text-sm',
        container: 'h-5',
        indicator: '',
      },
      xl: {
        fieldset: 'gap-y-1.5',
        legend: 'text-base',
        base: 'size-5',
        item: 'text-base',
        container: 'h-6',
        indicator: '',
      },
    },
    disabled: {
      true: {
        base: 'cursor-not-allowed opacity-75',
        label: 'cursor-not-allowed opacity-75',
        description: 'opacity-75',
      },
    },
    required: {
      true: {
        legend: `after:content-['*'] after:ms-0.5 after:text-error`,
      },
    },
  },
  compoundVariants: [
    { variant: ['card', 'table'], disabled: true, class: { item: 'cursor-not-allowed' } },
    { variant: ['card', 'table'], disabled: false, class: { item: 'cursor-pointer' } },
    { size: 'xs', variant: ['card', 'table'], class: { item: 'p-2.5' } },
    { size: 'sm', variant: ['card', 'table'], class: { item: 'p-3' } },
    { size: 'md', variant: ['card', 'table'], class: { item: 'p-3.5' } },
    { size: 'lg', variant: ['card', 'table'], class: { item: 'p-4' } },
    { size: 'xl', variant: ['card', 'table'], class: { item: 'p-4.5' } },
    {
      orientation: 'horizontal',
      variant: 'table',
      class: {
        item: 'first-of-type:rounded-s-lg last-of-type:rounded-e-lg',
        fieldset: 'gap-0 -space-x-px',
      },
    },
    {
      orientation: 'vertical',
      variant: 'table',
      class: {
        item: 'first-of-type:rounded-t-lg last-of-type:rounded-b-lg',
        fieldset: 'gap-0 -space-y-px',
      },
    },
    ...(options.theme.colors || []).map((color: string) => ({
      color: color as VariantsColor,
      variant: 'card',
      class: {
        item: `has-data-[state=checked]:border-${color}`,
      },
    } as const)),
    {
      color: 'neutral',
      variant: 'card',
      class: {
        item: 'has-data-[state=checked]:border-inverted',
      },
    },
    ...(options.theme.colors || []).map((color: string) => ({
      color: color as VariantsColor,
      variant: 'table',
      class: {
        item: `has-data-[state=checked]:bg-${color}/10 has-data-[state=checked]:border-${color}/50 has-data-[state=checked]:z-[1]`,
      },
    } as const)),
    {
      color: 'neutral',
      variant: 'table',
      class: {
        item: 'has-data-[state=checked]:bg-elevated has-data-[state=checked]:border-inverted/50 has-data-[state=checked]:z-[1]',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary',
    variant: 'list',
    orientation: 'vertical',
    indicator: 'start',
  },
})
