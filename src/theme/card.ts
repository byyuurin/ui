/* @unocss-include */
import { ct } from '@byyuurin/ui-kit'

export default ct({
  parts: {
    root: 'rounded divide-y',
    header: 'flex flex-wrap items-center gap-1 px-4 py-5 sm:px-6',
    body: 'flex-1 overflow-y-auto p-4 sm:p-6 empty:hidden',
    footer: 'flex items-center gap-1.5 p-4 sm:px-6',
    title: 'flex-grow text-xl font-semibold',
    description: 'w-full',
  },
  variants: {
    variant: {
      solid: {
        root: 'bg-inverted text-inverted',
      },
      outline: {
        root: 'bg-default ring ring-default divide-y divide-default',
      },
      soft: {
        root: 'bg-elevated/50 divide-y divide-default',
      },
      subtle: {
        root: 'bg-elevated/50 ring ring-default divide-y divide-default',
      },
    },
  },
  defaultVariants: {
    variant: 'outline',
  },
})
