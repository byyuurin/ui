/* @unocss-include */
import { ct } from '@byyuurin/ui-kit'
import type { VariantsColor } from '../defaults'
import type { ModuleOptions } from '../module'
import { fieldGroupVariantWithRoot } from './field-group'
import inputTheme from './input'

export default (options: Required<ModuleOptions>) => {
  const input = inputTheme(options)
  return ct({
    parts: {
      root: 'relative inline-flex items-center',
      base: [
        'w-full rounded-md border-0 placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
        options.theme.transitions && 'transition-colors',
      ],
      increment: 'absolute flex items-center',
      decrement: 'absolute flex items-center',
    },
    variants: {
      ...fieldGroupVariantWithRoot,
      color: {
        ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])) as Record<VariantsColor, ''>,
        neutral: '',
      },
      size: {
        xs: { base: 'px-2 py-1 text-xs gap-1' },
        sm: { base: 'px-2.5 py-1.5 text-xs gap-1.5' },
        md: { base: 'px-2.5 py-1.5 text-sm gap-1.5' },
        lg: { base: 'px-3 py-2 text-sm gap-2' },
        xl: { base: 'px-3 py-2 text-base gap-2' },
      },
      variant: {
        ...input.variants.variant,
      },
      disabled: {
        true: {
          increment: 'opacity-75 cursor-not-allowed',
          decrement: 'opacity-75 cursor-not-allowed',
        },
      },
      orientation: {
        horizontal: {
          base: 'text-center',
          increment: 'inset-y-0 end-0 pe-1',
          decrement: 'inset-y-0 start-0 ps-1',
        },
        vertical: {
          increment: 'top-0 end-0 pe-1 [&>button]:py-0 scale-80',
          decrement: 'bottom-0 end-0 pe-1 [&>button]:py-0 scale-80',
        },
      },
      highlight: {
        true: '',
      },
    },
    compoundVariants: [
      ...(options.theme.colors || []).map((color: string) => ({
        color: color as VariantsColor,
        variant: ['outline' as const, 'subtle' as const],
        class: { base: `focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-${color}` },
      })),
      ...(options.theme.colors || []).map((color: string) => ({
        color: color as VariantsColor,
        highlight: true,
        class: { base: `ring ring-inset ring-${color}` },
      })),
      {
        color: 'neutral',
        variant: ['outline', 'subtle'],
        class: { base: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted' },
      },
      {
        color: 'neutral',
        highlight: true,
        class: { base: 'ring ring-inset ring-inverted' },
      },
      {
        orientation: 'horizontal',
        size: 'xs',
        class: { base: 'px-7' },
      },
      {
        orientation: 'horizontal',
        size: 'sm',
        class: { base: 'px-8' },
      },
      {
        orientation: 'horizontal',
        size: 'md',
        class: { base: 'px-9' },
      },
      {
        orientation: 'horizontal',
        size: 'lg',
        class: { base: 'px-10' },
      },
      {
        orientation: 'horizontal',
        size: 'xl',
        class: { base: 'px-11' },
      },
      {
        orientation: 'vertical',
        size: 'xs',
        class: { base: 'pe-7' },
      },
      {
        orientation: 'vertical',
        size: 'sm',
        class: { base: 'pe-8' },
      },
      {
        orientation: 'vertical',
        size: 'md',
        class: { base: 'pe-9' },
      },
      {
        orientation: 'vertical',
        size: 'lg',
        class: { base: 'pe-10' },
      },
      {
        orientation: 'vertical',
        size: 'xl',
        class: { base: 'pe-11' },
      },
    ],
    defaultVariants: {
      size: 'md',
      color: 'primary',
      variant: 'outline',
    },
  })
}
