import { ct } from '@byyuurin/ui-kit'

export default ct({
  slots: {
    root: 'inline-flex items-center gap-x-2',
    container: 'rounded-ui-base border-0 transition-colors aria-disabled:opacity-50',
    base: 'w-full color-inherit bg-transparent text-center placeholder:color-ui-cb/50 focus:outline-none disabled:cursor-not-allowed',
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
          'color-ui-cb/80 bg-ui-c1 ring ring-inset ring-ui-cb/50',
          'focus-within:ring-2 focus-within:ring-ui-cb/50',
          'aria-disabled:ring-ui-cb/80 hover:aria-disabled:ring-ui-cb/80',
        ],
      },
      'soft': {
        container: [
          'color-ui-cb/80 bg-ui-cb/4',
          'hover:bg-ui-cb/6 hover:color-ui-cb/80 focus-within:bg-ui-cb/8 focus-within:color-ui-cb/85',
          'aria-disabled:color-ui-content/80 aria-disabled:bg-ui-fill/5 hover:aria-disabled:color-ui-content/80 hover:aria-disabled:bg-ui-fill/5',
        ],
      },
      'soft-outline': {
        container: [
          'color-ui-cb/80 bg-ui-cb/4 ring ring-inset ring-ui-cb/10',
          'hover:bg-ui-cb/6 hover:color-ui-cb/80 focus-within:bg-ui-cb/8 focus-within:color-ui-cb/85',
          'aria-disabled:color-ui-content/80 aria-disabled:bg-ui-fill/5 hover:aria-disabled:color-ui-content/80 hover:aria-disabled:bg-ui-fill/5',
        ],
      },
      'ghost': {
        container: [
          'color-ui-cb/80 bg-transparent',
          'hover:bg-ui-cb/6 hover:color-ui-cb/80 focus-within:bg-ui-cb/8 focus-within:color-ui-cb/85',
          'aria-disabled:color-ui-fill/80 aria-disabled:bg-transparent hover:aria-disabled:color-ui-fill/80 hover:aria-disabled:bg-transparent',
        ],
      },
      'none': {
        container: 'color-ui-cb bg-transparent',
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
          'relative after:content-empty after:absolute after:inset-x-0 after:bottom-0 after:h-1px after:bg-ui-cb/40',
          'focus-within:after:h-2px focus-within:after:bg-ui-fill/60',
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
})
