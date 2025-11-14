/* @unocss-include */
import { ct } from '@byyuurin/ui-kit'
import type { ModuleOptions } from '../module'
import inputTheme from './input'

export default (options: Required<ModuleOptions>) => {
  const input = inputTheme(options)
  return ct({
    ...input,
    parts: {
      ...input.parts,
      root: [input.parts.root, 'flex-wrap'],
      base: [
        'rounded-md',
        options.theme.transitions && 'transition-colors',
      ],
      item: 'px-1.5 py-0.5 rounded-sm font-medium inline-flex items-center gap-0.5 ring ring-inset ring-accented bg-elevated text-default data-[disabled]:cursor-not-allowed data-[disabled]:opacity-75 wrap-anywhere data-[state=active]:bg-accented',
      itemText: '',
      itemDelete: [
        'inline-flex items-center rounded-xs text-dimmed hover:text-default hover:bg-accented/75 disabled:pointer-events-none',
        options.theme.transitions && 'transition-colors',
      ],
      itemDeleteIcon: 'shrink-0',
      input: 'flex-1 border-0 bg-transparent placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
    },
    variants: {
      ...input.variants,
      size: {
        xs: {
          ...input.variants.size.xs,
          item: 'text-[0.625rem]/3',
          itemDeleteIcon: 'size-3',
        },
        sm: {
          ...input.variants.size.sm,
          item: 'text-[0.625rem]/3',
          itemDeleteIcon: 'size-3',
        },
        md: {
          ...input.variants.size.md,
          item: 'text-xs',
          itemDeleteIcon: 'size-3.5',
        },
        lg: {
          ...input.variants.size.lg,
          item: 'text-xs',
          itemDeleteIcon: 'size-3.5',
        },
        xl: {
          ...input.variants.size.xl,
          item: 'text-sm',
          itemDeleteIcon: 'size-4',
        },
      },
      variant: {
        ...Object.fromEntries(Object.entries(input.variants.variant).map(([key, value]) => [key, { ...value, base: replaceFocus(value.base) }])),
      } as typeof input.variants.variant,
    },
    compoundVariants: [
      ...input.compoundVariants.map((item) => ({
        ...item,
        class: typeof item.class.base === 'string'
          ? { ...item.class, base: replaceFocus(item.class.base) }
          : item.class,
      })),
    ],
  })
}

function replaceFocus(str: string): string {
  return str
    .replace(/focus:/g, 'has-focus:')
    .replace(/focus-visible:/g, 'has-focus-visible:')
}
