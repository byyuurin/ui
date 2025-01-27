import { ct } from '@byyuurin/ui-kit'

export default ct({
  slots: {
    root: 'relative inline-flex items-center',
    base: [
      'w-full rounded-ui-base border-0 transition-colors placeholder:color-ui-cb/50',
      'focus:outline-none',
      'disabled:cursor-not-allowed disabled:opacity-50',
    ],
    leading: 'absolute inset-y-0 start-0 flex items-center',
    trailing: 'absolute inset-y-0 end-0 flex items-center',
  },
  variants: {
    size: {
      xs: {
        base: 'px-2 py-1 text-xs gap-1',
        leading: 'ps-2',
        trailing: 'pe-2',
      },
      sm: {
        base: 'px-2.5 py-1 text-sm gap-1',
        leading: 'ps-2.5',
        trailing: 'pe-2.5',
      },
      md: {
        base: 'px-2.5 py-1.5 text-base gap-1',
        leading: 'ps-2.5',
        trailing: 'pe-2.5',
      },
      lg: {
        base: 'px-3 py-1.5 text-lg gap-2',
        leading: 'ps-3',
        trailing: 'pe-3',
      },
      xl: {
        base: 'px-3 py-2 text-xl gap-2',
        leading: 'ps-3',
        trailing: 'pe-3',
      },
    },
    variant: {
      outline: {
        base: [
          'color-ui-cb/80 bg-ui-c1 ring ring-inset ring-ui-cb/50',
          'focus:ring-2 focus:ring-ui-cb/50',
          'disabled:ring-ui-fill/80',
        ],
      },
      soft: {
        base: [
          'color-ui-cb/80 bg-ui-cb/4',
          'hover:bg-ui-cb/6 hover:color-ui-cb/80 focus:bg-ui-cb/8 focus:color-ui-cb/85',
          'disabled:color-ui-content/80 disabled:bg-ui-fill/5',
        ],
      },
      ghost: {
        base: [
          'color-ui-cb/80 bg-transparent',
          'hover:bg-ui-cb/6 hover:color-ui-cb/80 focus:bg-ui-cb/8 focus:color-ui-cb/85',
          'disabled:color-ui-fill/80 disabled:bg-transparent',
        ],
      },
      none: {
        base: 'color-ui-cb bg-transparent',
      },
    },
    loading: {
      true: '',
    },
    highlight: {
      true: {
        base: 'placeholder:color-ui-base/50',
      },
    },
  },
  compoundVariants: [
    {
      variant: ['soft', 'ghost', 'none'],
      highlight: true,
      class: {
        base: 'ring ring-inset ring-ui-fill/80',
      },
    },
    {
      variant: ['outline'],
      highlight: true,
      class: {
        base: 'ring-2 ring-ui-fill/80 focus:ring-ui-fill/80',
      },
    },
  ],
})
