import { ct } from '@byyuurin/ui-kit'
import { buttonGroupVariant } from './button-group'

export default ct(/* @unocss-include */{
  slots: {
    base: 'inline-flex items-center rounded-ui-base leading-normal transition-colors',
    label: '',
    prefixIcon: 'shrink-0 size-1.5em not-only-child:ml-1.5',
    suffixIcon: 'shrink-0 size-1.5em not-only-child:mr-1.5',
  },
  variants: {
    ...buttonGroupVariant,
    variant: {
      'solid': {
        base: [
          'color-ui-cx bg-solid-ui-fill/90',
        ],
      },
      'outline': {
        base: 'color-ui-fill bg-solid-ui-cx ring ring-inset ring-ui-fill',
      },
      'soft': {
        base: 'color-ui-content/80 bg-solid-ui-fill/10',
      },
      'soft-outline': {
        base: 'color-ui-content/80 bg-solid-ui-fill/10 ring ring-inset ring-ui-fill/40',
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
  defaultVariants: {
    size: 'md',
  },
})
