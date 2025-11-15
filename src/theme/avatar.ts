/* @unocss-include */
import { ct } from '@byyuurin/ui-kit'

export default ct({
  parts: {
    root: 'inline-flex items-center justify-center shrink-0 select-none rounded-full align-middle bg-elevated',
    image: 'h-full w-full rounded-[inherit] object-cover',
    fallback: 'font-medium leading-none text-muted truncate',
    icon: 'text-muted shrink-0',
  },
  variants: {
    size: {
      '3xs': {
        root: 'size-4 text-2',
      },
      '2xs': {
        root: 'size-5 text-2.5',
      },
      'xs': {
        root: 'size-6 text-3',
      },
      'sm': {
        root: 'size-7 text-3.5',
      },
      'md': {
        root: 'size-8 text-4',
      },
      'lg': {
        root: 'size-9 text-4.5',
      },
      'xl': {
        root: 'size-10 text-5',
      },
      '2xl': {
        root: 'size-11 text-5.5',
      },
      '3xl': {
        root: 'size-12 text-6',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
