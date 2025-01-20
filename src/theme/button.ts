import { ct } from '@byyuurin/ui-kit'

export default ct({
  slots: {
    base: [
      'inline-flex items-center leading-normal transition-colors',
      'disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:opacity-50',
    ],
    label: 'color-inherit',
    icon: 'font-size-1.25em',
  },
  variants: {
    variant: {
      solid: {
        base: [
          'color-ui-c1 bg-ui-fill/90',
          'hover:bg-ui-fill/75 active:bg-ui-fill',
          'disabled:bg-ui-fill/90 aria-disabled:bg-ui-fill/90',
        ],
      },
      outline: {
        base: [
          'bg-transparent ring ring-inset ring-ui-fill color-ui-fill',
          'hover:bg-ui-fill/10 active:bg-ui-fill/25',
          'disabled:bg-transparent aria-disabled:bg-transparent',
        ],
      },
      soft: {
        base: [
          'bg-ui-fill/10 color-ui-content/75',
          'hover:bg-ui-fill/15 hover:color-ui-content/80 active:bg-ui-fill/20 active:color-ui-content/85',
          'disabled:bg-ui-fill/10 aria-disabled:bg-ui-fill/10 disabled:color-ui-content/75 aria-disabled:color-ui-content/75',
        ],
      },
      ghost: {
        base: [
          'bg-transparent color-ui-fill/75',
          'hover:bg-ui-fill/10 hover:color-ui-fill/80 active:bg-ui-fill/20 active:color-ui-fill/85',
          'disabled:bg-transparent aria-disabled:bg-transparent disabled:color-ui-fill/75 aria-disabled:color-ui-fill/75',
        ],
      },
      link: {
        base: [
          'bg-transparent color-ui-fill',
          'hover:color-ui-fill/80 active:color-ui-fill/90',
          'disabled:color-ui-fill aria-disabled:color-ui-fill',
        ],
      },
    },
    size: {
      xs: {
        base: 'font-size-xs',
      },
      sm: {
        base: 'font-size-sm',
      },
      md: {
        base: 'font-size-base',
      },
      lg: {
        base: 'font-size-lg',
      },
      xl: {
        base: 'font-size-xl',
      },
    },
    round: {
      true: {
        base: 'rounded-full',
      },
      false: {
        base: 'rounded-ui-button',
      },
    },
    loading: {
      true: {
        icon: 'animate-spin',
      },
    },
  },
  compoundVariants: [
    {
      size: ['xs', 'sm', 'md'],
      class: {
        base: 'p-1',
        label: 'px-1',
      },
    },
    {
      size: ['lg', 'xl'],
      class: {
        base: 'p-1',
        label: 'px-2',
      },
    },
  ],
})
