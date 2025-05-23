import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  parts: {
    root: 'relative min-w-0',
    list: 'flex items-center gap-1.5',
    item: 'flex min-w-0',
    link: 'group relative flex items-center gap-1.5 text-sm min-w-0 focus-visible:outline-ui-primary',
    linkLeadingIcon: 'shrink-0 size-5',
    linkLabel: 'truncate',
    separator: 'flex',
    separatorIcon: 'shrink-0 size-5 color-ui-base/60',
  },
  variants: {
    active: {
      true: {
        link: 'color-ui-primary font-semibold',
      },
      false: {
        link: 'color-ui-base/60 font-medium',
      },
    },
    disabled: {
      true: {
        link: 'cursor-not-allowed opacity-50',
      },
    },
    to: {
      true: '',
    },
  },
  compoundVariants: [
    {
      disabled: false,
      active: false,
      to: true,
      class: {
        link: 'hover:color-ui-base/80 transition-colors',
      },
    },
  ],
})
