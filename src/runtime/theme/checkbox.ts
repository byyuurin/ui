import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  slots: {
    root: 'relative flex items-start',
    base: [
      'size-1.25em shrink-0 flex items-center justify-center rounded-ui-checkbox color-ui-c1 ring-2 ring-ui-content ring-inset bg-solid-ui-content',
      'outline-none focus-visible:outline-ui-cb/80 focus-visible:outline-2 focus-visible:outline-offset-2',
      'aria-[checked=false]:ring-1 aria-[checked=false]:ring-ui-cb aria-[checked=false]:bg-solid-ui-c1',
    ],
    container: 'flex items-center h-1.25em',
    wrapper: 'text-inherit ms-2',
    icon: 'color-ui-c1 shrink-0 size-1em transition data-[state=unchecked]:translate-y-full',
    label: 'flex color-ui-cb after:content-empty',
    description: 'color-ui-cb/60',
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
    required: {
      true: {
        label: `after:content-['*'] after:ms-0.5`,
      },
    },
    disabled: {
      true: {
        root: 'opacity-50 after:content-empty after:absolute after:inset-0 after:cursor-not-allowed',
      },
      false: {
        label: 'cursor-pointer',
      },
    },
  },
})
