import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  slots: {
    root: 'relative inline-flex items-center justify-center shrink-0',
    base: [
      'inline-block rounded-full ring ring-ui-cx flex items-center justify-center color-ui-cx font-medium whitespace-nowrap',
      'h-1.2em min-w-1.2em p-0.2em text-0.8em bg-ui-fill',
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
    position: {
      'top-right': {
        base: 'top-0 right-0',
      },
      'bottom-right': {
        base: 'bottom-0 right-0',
      },
      'top-left': {
        base: 'top-0 left-0',
      },
      'bottom-left': {
        base: 'bottom-0 left-0',
      },
    },
    show: {
      true: {
        base: 'animate-[scale-in_200ms_ease-out]',
      },
    },
    inset: {
      true: '',
    },
    standalone: {
      false: {
        base: 'absolute',
      },
    },
  },
  compoundVariants: [
    {
      position: 'top-right',
      inset: false,
      class: {
        base: '-translate-y-1/2 translate-x-1/2 transform',
      },
    },
    {
      position: 'bottom-right',
      inset: false,
      class: {
        base: 'translate-y-1/2 translate-x-1/2 transform',
      },
    },
    {
      position: 'top-left',
      inset: false,
      class: {
        base: '-translate-y-1/2 -translate-x-1/2 transform',
      },
    },
    {
      position: 'bottom-left',
      inset: false,
      class: {
        base: 'translate-y-1/2 -translate-x-1/2 transform',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
  },
})
