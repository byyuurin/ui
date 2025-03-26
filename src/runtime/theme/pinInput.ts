import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  slots: {
    root: 'inline-flex items-center gap-x-2',
    container: 'rounded-ui-base border-0 transition-colors aria-disabled:opacity-50',
    base: 'w-full color-inherit bg-transparent text-center placeholder:color-ui-base/50 focus:outline-none disabled:cursor-not-allowed',
  },
  variants: {
    size: {
      xs: {
        container: 'text-xs size-7',
      },
      sm: {
        container: 'text-sm size-8',
      },
      md: {
        container: 'text-base size-9',
      },
      lg: {
        container: 'text-lg size-12.5',
      },
      xl: {
        container: 'text-xl size-12.5',
      },
    },
    variant: {
      'outline': {
        container: [
          'color-ui-base/80 bg-ui-base ring ring-inset ring-ui-base/30',
          'focus-within:ring-2 focus-within:ring-ui-base/50',
          'aria-disabled:ring-ui-base/15 hover:aria-disabled:ring-ui-base/15',
        ],
      },
      'soft': {
        container: [
          'color-ui-base/80 bg-soft-ui-cb/4',
          'hover:bg-soft-ui-cb/6 hover:color-ui-base/80 focus-within:bg-soft-ui-cb/8 focus-within:color-ui-base/85',
          'aria-disabled:color-ui-fill/80 aria-disabled:bg-soft-ui-fill/5 hover:aria-disabled:color-ui-fill/80 hover:aria-disabled:bg-soft-ui-fill/5',
        ],
      },
      'soft-outline': {
        container: [
          'color-ui-base/80 bg-soft-ui-cb/4 ring ring-inset ring-ui-base/30',
          'hover:bg-soft-ui-cb/6 hover:color-ui-base/80 focus-within:bg-soft-ui-cb/8 focus-within:color-ui-base/85',
          'aria-disabled:color-ui-fill/80 aria-disabled:bg-soft-ui-fill/5 hover:aria-disabled:color-ui-fill/80 hover:aria-disabled:bg-soft-ui-fill/5',
        ],
      },
      'ghost': {
        container: [
          'color-ui-base/80 bg-transparent',
          'hover:bg-soft-ui-cb/6 hover:color-ui-base/80 focus-within:bg-soft-ui-cb/8 focus-within:color-ui-base/85',
          'aria-disabled:color-ui-fill/80 aria-disabled:bg-transparent hover:aria-disabled:color-ui-fill/80 hover:aria-disabled:bg-transparent',
        ],
      },
      'none': {
        container: 'color-ui-base bg-transparent',
      },
    },
    underline: {
      true: '',
    },
    highlight: {
      true: '',
    },
  },
  compoundVariants: [
    {
      variant: ['soft', 'ghost', 'none'],
      highlight: false,
      underline: true,
      class: {
        container: [
          'relative after:content-empty after:absolute after:inset-x-0 after:bottom-0 after:h-1px after:bg-soft-ui-cb/40',
          'focus-within:after:h-2px focus-within:after:bg-soft-ui-fill/60',
        ],
      },
    },
    {
      size: ['xs', 'sm', 'md'],
      class: {
        base: 'p-1.5',
      },
    },
    {
      size: ['lg', 'xl'],
      class: {
        base: 'p-2.5',
      },
    },
    {
      variant: ['soft', 'soft-outline', 'ghost', 'none'],
      highlight: true,
      class: {
        container: 'ring ring-inset ring-ui-fill/80',
      },
    },
    {
      variant: ['outline'],
      highlight: true,
      class: {
        container: 'ring-2 ring-ui-fill/80 focus-within:ring-ui-fill/80',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
  },
})
