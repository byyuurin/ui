import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  parts: {
    root: 'rounded-ui-box divide-y',
    header: 'flex flex-wrap items-center gap-1 px-4 py-5 sm:px-6',
    body: 'flex-1 overflow-y-auto p-4 sm:p-6 empty:hidden',
    footer: 'flex items-center gap-1.5 p-4 sm:px-6',
    title: 'flex-grow text-xl font-semibold',
    description: 'w-full',
  },
  variants: {
    variant: {
      'solid': {
        root: 'color-ui-cx bg-ui-fill divide-ui-cx/20',
        description: 'color-ui-cx/80',
      },
      'outline': {
        root: 'color-ui-fill bg-ui-base divide-ui-fill/20 ring ring-inset ring-ui-fill/20',
        description: 'color-ui-fill/80',
      },
      'soft': {
        root: 'color-ui-fill bg-soft-ui-fill/10 divide-ui-fill/20',
        description: 'color-ui-fill/80',
      },
      'soft-outline': {
        root: 'color-ui-fill bg-soft-ui-fill/10 divide-ui-fill/20 ring ring-inset ring-ui-fill/20',
        description: 'color-ui-fill/80',
      },
    },
  },
  defaultVariants: {
    variant: 'outline',
  },
})
