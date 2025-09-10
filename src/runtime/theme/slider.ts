import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  parts: {
    root: 'relative flex items-center select-none touch-none aria-disabled:opacity-50',
    track: [
      'relative bg-soft-ui-cb/10 overflow-hidden rounded-full flex-grow cursor-pointer',
      'data-[disabled]:cursor-not-allowed',
      'data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5',
    ],
    range: 'absolute rounded-full bg-soft-ui-fill',
    thumb: [
      'size-4 rounded-full bg-ui-base ring-3 cursor-pointer focus-visible:outline-3 focus-visible:outline-offset-3',
      'data-[disabled]:cursor-not-allowed',
      'ring-ui-fill outline-none focus-visible:outline-ui-fill/50',
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
    orientation: {
      horizontal: {
        root: 'w-full',
        range: 'h-full',
      },
      vertical: {
        root: 'flex-col h-full',
        range: 'w-full',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
