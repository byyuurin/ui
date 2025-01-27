import { ct } from '@byyuurin/ui-kit'

export default ct({
  slots: {
    base: [
      'inline-flex items-center leading-normal transition-colors',
      'disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:opacity-50',
    ],
    label: 'color-inherit',
    prefixIcon: 'shrink-0 size-1.5em',
    suffixIcon: 'shrink-0 size-1.5em',
  },
  variants: {
    variant: {
      solid: {
        base: [
          'color-ui-c1 bg-ui-fill/90',
          'hover:bg-ui-fill/80 active:bg-ui-fill',
          'disabled:bg-ui-fill/90 aria-disabled:bg-ui-fill/90',
        ],
      },
      outline: {
        base: [
          'color-ui-fill bg-ui-c1 ring ring-inset ring-ui-fill',
          'hover:bg-ui-fill/10 active:bg-ui-fill/25',
          'disabled:bg-ui-c1 aria-disabled:bg-ui-c1',
        ],
      },
      soft: {
        base: [
          'color-ui-content/80 bg-ui-fill/10',
          'hover:bg-ui-fill/15 hover:color-ui-content/80 active:bg-ui-fill/20 active:color-ui-content/90',
          'disabled:bg-ui-fill/10 aria-disabled:bg-ui-fill/10 disabled:color-ui-content/80 aria-disabled:color-ui-content/80',
        ],
      },
      ghost: {
        base: [
          'color-ui-fill/80 bg-transparent',
          'hover:bg-ui-fill/10 hover:color-ui-fill/80 active:bg-ui-fill/20 active:color-ui-fill/90',
          'disabled:bg-transparent aria-disabled:bg-transparent disabled:color-ui-fill/80 aria-disabled:color-ui-fill/80',
        ],
      },
      link: {
        base: [
          'color-ui-fill bg-transparent',
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
    active: {
      true: '',
    },
    prefix: {
      true: '',
    },
    suffix: {
      true: '',
    },
    loading: {
      true: '',
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
    {
      active: true,
      variant: 'solid',
      class: { base: 'bg-ui-fill hover:bg-ui-fill' },
    },
    {
      active: true,
      variant: 'outline',
      class: { base: 'bg-ui-fill/25 hover:bg-ui-fill/25' },
    },
    {
      active: true,
      variant: 'soft',
      class: { base: 'color-ui-content/90 bg-ui-fill/20 hover:color-ui-content/90 hover:bg-ui-fill/20' },
    },
    {
      active: true,
      variant: 'ghost',
      class: { base: 'color-ui-fill/90 bg-ui-fill/20 hover:color-ui-fill/90 hover:bg-ui-fill/20' },
    },
    {
      active: true,
      variant: 'link',
      class: { base: 'color-ui-fill/90 hover:color-ui-fill/90' },
    },
    {
      loading: true,
      prefix: true,
      class: { prefixIcon: 'animate-spin' },
    },
    {
      loading: true,
      prefix: false,
      suffix: true,
      class: { suffixIcon: 'animate-spin' },
    },
  ],
})
