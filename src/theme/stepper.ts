// @unocss-include
import { ct } from '@byyuurin/ui-kit'
import type { VariantsColor } from '../defaults'
import type { ModuleOptions } from '../module'

export default (options: Required<ModuleOptions>) => ct({
  parts: {
    root: 'flex gap-4',
    header: 'flex',
    item: 'group text-center relative w-full',
    container: 'relative',
    trigger: 'rounded-full font-medium text-center align-middle flex items-center justify-center font-semibold group-data-[state=completed]:text-inverted group-data-[state=active]:text-inverted text-muted bg-elevated focus-visible:outline-2 focus-visible:outline-offset-2',
    indicator: 'flex items-center justify-center size-full',
    icon: 'shrink-0',
    separator: 'absolute rounded-full group-data-[disabled]:opacity-75 bg-accented',
    wrapper: '',
    title: 'font-medium text-default',
    description: 'text-muted text-wrap',
    content: 'size-full',
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'flex-col',
        container: 'flex justify-center',
        separator: 'top-[calc(50%-2px)] h-0.5',
        wrapper: 'mt-1',
      },
      vertical: {
        header: 'flex-col gap-4',
        item: 'flex text-start',
        separator: 'start-[calc(50%-1px)] -bottom-[0.625rem] w-0.5',
      },
    },
    size: {
      xs: {
        trigger: 'size-6 text-xs',
        icon: 'size-3',
        title: 'text-xs',
        description: 'text-xs',
        wrapper: 'mt-1.5',
      },
      sm: {
        trigger: 'size-8 text-sm',
        icon: 'size-4',
        title: 'text-xs',
        description: 'text-xs',
        wrapper: 'mt-2',
      },
      md: {
        trigger: 'size-10 text-base',
        icon: 'size-5',
        title: 'text-sm',
        description: 'text-sm',
        wrapper: 'mt-2.5',
      },
      lg: {
        trigger: 'size-12 text-lg',
        icon: 'size-6',
        title: 'text-base',
        description: 'text-base',
        wrapper: 'mt-3',
      },
      xl: {
        trigger: 'size-14 text-xl',
        icon: 'size-7',
        title: 'text-lg',
        description: 'text-lg',
        wrapper: 'mt-3.5',
      },
    },
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, {
        trigger: `group-data-[state=completed]:bg-${color} group-data-[state=active]:bg-${color} focus-visible:outline-${color}`,
        separator: `group-data-[state=completed]:bg-${color}`,
      }])) as Record<VariantsColor, { trigger: string, separator: string }>,
      neutral: {
        trigger: 'group-data-[state=completed]:bg-inverted group-data-[state=active]:bg-inverted focus-visible:outline-inverted',
        separator: 'group-data-[state=completed]:bg-inverted',
      },
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      size: 'xs',
      class: { separator: 'start-[calc(50%+1rem)] end-[calc(-50%+1rem)]' },
    },
    {
      orientation: 'horizontal',
      size: 'sm',
      class: { separator: 'start-[calc(50%+1.25rem)] end-[calc(-50%+1.25rem)]' },
    },
    {
      orientation: 'horizontal',
      size: 'md',
      class: { separator: 'start-[calc(50%+1.75rem)] end-[calc(-50%+1.75rem)]' },
    },
    {
      orientation: 'horizontal',
      size: 'lg',
      class: { separator: 'start-[calc(50%+2rem)] end-[calc(-50%+2rem)]' },
    },
    {
      orientation: 'horizontal',
      size: 'xl',
      class: { separator: 'start-[calc(50%+2.25rem)] end-[calc(-50%+2.25rem)]' },
    },
    {
      orientation: 'vertical',
      size: 'xs',
      class: { separator: 'top-7.5', item: 'gap-1.5' },
    },
    {
      orientation: 'vertical',
      size: 'sm',
      class: { separator: 'top-9.5', item: 'gap-2' },
    },
    {
      orientation: 'vertical',
      size: 'md',
      class: { separator: 'top-11.5', item: 'gap-2.5' },
    },
    {
      orientation: 'vertical',
      size: 'lg',
      class: { separator: 'top-13.5', item: 'gap-3' },
    },
    {
      orientation: 'vertical',
      size: 'xl',
      class: { separator: 'top-15.5', item: 'gap-3.5' },
    },
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
})
