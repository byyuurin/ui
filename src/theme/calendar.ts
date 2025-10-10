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
      'm-0.5 relative flex items-center justify-center rounded-full whitespace-nowrap focus-visible:ring-2 focus:outline-none',
      'data-[today]:font-semibold data-[today]:not-[[data-selected]]:text-highlighted',
      'data-[unavailable]:line-through data-[unavailable]:pointer-events-none data-[unavailable]:text-muted',
      'data-[outside-view]:text-muted data-[outside-view]:data-[selected]:text-inverted',
      'data-[disabled]:text-muted data-[disabled]:bg-opacity-20',
      'data-[selected]:text-inverted data-[selected]:data-[highlighted]:text-default',
      options.theme.transitions && 'transition',
    ],
  },

  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, {
        headCell: `text-${color}`,
        cellTrigger: [
          `focus-visible:ring-${color} data-[selected]:bg-${color} data-[highlighted]:bg-${color}/20`,
          `hover:not-[[data-selected]]:bg-${color}/20`,
        ],
      }])) as Record<VariantsColor, { headCell: string, cellTrigger: string | string[] }>,
      neutral: {
        headCell: 'text-highlighted',
        cellTrigger: [
          'focus-visible:ring-inverted data-[selected]:bg-inverted data-[highlighted]:bg-inverted/20',
          'hover:not-[[data-selected]]:bg-inverted/20',
        ],
      },
    },
    size: {
      xs: {
        heading: 'text-xs',
        cell: 'text-xs',
        headCell: 'text-[0.625rem]',
        cellTrigger: 'size-7',
        body: 'space-y-2 pt-2',
      },
      sm: {
        heading: 'text-xs',
        headCell: 'text-xs',
        cell: 'text-xs',
        cellTrigger: 'size-7',
      },
      md: {
        heading: 'text-sm',
        headCell: 'text-xs',
        cell: 'text-sm',
        cellTrigger: 'size-8',
      },
      lg: {
        heading: 'text-base',
        headCell: 'text-base',
        cellTrigger: 'size-9 text-base',
      },
      xl: {
        heading: 'text-lg',
        headCell: 'text-lg',
        cellTrigger: 'size-10 text-lg',
      },
    },
    multipleMonths: {
      true: {
        cellTrigger: 'not-hover:data-[outside-view]:data-[selected]:bg-default not-hover-data-[outside-view]:data-[selected]:text-muted',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
})
