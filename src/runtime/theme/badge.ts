import { ct } from '@byyuurin/ui-kit'

export default ct({
  slots: {
    base: 'inline-flex items-center rounded-ui-base leading-normal transition-colors',
    label: '',
    prefixIcon: 'shrink-0 size-1.5em not-only-child:ml-1.5',
    suffixIcon: 'shrink-0 size-1.5em not-only-child:mr-1.5',
  },
  variants: {
    variant: {
      solid: {
        base: [
          'color-ui-c1 bg-ui-fill/90',
        ],
      },
      outline: {
        base: 'color-ui-fill bg-ui-c1 ring ring-inset ring-ui-fill',
      },
      soft: {
        base: 'color-ui-content/80 bg-ui-fill/10',
      },
    },
    size: {
      xs: {
        base: 'text-xs',
      },
      sm: {
        base: 'text-sm',
      },
      md: {
        base: 'text-base',
      },
      lg: {
        base: 'text-lg',
      },
      xl: {
        base: 'text-xl',
      },
    },
  },
  compoundVariants: [
    {
      size: ['xs', 'sm', 'md'],
      class: {
        base: 'p-0.5',
        label: 'px-2',
      },
    },
    {
      size: ['lg', 'xl'],
      class: {
        base: 'p-1',
        label: 'px-2.5',
      },
    },
  ],
})
