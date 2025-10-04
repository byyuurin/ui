import { ct } from '@byyuurin/ui-kit'
import inputTheme from './input'

export default ct(/* @unocss-include */{
  parts: {
    base: 'relative inline-flex items-center rounded transition-colors aria-disabled:opacity-50',
    input: [
      'w-full color-inherit bg-transparent border-0 placeholder:color-ui-base/50',
      'focus:outline-none',
      'disabled:cursor-not-allowed',
    ],
    increment: 'absolute flex items-center ui-base',
    decrement: 'absolute flex items-center ui-base',
  },
  variants: {
    size: {
      ...inputTheme.variants.size,
    },
    variant: {
      ...inputTheme.variants.variant,
    },
    disabled: {
      true: {
        increment: 'opacity-50 cursor-not-allowed',
        decrement: 'opacity-50 cursor-not-allowed',
      },
    },
    orientation: {
      horizontal: {
        input: 'text-center',
        increment: 'inset-y-0 end-0 pe-0.5',
        decrement: 'inset-y-0 start-0 ps-0.5',
      },
      vertical: {
        increment: 'top-0 end-0 pe-0.5 [&>button]:py-0 scale-80',
        decrement: 'bottom-0 end-0 pe-0.5 [&>button]:py-0 scale-80',
      },
    },
    underline: {
      true: '',
    },
    highlight: {
      true: {
        base: 'ring ring-inset ring-ui-fill',
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
          'relative after:content-empty after:absolute after:inset-x-0 after:bottom-0 after:h-1px after:bg-soft-ui-cb/40',
          'focus-within:after:h-2px focus-within:after:bg-soft-ui-fill/60',
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
  ],
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
})
