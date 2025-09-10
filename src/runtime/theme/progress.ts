import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  parts: {
    wrapper: 'gap-2',
    root: 'relative overflow-hidden rounded-full bg-soft-ui-cb/30',
    indicator: 'bg-ui-fill rounded-full size-full transition-transform duration-200 ease-out',
    status: 'flex justify-end color-ui-base/50 transition-[width] duration-200',
    steps: 'grid items-end color-ui-base/80',
    step: 'truncate text-end row-start-1 col-start-1 transition-opacity',
  },
  variants: {
    size: {
      xs: {
        wrapper: 'text-xs',
      },
      sm: {
        wrapper: 'text-sm',
      },
      md: {
        wrapper: 'text-base',
      },
      lg: {
        wrapper: 'text-lg',
      },
      xl: {
        wrapper: 'text-xl',
      },
    },
    step: {
      active: {
        step: 'opacity-100',
      },
      first: {
        step: 'opacity-100 color-ui-base/60',
      },
      other: {
        step: 'opacity-0',
      },
      last: {
        step: '',
      },
    },
    orientation: {
      horizontal: {
        wrapper: 'w-full flex flex-col',
        root: 'w-full',
        status: 'flex-row',
      },
      vertical: {
        wrapper: 'h-full flex flex-row-reverse',
        root: 'h-full w-2',
        status: 'flex-col',
      },
    },
    inverted: {
      true: {
        status: 'self-end',
      },
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      inverted: true,
      class: {
        step: 'text-start',
        status: 'flex-row-reverse',
      },
    },
    {
      orientation: 'vertical',
      inverted: true,
      class: {
        steps: 'items-start',
        status: 'flex-col-reverse',
      },
    },
    { size: 'xs', orientation: 'horizontal', class: { root: 'h-1' } },
    { size: 'sm', orientation: 'horizontal', class: { root: 'h-2' } },
    { size: 'md', orientation: 'horizontal', class: { root: 'h-3' } },
    { size: 'lg', orientation: 'horizontal', class: { root: 'h-4' } },
    { size: 'xl', orientation: 'horizontal', class: { root: 'h-5' } },
    { size: 'xs', orientation: 'vertical', class: { root: 'w-1' } },
    { size: 'sm', orientation: 'vertical', class: { root: 'w-2' } },
    { size: 'md', orientation: 'vertical', class: { root: 'w-3' } },
    { size: 'lg', orientation: 'vertical', class: { root: 'w-4' } },
    { size: 'xl', orientation: 'vertical', class: { root: 'w-5' } },
  ],
  defaultVariants: {
    size: 'md',
  },
})
