import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  parts: {
    root: 'relative flex items-center select-none touch-none aria-disabled:opacity-50',
    track: [
      'relative bg-soft-ui-cb/10 overflow-hidden rounded-full flex-grow cursor-pointer',
      'data-[disabled]:cursor-not-allowed',
      'data-[orientation=horizontal]:h-0.6em data-[orientation=vertical]:w-0.6em',
    ],
    range: 'absolute rounded-full bg-soft-ui-fill',
    thumb: [
      'size-1em rounded-full bg-ui-base ring-0.2em cursor-pointer focus-visible:outline-0.2em focus-visible:outline-offset-0.2em',
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
