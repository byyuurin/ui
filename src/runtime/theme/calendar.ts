import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  slots: {
    root: '',
    header: 'flex items-center justify-between',
    body: 'flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0',
    heading: 'text-center font-medium truncate mx-auto',
    grid: 'w-full border-collapse select-none space-y-1 focus:outline-none',
    gridRow: 'grid gap-1 grid-cols-7',
    gridWeekDaysRow: 'mb-1 grid gap-1 w-full grid-cols-7',
    gridBody: 'grid',
    headCell: 'rounded-ui-base color-ui-fill',
    cell: 'relative text-center color-ui-base/80',
    cellTrigger: [
      'relative size-2.25em flex items-center justify-center rounded-ui-button whitespace-nowrap transition',
      'focus-visible:ring-2 focus-visible:ring-ui-base/90 focus:outline-none',
      'data-[disabled]:color-ui-base/50 data-[disabled]:pointer-events-none',
      'data-[unavailable]:line-through data-[unavailable]:color-ui-base/50 data-[unavailable]:pointer-events-none',
      'data-[selected]:color-ui-cx data-[today]:font-semibold data-[selected]:bg-soft-ui-fill/95 data-[today]:not-[[data-selected]]:color-ui-fill/95',
      'data-[highlighted]:bg-soft-ui-fill/20',
    ],
  },
  variants: {
    size: {
      xs: {
        root: 'text-xs',
      },
      sm: {
        root: 'text-sm',
      },
      md: {
        root: 'text-base',
      },
      lg: {
        root: 'text-lg',
      },
      xl: {
        root: 'text-xl',
      },
    },
    readonly: {
      true: {
        cellTrigger: 'cursor-default',
      },
    },
    disabled: {
      true: {
        cellTrigger: 'cursor-default',
      },
    },
  },
  compoundVariants: [
    {
      readonly: false,
      disabled: false,
      class: {
        cellTrigger: 'hover:not-[[data-selected]]:bg-soft-ui-fill/10',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
  },
})
