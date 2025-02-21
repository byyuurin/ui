import { ct } from '@byyuurin/ui-kit'
import { buttonGroupVariant } from './button-group'

export default ct(/* @unocss-include */{
  slots: {
    base: 'inline-flex items-center rounded-ui-base transition-colors aria-disabled:opacity-50',
    input: [
      'w-full color-inherit bg-transparent border-0 placeholder:color-ui-cb/50',
      'focus:outline-none',
      'disabled:cursor-not-allowed',
    ],
    prefix: 'flex items-center',
    prefixIcon: 'shrink-0 size-1.25em',
    suffix: 'flex items-center',
    suffixIcon: 'shrink-0 size-1.25em',
  },
  variants: {
    ...buttonGroupVariant,
    size: {
      xs: {
        base: 'text-xs',
      },
      sm: {
        base: 'text-sm',
      },
      md: {
        base: 'text-base',
      },
      lg: {
        base: 'text-lg',
      },
      xl: {
        base: 'text-xl',
      },
    },
    variant: {
      'outline': {
        base: [
          'color-ui-cb/80 bg-solid-ui-c1 ring ring-inset ring-ui-cb/50',
          'focus-within:ring-2 focus-within:ring-ui-cb/50',
          'aria-disabled:ring-ui-cb/80 hover:aria-disabled:ring-ui-cb/80',
        ],
      },
      'soft': {
        base: [
          'color-ui-cb/80 bg-solid-ui-cb/4',
          'hover:bg-solid-ui-cb/6 hover:color-ui-cb/80 focus-within:bg-solid-ui-cb/8 focus-within:color-ui-cb/85',
          'aria-disabled:color-ui-cb/80 aria-disabled:bg-solid-ui-cb/5 hover:aria-disabled:color-ui-cb/80 hover:aria-disabled:bg-solid-ui-cb/5',
        ],
      },
      'soft-outline': {
        base: [
          'color-ui-cb/80 bg-solid-ui-cb/4 ring ring-inset ring-ui-cb/10',
          'hover:bg-solid-ui-cb/6 hover:color-ui-cb/80 focus-within:bg-solid-ui-cb/8 focus-within:color-ui-cb/85',
          'aria-disabled:color-ui-cb/80 aria-disabled:bg-solid-ui-cb/5 hover:aria-disabled:color-ui-cb/80 hover:aria-disabled:bg-solid-ui-cb/5',
        ],
      },
      'ghost': {
        base: [
          'color-ui-cb/80 bg-transparent',
          'hover:bg-solid-ui-cb/6 hover:color-ui-cb/80 focus-within:bg-solid-ui-cb/8 focus-within:color-ui-cb/85',
          'aria-disabled:color-ui-fill/80 aria-disabled:bg-transparent hover:aria-disabled:color-ui-fill/80 hover:aria-disabled:bg-transparent',
        ],
      },
      'none': {
        base: 'color-ui-cb bg-transparent',
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
      true: '',
    },
    type: {
      file: {
        input: 'prefix-normal not-disabled:cursor-pointer file:pointer-events-none file:py-0 file:font-size-0.875em file:rounded-ui-button file:border-none file:color-ui-c1 file:bg-solid-ui-cb/80',
      },
    },
  },
  compoundVariants: [
    {
      variant: ['soft', 'ghost', 'none'],
      highlight: false,
      underline: true,
      class: {
        base: [
          'relative after:content-empty after:absolute after:inset-x-0 after:bottom-0 after:h-1px after:bg-solid-ui-cb/40',
          'focus-within:after:h-2px focus-within:after:bg-solid-ui-fill/60',
        ],
      },
    },
    {
      size: ['xs', 'sm', 'md'],
      class: {
        base: 'p-1.5',
        input: 'px-1',
      },
    },
    {
      size: ['lg', 'xl'],
      class: {
        base: 'p-2.5',
        input: 'px-1.5',
      },
    },
    {
      variant: ['soft', 'soft-outline', 'ghost', 'none'],
      highlight: true,
      class: {
        base: 'ring ring-inset ring-ui-fill/80',
      },
    },
    {
      variant: ['outline'],
      highlight: true,
      class: {
        base: 'ring-2 ring-ui-fill/80 focus-within:ring-ui-fill/80',
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
  defaultVariants: {
    size: 'md',
  },
})
