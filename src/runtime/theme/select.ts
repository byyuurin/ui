import { ct } from '@byyuurin/ui-kit'
import { buttonGroupVariant } from './button-group'

export default ct(/* @unocss-include */{
  slots: {
    base: [
      'group inline-flex items-center gap-x-2 rounded-ui-base focus:outline-none transition-colors',
      'disabled:cursor-not-allowed disabled:opacity-50',
    ],
    value: 'me-auto truncate pointer-events-none',
    placeholder: 'me-auto truncate color-ui-cb/50',
    arrow: 'fill-ui-cx stroke-ui-cb/20',
    content: [
      'z-1 max-h-60 w-[var(--reka-popper-anchor-width)] bg-ui-cx shadow-lg rounded-[calc(var(--ui-radius-tabs)*0.66)] ring ring-ui-cb/20 overflow-hidden pointer-events-auto',
      'data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]',
    ],
    viewport: 'divide-y divide-ui-cb/10 scroll-py-1',
    group: 'p-1 isolate',
    empty: 'py-2 text-center text-sm color-ui-cb/50',
    label: 'font-semibold color-ui-cb cursor-pointer',
    separator: '-mx-1 my-1 h-px bg-soft-ui-cb/10',
    item: [
      'group relative w-full flex gap-2 items-center select-none outline-none color-ui-cb/50 transition-colors cursor-pointer',
      'aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
      'before:content-empty before:absolute before:z-[-1] before:inset-px before:rounded-ui-base before:transition-colors',
      'data-[highlighted]:color-ui-cb data-[highlighted]:before:bg-soft-ui-cb/3',
      'data-[state=checked]:color-ui-base',
    ],
    itemPrefixIcon: 'shrink-0 color-ui-cb/80 group-data-[highlighted]:color-ui-cb/80 transition-colors',
    itemSuffix: 'ms-auto inline-flex gap-1.5 items-center',
    itemSuffixIcon: 'shrink-0',
    itemLabel: 'truncate',
    prefix: 'flex items-center',
    prefixIcon: 'shrink-0 size-1.25em',
    suffix: 'flex items-center',
    suffixIcon: 'shrink-0 size-1.25em',
  },
  variants: {
    ...buttonGroupVariant,
    variant: {
      'outline': {
        base: [
          'color-ui-cb/80 bg-ui-cx ring ring-inset ring-ui-cb/30 data-[state=open]:ring-2 data-[state=open]:ring-ui-cb/50',
          'focus-within:ring-2 focus-within:ring-ui-cb/50',
          'disabled:ring-ui-cb/80 hover:disabled:ring-ui-cb/80',
        ],
      },
      'soft': {
        base: [
          'color-ui-cb/80 bg-soft-ui-cb/5 data-[state=open]:bg-soft-ui-cb/5',
          'hover:bg-soft-ui-cb/6 hover:color-ui-cb/80 focus-within:bg-soft-ui-cb/8 focus-within:color-ui-cb/85',
          'disabled:color-ui-content/80 disabled:bg-soft-ui-fill/5 hover:disabled:color-ui-content/80 hover:disabled:bg-soft-ui-fill/5',
        ],
      },
      'soft-outline': {
        base: [
          'color-ui-cb/80 bg-soft-ui-cb/5 ring ring-inset ring-ui-cb/10 data-[state=open]:bg-soft-ui-cb/5 data-[state=open]:ring-ui-cb/25',
          'hover:bg-soft-ui-cb/6 hover:color-ui-cb/80 focus-within:bg-soft-ui-cb/8 focus-within:color-ui-cb/85',
          'disabled:color-ui-content/80 disabled:bg-soft-ui-fill/5 hover:disabled:color-ui-content/80 hover:disabled:bg-soft-ui-fill/5',
        ],
      },
      'ghost': {
        base: [
          'color-ui-cb/80 bg-transparent data-[state=open]:bg-soft-ui-cb/8',
          'hover:bg-soft-ui-cb/6 hover:color-ui-cb/80 focus-within:bg-soft-ui-cb/8 focus-within:color-ui-cb/85',
          'disabled:color-ui-fill/80 disabled:bg-transparent hover:disabled:color-ui-fill/80 hover:disabled:bg-transparent',
        ],
      },
      'none': {
        base: 'color-ui-cb bg-transparent',
      },
    },
    size: {
      xs: {
        base: 'text-xs',
        item: 'text-xs',
      },
      sm: {
        base: 'text-sm',
        item: 'text-sm',
      },
      md: {
        base: 'text-base',
        item: 'text-base',
      },
      lg: {
        base: 'text-lg',
        item: 'text-lg',
      },
      xl: {
        base: 'text-xl',
        item: 'text-xl',
      },
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
    underline: {
      true: '',
    },
    highlight: {
      true: '',
    },
  },
  compoundVariants: [
    {
      variant: ['soft', 'ghost', 'none'],
      highlight: false,
      underline: true,
      class: {
        base: [
          'relative after:content-empty after:absolute after:inset-x-0 after:bottom-0 after:h-1px after:bg-soft-ui-cb/40',
          'data-[state=open]:after:h-2px data-[state=open]:after:bg-soft-ui-fill/60',
        ],
      },
    },
    {
      size: ['xs', 'sm', 'md'],
      class: {
        base: 'p-1.5 px-2.5',
        item: 'p-1.5 px-2.5',
      },
    },
    {
      size: ['lg', 'xl'],
      class: {
        base: 'p-2.5 px-3.5',
        item: 'p-2.5 px-3.5',
      },
    },
    {
      variant: ['soft', 'soft-outline', 'ghost', 'none'],
      highlight: true,
      class: {
        base: 'ring ring-inset ring-ui-fill/80',
      },
    },
    {
      variant: ['outline'],
      highlight: true,
      class: {
        base: 'ring-2 ring-ui-fill/80 focus-within:ring-ui-fill/80',
      },
    },
    {
      loading: true,
      prefix: true,
      class: {
        prefixIcon: 'animate-spin',
      },
    },
    {
      loading: true,
      prefix: false,
      suffix: true,
      class: {
        suffixIcon: 'animate-spin',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
  },
})
