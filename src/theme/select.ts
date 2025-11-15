/* @unocss-include */
import { ct } from '@byyuurin/ui-kit'
import type { ModuleOptions } from '../module'
import { fieldGroupVariant } from './field-group'
import inputTheme from './input'

export default (options: Required<ModuleOptions>) => {
  const input = inputTheme(options)

  return ct({
    parts: {
      ...input.parts,
      root: undefined,
      base: [
        'relative group rounded-md inline-flex items-center focus:outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-75',
        options.theme.transitions && 'transition-colors',
      ],
      value: 'truncate pointer-events-none',
      placeholder: 'truncate text-dimmed',
      arrow: 'fill-default',
      content: [
        'z-1 max-h-60 w-[--reka-select-trigger-width] bg-default shadow-lg rounded-md ring ring-default overflow-hidden origin-[--reka-select-content-transform-origin] pointer-events-auto flex flex-col',
        'data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]',
      ],
      viewport: 'relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1',
      group: 'p-1 isolate',
      empty: 'text-center text-muted',
      label: 'font-semibold text-highlighted',
      separator: '-mx-1 my-1 h-px bg-border',
      item: [
        'group relative w-full flex items-start select-none outline-none before:content-empty before:absolute before:z-[-1] before:inset-px before:rounded-md cursor-pointer data-[disabled]:cursor-not-allowed data-[disabled]:opacity-75 text-default data-[highlighted]:not-[[data-disabled]]:text-highlighted data-[highlighted]:not-[[data-disabled]]:before:bg-elevated/50',
        options.theme.transitions && 'transition-colors before:transition-colors',
      ],
      itemLeadingIcon: [
        'shrink-0 text-dimmed group-data-[highlighted]:group-not-[[data-disabled]]:text-default group-not-[[data-disabled]]:text-default',
        options.theme.transitions && 'transition-colors',
      ],
      itemLeadingAvatar: 'shrink-0',
      itemLeadingAvatarSize: '',
      itemLeadingChip: 'shrink-0',
      itemLeadingChipSize: '',
      itemTrailing: 'ms-auto inline-flex gap-1.5 items-center',
      itemTrailingIcon: 'shrink-0',
      itemWrapper: 'flex-1 flex flex-col min-w-0',
      itemLabel: 'truncate',
      itemDescription: 'truncate text-muted',
    },
    variants: {
      ...input.variants,
      ...fieldGroupVariant,
      size: {
        xs: {
          ...input.variants.size.xs,
          label: 'p-1 text-2.5/3 gap-1',
          item: 'p-1 text-xs gap-1',
          itemLeadingIcon: 'size-4',
          itemLeadingAvatarSize: '3xs',
          itemLeadingChip: 'size-4',
          itemLeadingChipSize: 'sm',
          itemTrailingIcon: 'size-4',
          empty: 'p-1 text-xs',
        },
        sm: {
          ...input.variants.size.sm,
          label: 'p-1.5 text-2.5/3 gap-1.5',
          item: 'p-1.5 text-xs gap-1.5',
          itemLeadingIcon: 'size-4',
          itemLeadingAvatarSize: '3xs',
          itemLeadingChip: 'size-4',
          itemLeadingChipSize: 'sm',
          itemTrailingIcon: 'size-4',
          empty: 'p-1.5 text-xs',
        },
        md: {
          ...input.variants.size.md,
          label: 'p-1.5 text-3/4 gap-1.5',
          item: 'p-1.5 text-sm gap-1.5',
          itemLeadingIcon: 'size-5',
          itemLeadingAvatarSize: '2xs',
          itemLeadingChip: 'size-5',
          itemLeadingChipSize: 'md',
          itemTrailingIcon: 'size-5',
          empty: 'p-1.5 text-sm',
        },
        lg: {
          ...input.variants.size.lg,
          label: 'p-2 text-3/4 gap-2',
          item: 'p-2 text-sm gap-2',
          itemLeadingIcon: 'size-5',
          itemLeadingAvatarSize: '2xs',
          itemLeadingChip: 'size-5',
          itemLeadingChipSize: 'md',
          itemTrailingIcon: 'size-5',
          empty: 'p-2 text-sm',
        },
        xl: {
          ...input.variants.size.xl,
          label: 'p-2 text-3.5/5 gap-2',
          item: 'p-2 text-base gap-2',
          itemLeadingIcon: 'size-6',
          itemLeadingAvatarSize: 'xs',
          itemLeadingChip: 'size-6',
          itemLeadingChipSize: 'lg',
          itemTrailingIcon: 'size-6',
          empty: 'p-2 text-base',
        },
      },
    },
    compoundVariants: [
      ...input.compoundVariants.map((item) => {
        return {
          ...item,
          class: {
            ...item.class,
            base: typeof item.class.base === 'string' ? item.class.base.replace(/focus-visible:/g, 'focus:') : item.class.base,
          },
        }
      }) as any,
    ],
    defaultVariants: {
      ...input.defaultVariants,
    },
  })
}
