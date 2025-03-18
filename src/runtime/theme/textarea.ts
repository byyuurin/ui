import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  slots: {
    root: 'rounded-ui-base transition-colors aria-disabled:opacity-50',
    base: [
      'w-full color-inherit bg-transparent border-0 resize-none placeholder:color-ui-base/50',
      'focus:outline-none',
      'disabled:cursor-not-allowed',
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
    variant: {
      'outline': {
        root: [
          'color-ui-base/80 bg-ui-base ring ring-inset ring-ui-base/30',
          'focus-within:ring-2 focus-within:ring-ui-base/50',
          'aria-disabled:ring-ui-base/80 hover:aria-disabled:ring-ui-base/80',
        ],
      },
      'soft': {
        root: [
          'color-ui-base/80 bg-soft-ui-cb/4',
          'hover:bg-soft-ui-cb/6 hover:color-ui-base/80 focus-within:bg-soft-ui-cb/8 focus-within:hover:bg-soft-ui-cb/8 focus-within:color-ui-base/85',
          'aria-disabled:color-ui-fill/80 aria-disabled:bg-soft-ui-fill/5 hover:aria-disabled:color-ui-fill/80 hover:aria-disabled:bg-soft-ui-fill/5',
        ],
      },
      'soft-outline': {
        root: [
          'color-ui-base/80 bg-soft-ui-cb/4 ring ring-inset ring-ui-base/30',
          'hover:bg-soft-ui-cb/6 hover:color-ui-base/80 focus-within:bg-soft-ui-cb/8 focus-within:hover:bg-soft-ui-cb/8 focus-within:color-ui-base/85',
          'aria-disabled:color-ui-fill/80 aria-disabled:bg-soft-ui-fill/5 hover:aria-disabled:color-ui-fill/80 hover:aria-disabled:bg-soft-ui-fill/5',
        ],
      },
      'ghost': {
        root: [
          'color-ui-base/80 bg-transparent',
          'hover:bg-soft-ui-cb/6 hover:color-ui-base/80 focus-within:bg-soft-ui-cb/8 focus-within:hover:bg-soft-ui-cb/8 focus-within:color-ui-base/85',
          'aria-disabled:color-ui-fill/80 aria-disabled:bg-transparent hover:aria-disabled:color-ui-fill/80 hover:aria-disabled:bg-transparent',
        ],
      },
      'none': {
        root: 'color-ui-base bg-transparent',
      },
    },
    underline: {
      true: '',
    },
    highlight: {
      true: {
        base: '',
      },
    },
  },
  compoundVariants: [
    {
      variant: ['soft', 'ghost', 'none'],
      highlight: false,
      underline: true,
      class: {
        root: [
          'relative after:content-empty after:absolute after:inset-x-0 after:bottom-0 after:h-1px after:bg-soft-ui-cb/40',
          'focus-within:after:h-2px focus-within:after:bg-soft-ui-fill/60',
        ],
      },
    },
    {
      size: ['xs', 'sm', 'md'],
      class: {
        root: 'p-1.5 px-2.5',
      },
    },
    {
      size: ['lg', 'xl'],
      class: {
        root: 'p-2.5 px-3.5',
      },
    },
    {
      variant: ['soft', 'soft-outline', 'ghost', 'none'],
      highlight: true,
      class: {
        root: 'ring ring-inset ring-ui-fill/80',
      },
    },
    {
      variant: ['outline'],
      highlight: true,
      class: {
        root: 'ring-2 ring-ui-fill/80 focus-within:ring-ui-fill/80',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
  },
})
