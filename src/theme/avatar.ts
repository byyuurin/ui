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
        root: 'size-4 text-[0.5rem]',
      },
      '2xs': {
        root: 'size-5 text-[0.625rem]',
      },
      'xs': {
        root: 'size-6 text-xs',
      },
      'sm': {
        root: 'size-7 text-sm',
      },
      'md': {
        root: 'size-8 text-base',
      },
      'lg': {
        root: 'size-9 text-lg',
      },
      'xl': {
        root: 'size-10 text-xl',
      },
      '2xl': {
        root: 'size-11 text-[1.375rem]',
      },
      '3xl': {
        root: 'size-12 text-2xl',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
