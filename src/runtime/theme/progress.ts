import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  slots: {
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
        root: 'h-full w-0.5em',
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
    { size: 'xs', orientation: 'horizontal', class: { root: 'h-0.25em' } },
    { size: 'sm', orientation: 'horizontal', class: { root: 'h-0.5em' } },
    { size: 'md', orientation: 'horizontal', class: { root: 'h-0.75em' } },
    { size: 'lg', orientation: 'horizontal', class: { root: 'h-1em' } },
    { size: 'xl', orientation: 'horizontal', class: { root: 'h-1.25em' } },
    { size: 'xs', orientation: 'vertical', class: { root: 'w-0.25em' } },
    { size: 'sm', orientation: 'vertical', class: { root: 'w-0.5em' } },
    { size: 'md', orientation: 'vertical', class: { root: 'w-0.75em' } },
    { size: 'lg', orientation: 'vertical', class: { root: 'w-1em' } },
    { size: 'xl', orientation: 'vertical', class: { root: 'w-1.25em' } },
  ],
  defaultVariants: {
    size: 'md',
  },
})
