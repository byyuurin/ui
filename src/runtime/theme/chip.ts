import { ct } from '@byyuurin/ui-kit'
import { buttonGroupVariant } from './button-group'

export default ct(/* @unocss-include */{
  parts: {
    base: 'inline-flex items-center rounded-ui-base leading-normal transition-colors',
    label: '',
    leadingIcon: 'shrink-0 not-only-child:ml-1.5',
    trailingIcon: 'shrink-0 not-only-child:mr-1.5',
  },
  variants: {
    ...buttonGroupVariant,
    variant: {
      'solid': {
        base: 'color-ui-cx bg-soft-ui-fill/90',
      },
      'outline': {
        base: 'color-ui-fill bg-ui-base ring ring-inset ring-ui-fill/30',
      },
      'soft': {
        base: 'color-ui-fill/80 bg-soft-ui-fill/10',
      },
      'soft-outline': {
        base: 'color-ui-fill/80 bg-soft-ui-fill/10 ring ring-inset ring-ui-fill/30',
      },
    },
    size: {
      xs: {
        base: 'text-xs',
        leadingIcon: 'size-4',
        trailingIcon: 'size-4',
      },
      sm: {
        base: 'text-sm',
        leadingIcon: 'size-5',
        trailingIcon: 'size-5',
      },
      md: {
        base: 'text-base',
        leadingIcon: 'size-6',
        trailingIcon: 'size-6',
      },
      lg: {
        base: 'text-lg',
        leadingIcon: 'size-7',
        trailingIcon: 'size-7',
      },
      xl: {
        base: 'text-xl',
        leadingIcon: 'size-7',
        trailingIcon: 'size-7',
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
