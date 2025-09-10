import { ct } from '@byyuurin/ui-kit'
import { buttonGroupVariant } from './button-group'

export default ct(/* @unocss-include */{
  parts: {
    base: [
      'relative inline-flex items-center rounded-ui-button leading-normal transition-colors',
      'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-base/80',
      'disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:opacity-50',
    ],
    label: 'color-inherit',
    leadingIcon: 'shrink-0 not-only-child:ml-0.5',
    trailingIcon: 'shrink-0 not-only-child:mr-0.5',
  },
  variants: {
    ...buttonGroupVariant,
    variant: {
      'solid': {
        base: [
          'color-ui-cx bg-soft-ui-fill/85',
          'hover:bg-soft-ui-fill/75 active:bg-soft-ui-fill/95',
          'disabled:bg-soft-ui-fill/85 aria-disabled:bg-soft-ui-fill/85',
          'hover:disabled:bg-soft-ui-fill/85 hover:aria-disabled:bg-soft-ui-fill/85',
        ],
      },
      'outline': {
        base: [
          'color-ui-fill/80 bg-ui-base ring ring-inset ring-ui-fill/30',
          'hover:bg-soft-ui-fill/5 active:bg-soft-ui-fill/10',
          'disabled:bg-ui-base aria-disabled:bg-ui-base',
          'hover:disabled:bg-ui-base hover:aria-disabled:bg-ui-base',
        ],
      },
      'soft': {
        base: [
          'color-ui-fill/80 bg-soft-ui-fill/15',
          'hover:bg-soft-ui-fill/10 hover:color-ui-fill/80 active:bg-soft-ui-fill/25 active:color-ui-fill/90',
          'disabled:bg-soft-ui-fill/15 aria-disabled:bg-soft-ui-fill/15 disabled:color-ui-fill/80 aria-disabled:color-ui-fill/80',
          'hover:disabled:bg-soft-ui-fill/15 hover:aria-disabled:bg-soft-ui-fill/15 hover:disabled:color-ui-fill/80 hover:aria-disabled:color-ui-fill/80',
        ],
      },
      'soft-outline': {
        base: [
          'color-ui-fill/80 bg-soft-ui-fill/15 ring ring-inset ring-ui-fill/30',
          'hover:bg-soft-ui-fill/10 hover:color-ui-fill/80 active:bg-soft-ui-fill/25 active:color-ui-fill/90',
          'disabled:bg-soft-ui-fill/15 aria-disabled:bg-soft-ui-fill/15 disabled:color-ui-fill/80 aria-disabled:color-ui-fill/80',
          'hover:disabled:bg-soft-ui-fill/15 hover:aria-disabled:bg-soft-ui-fill/15 hover:disabled:color-ui-fill/80 hover:aria-disabled:color-ui-fill/80',
        ],
      },
      'ghost': {
        base: [
          'color-ui-fill/80 bg-transparent',
          'hover:bg-soft-ui-fill/5 hover:color-ui-fill/80 active:bg-soft-ui-fill/10 active:color-ui-fill/90',
          'disabled:bg-transparent aria-disabled:bg-transparent disabled:hover:bg-transparent aria-disabled:hover:bg-transparent disabled:color-ui-fill/80 aria-disabled:color-ui-fill/80',
          'hover:disabled:bg-transparent hover:aria-disabled:bg-transparent hover:disabled:hover:bg-transparent hover:aria-disabled:hover:bg-transparent hover:disabled:color-ui-fill/80 hover:aria-disabled:color-ui-fill/80',
        ],
      },
      'link': {
        base: [
          'color-ui-fill/80 bg-transparent',
          'hover:color-ui-fill/60 active:color-ui-fill',
          'disabled:color-ui-fill aria-disabled:color-ui-fill',
          'hover:disabled:color-ui-fill hover:aria-disabled:color-ui-fill',
        ],
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
    active: {
      true: '',
    },
    leading: {
      true: '',
    },
    trailing: {
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
        base: 'p-1.5',
        label: 'px-1',
      },
    },
    {
      size: ['lg', 'xl'],
      class: {
        base: 'p-2.5',
        label: 'px-2',
      },
    },
    {
      active: true,
      variant: 'solid',
      class: {
        base: 'bg-soft-ui-fill/95 hover:bg-soft-ui-fill/95',
      },
    },
    {
      active: true,
      variant: 'outline',
      class: {
        base: 'bg-soft-ui-fill/10 hover:bg-soft-ui-fill/30',
      },
    },
    {
      active: true,
      variant: ['soft', 'soft-outline'],
      class: {
        base: 'color-ui-fill/90 bg-soft-ui-fill/25 hover:color-ui-fill/90 hover:bg-soft-ui-fill/25',
      },
    },
    {
      active: true,
      variant: 'ghost',
      class: {
        base: 'color-ui-fill/90 bg-soft-ui-fill/10 hover:color-ui-fill/90 hover:bg-soft-ui-fill/10',
      },
    },
    {
      active: true,
      variant: 'link',
      class: {
        base: 'color-ui-fill hover:color-ui-fill',
      },
    },
    {
      loading: true,
      leading: true,
      class: { leadingIcon: 'animate-spin' },
    },
    {
      loading: true,
      leading: false,
      trailing: true,
      class: { trailingIcon: 'animate-spin' },
    },
  ],
  defaultVariants: {
    size: 'md',
  },
})
