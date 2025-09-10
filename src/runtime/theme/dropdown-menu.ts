import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  parts: {
    content: [
      'bg-ui-base shadow-lg rounded-ui-base ring ring-ui-base/10 divide-y divide-ui-base/10 overflow-y-auto scroll-py-1',
      'data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]',
    ],
    arrow: '-mt-px fill-ui-cx stroke-ui-base/10',
    group: 'p-1 isolate',
    label: 'w-full flex items-center font-semibold color-ui-base',
    separator: '-mx-1 my-1 h-px bg-ui-cb/10',
    item: [
      'group relative w-full flex items-center select-none outline-none',
      'before:content-empty before:absolute before:z-[-1] before:inset-px before:rounded-ui-base',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
    ],
    itemLeadingIcon: 'shrink-0',
    itemLeadingAvatar: 'shrink-0',
    itemTrailing: 'ms-auto inline-flex gap-1.5 items-center',
    itemTrailingIcon: 'shrink-0',
    itemTrailingKbds: 'hidden lg:inline-flex items-center shrink-0',
    itemLabel: 'truncate',
    itemLabelExternalIcon: 'inline-block size-3 align-top color-ui-base/50',
  },
  variants: {
    size: {
      xs: {
        content: 'text-xs',
      },
      sm: {
        content: 'text-sm',
      },
      md: {
        content: 'text-base',
      },
      lg: {
        content: 'text-lg',
      },
      xl: {
        content: 'text-xl',
      },
    },
    active: {
      true: {
        item: 'color-ui-base before:bg-ui-cb/10',
        itemLeadingIcon: 'color-ui-base/80',
      },
      false: {
        item: 'color-ui-base/80 data-[highlighted]:color-ui-base data-[state=open]:color-ui-base data-[highlighted]:before:bg-ui-cb/5 data-[state=open]:before:bg-ui-cb/5 transition-colors before:transition-colors',
        itemLeadingIcon: 'color-ui-base/50 group-data-[highlighted]:color-ui-base/80 group-data-[state=open]:color-ui-base/80 transition-colors',
      },
    },
    loading: {
      true: {
        itemLeadingIcon: 'animate-spin',
      },
    },
  },
  compoundVariants: [
    {
      size: ['xs', 'sm', 'md'],
      class: {
        label: 'p-0.25em gap-0.25em',
        item: 'p-0.25em gap-0.25em',
        itemTrailingKbds: 'gap-0.125em',
      },
    },
    {
      size: ['lg', 'xl'],
      class: {
        label: 'p-0.5em gap-0.5em',
        item: 'p-0.5em gap-0.5em',
        itemTrailingKbds: 'gap-0.25em',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
  },
})
