import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  parts: {
    root: 'inline-flex items-center justify-center shrink-0 select-none overflow-hidden rounded-full align-middle bg-soft-ui-cb/10',
    image: 'size-full rounded-inherit object-cover',
    fallback: 'leading-none color-ui-base/60 truncate',
    icon: 'size-3/4 color-ui-base/60 shrink-0',
  },
  variants: {
    size: {
      xs: {
        root: 'text-xs size-4.5',
      },
      sm: {
        root: 'text-sm size-5.5',
      },
      md: {
        root: 'text-base size-8',
      },
      lg: {
        root: 'text-lg size-9',
      },
      xl: {
        root: 'text-xl size-12',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
