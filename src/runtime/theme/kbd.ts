import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  base: 'inline-flex items-center justify-center px-0.25em rounded-ui-base leading-normal min-w-1.5em font-medium font-sans select-none',
  variants: {
    variant: {
      'solid': 'color-ui-cx bg-soft-ui-fill/90',
      'outline': 'color-ui-fill ring bg-ui-cx/90 ring-inset ring-ui-fill/30',
      'soft': 'color-ui-fill/80 bg-soft-ui-fill/20',
      'soft-outline': 'color-ui-fill/80 bg-soft-ui-fill/20 ring ring-inset ring-ui-fill/30',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
})
