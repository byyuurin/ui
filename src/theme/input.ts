import { ct } from '@byyuurin/ui-kit'

export default ct({
  slots: {
    root: 'inline-flex items-center rounded-ui-base transition-colors aria-disabled:opacity-50',
    base: [
      'w-full color-inherit bg-transparent border-0 placeholder:color-ui-cb/50',
      'focus:outline-none',
      'disabled:cursor-not-allowed',
    ],
    prefix: 'ms-1 flex items-center',
    prefixIcon: 'shrink-0 size-1.5em',
    suffix: 'me-1 flex items-center',
    suffixIcon: 'shrink-0 size-1.5em',
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
      outline: {
        root: [
          'color-ui-cb/80 bg-ui-c1 ring ring-inset ring-ui-cb/50',
          'focus-within:ring-2 focus-within:ring-ui-cb/50',
          'aria-disabled:ring-ui-cb/80 hover:aria-disabled:ring-ui-cb/80',
        ],
      },
      soft: {
        root: [
          'color-ui-cb/80 bg-ui-cb/4',
          'hover:bg-ui-cb/6 hover:color-ui-cb/80 focus-within:bg-ui-cb/8 focus-within:color-ui-cb/85',
          'aria-disabled:color-ui-content/80 aria-disabled:bg-ui-fill/5 hover:aria-disabled:color-ui-content/80 hover:aria-disabled:bg-ui-fill/5',
        ],
      },
      ghost: {
        root: [
          'color-ui-cb/80 bg-transparent',
          'hover:bg-ui-cb/6 hover:color-ui-cb/80 focus-within:bg-ui-cb/8 focus-within:color-ui-cb/85',
          'aria-disabled:color-ui-fill/80 aria-disabled:bg-transparent hover:aria-disabled:color-ui-fill/80 hover:aria-disabled:bg-transparent',
        ],
      },
      none: {
        root: 'color-ui-cb bg-transparent',
      },
    },
    prefix: {
      true: '',
    },
    suffix: {
      true: '',
    },
    loading: {
      true: '',
    },
    underline: {
      true: '',
    },
    highlight: {
      true: {
        base: '',
      },
    },
    type: {
      file: {
        base: 'prefix-normal not-disabled:cursor-pointer file:pointer-events-none file:py-0 file:font-size-0.875em file:rounded-ui-button file:border-none file:color-ui-c1 file:bg-ui-cb/80',
      },
    },
  },
  compoundVariants: [
    {
      variant: ['soft', 'ghost', 'none'],
      highlight: false,
      underline: true,
      class: {
        root: 'relative after:content-empty after:absolute after:inset-x-0 after:bottom-0 after:h-1px after:bg-ui-cb/40',
      },
    },
    {
      size: ['xs', 'sm', 'md'],
      class: {
        root: 'p-2 px-1.5',
        base: 'px-1.5',
      },
    },
    {
      size: ['lg', 'xl'],
      class: {
        root: 'p-2.5 px-1.5',
        base: 'px-2',
      },
    },
    {
      variant: ['soft', 'ghost', 'none'],
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
    {
      loading: true,
      prefix: true,
      class: {
        prefixIcon: 'animate-spin',
      },
    },
    {
      loading: true,
      prefix: false,
      suffix: true,
      class: {
        suffixIcon: 'animate-spin',
      },
    },
  ],
})
