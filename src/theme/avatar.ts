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
        root: 'text-xs size-1.4em',
      },
      sm: {
        root: 'text-sm size-1.6em',
      },
      md: {
        root: 'text-base size-2em',
      },
      lg: {
        root: 'text-lg size-2.4em',
      },
      xl: {
        root: 'text-xl size-3em',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
