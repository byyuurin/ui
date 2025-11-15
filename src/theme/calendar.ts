/* @unocss-include */

import { ct } from '@byyuurin/ui-kit'
import type { VariantsColor } from '../defaults'
import type { ModuleOptions } from '../module'

export default (options: Required<ModuleOptions>) => ct({
  parts: {
    root: '',
    header: 'flex items-center justify-between',
    body: 'flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0',
    heading: 'text-center font-medium truncate mx-auto',
    grid: 'w-full border-collapse select-none space-y-1 focus:outline-none',
    gridRow: 'grid grid-cols-7 place-items-center',
    gridWeekDaysRow: 'mb-1 grid w-full grid-cols-7',
    gridBody: 'grid',
    headCell: 'rounded-md',
    cell: 'relative text-center',
    cellTrigger: [
      'm-0.5 relative flex items-center justify-center rounded-full whitespace-nowrap cursor-pointer focus-visible:ring-2 focus:outline-none',
      'data-[today]:font-semibold',
      'data-[unavailable]:line-through data-[unavailable]:text-muted data-[unavailable]:pointer-events-none',
      'data-[outside-view]:text-muted',
      'data-[disabled]:not-[[data-selected]]:text-muted data-[disabled]:cursor-not-allowed',
      options.theme.transitions && 'transition',
    ],
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, {
        headCell: `text-${color}`,
        cellTrigger: `focus-visible:ring-${color}`,
      }])) as Record<VariantsColor, { headCell: string, cellTrigger: string }>,
      neutral: {
        headCell: 'text-highlighted',
        cellTrigger: 'focus-visible:ring-inverted',
      },
    },
    variant: {
      solid: '',
      outline: '',
      soft: '',
      subtle: '',
    },
    size: {
      xs: {
        heading: 'text-xs',
        cell: 'text-xs',
        headCell: 'text-2.5',
        cellTrigger: 'size-7',
        body: 'space-y-2 pt-2',
      },
      sm: {
        heading: 'text-xs',
        headCell: 'text-3',
        cell: 'text-xs',
        cellTrigger: 'size-7',
      },
      md: {
        heading: 'text-sm',
        headCell: 'text-3',
        cell: 'text-sm',
        cellTrigger: 'size-8',
      },
      lg: {
        heading: 'text-base',
        headCell: 'text-4',
        cellTrigger: 'size-9 text-base',
      },
      xl: {
        heading: 'text-lg',
        headCell: 'text-4.5',
        cellTrigger: 'size-10 text-lg',
      },
    },
    outsideView: {
      false: {
        cellTrigger: 'not-hover:data-[outside-view]:data-[selected]:bg-default not-hover:data-[outside-view]:data-[selected]:text-muted not-hover:data-[outside-view]:data-[selected]:ring-0',
      },
    },
  },
  compoundVariants: [
    ...(options.theme.colors || []).map((color: string) => ({
      color: color as VariantsColor,
      variant: 'solid' as const,
      class: {
        cellTrigger: `data-[selected]:bg-${color} data-[selected]:text-inverted data-[today]:not-[[data-selected]]:text-${color} data-[highlighted]:bg-${color}/20 hover:not-[[data-selected]]:bg-${color}/20`,
      },
    })),
    ...(options.theme.colors || []).map((color: string) => ({
      color: color as VariantsColor,
      variant: 'solid' as const,
      outsideView: false,
      class: {
        cellTrigger: `hover:data-[outside-view]:data-[selected]:bg-${color}/20`,
      },
    })),
    {
      color: 'neutral',
      variant: 'solid',
      class: {
        cellTrigger: 'data-[selected]:bg-inverted data-[selected]:text-inverted data-[today]:not-[[data-selected]]:text-highlighted data-[highlighted]:bg-inverted/20 hover:not-[[data-selected]]:bg-inverted/10',
      },
    },
    {
      color: 'neutral',
      variant: 'solid',
      outsideView: false,
      class: {
        cellTrigger: 'hover:data-[outside-view]:data-[selected]:bg-inverted/10',
      },
    },
    ...(options.theme.colors || []).map((color: string) => ({
      color: color as VariantsColor,
      variant: 'outline' as const,
      class: {
        cellTrigger: `data-[selected]:ring data-[selected]:ring-inset data-[selected]:ring-${color}/50 data-[selected]:text-${color} data-[today]:not-[[data-selected]]:text-${color} data-[highlighted]:bg-${color}/10 hover:not-[[data-selected]]:bg-${color}/10`,
      },
    })),
    {
      color: 'neutral',
      variant: 'outline',
      class: {
        cellTrigger: 'data-[selected]:ring data-[selected]:ring-inset data-[selected]:ring-accented data-[selected]:text-default data-[selected]:bg-default data-[today]:not-[[data-selected]]:text-highlighted data-[highlighted]:bg-inverted/10 hover:not-[[data-selected]]:bg-inverted/10',
      },
    },
    ...(options.theme.colors || []).map((color: string) => ({
      color: color as VariantsColor,
      variant: 'soft' as const,
      class: {
        cellTrigger: `data-[selected]:bg-${color}/10 data-[selected]:text-${color} data-[today]:not-[[data-selected]]:text-${color} data-[highlighted]:bg-${color}/20 hover:not-[[data-selected]]:bg-${color}/20`,
      },
    })),
    {
      color: 'neutral',
      variant: 'soft',
      class: {
        cellTrigger: 'data-[selected]:bg-elevated data-[selected]:text-default data-[today]:not-[[data-selected]]:text-highlighted data-[highlighted]:bg-inverted/20 hover:not-[[data-selected]]:bg-inverted/10',
      },
    },
    ...(options.theme.colors || []).map((color: string) => ({
      color: color as VariantsColor,
      variant: 'subtle' as const,
      class: {
        cellTrigger: `data-[selected]:bg-${color}/10 data-[selected]:text-${color} data-[selected]:ring data-[selected]:ring-inset data-[selected]:ring-${color}/25 data-[today]:not-[[data-selected]]:text-${color} data-[highlighted]:bg-${color}/20 hover:not-[[data-selected]]:bg-${color}/20`,
      },
    })),
    {
      color: 'neutral',
      variant: 'subtle',
      class: {
        cellTrigger: 'data-[selected]:bg-elevated data-[selected]:text-default data-[selected]:ring data-[selected]:ring-inset data-[selected]:ring-accented data-[today]:not-[[data-selected]]:text-highlighted data-[highlighted]:bg-inverted/20 hover:not-[[data-selected]]:bg-inverted/10',
      },
    },
  ],
  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
    outsideView: true,
  },
})
