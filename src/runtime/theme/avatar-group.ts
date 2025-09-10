import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  parts: {
    root: 'inline-flex flex-row-reverse justify-end',
    base: 'relative rounded-full ring-ui-cx first:me-0',
  },
  variants: {
    size: {
      xs: {
        base: 'ring-1 -me-0.5',
      },
      sm: {
        base: 'ring-2 -me-0.5',
      },
      md: {
        base: 'ring-2 -me-1',
      },
      lg: {
        base: 'ring-3 -me-2',
      },
      xl: {
        base: 'ring-3 -me-2',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
