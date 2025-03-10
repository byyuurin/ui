import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  slots: {
    root: 'inline-flex flex-row-reverse justify-end',
    base: 'relative rounded-full ring-ui-cx first:me-0',
  },
  variants: {
    size: {
      xs: {
        base: 'ring-1 -me-0.125em',
      },
      sm: {
        base: 'ring-2 -me-0.125em',
      },
      md: {
        base: 'ring-2 -me-0.25em',
      },
      lg: {
        base: 'ring-3 -me-0.5em',
      },
      xl: {
        base: 'ring-3 -me-0.5em',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
