/* @unocss-include */
import { ct } from '@byyuurin/ui-kit'
import type { VariantsColor } from '../defaults'
import type { ModuleOptions } from '../module'
import { fieldGroupVariantWithRoot } from './field-group'

export default (options: Required<ModuleOptions>) => ct({
  parts: {
    root: 'relative inline-flex items-center',
    base: [
      'w-full rounded-md border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
      options.theme.transitions && 'transition-colors',
    ],
    leading: 'absolute inset-y-0 start-0 flex items-center',
    leadingIcon: 'shrink-0 text-dimmed',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    trailing: 'absolute inset-y-0 end-0 flex items-center',
    trailingIcon: 'shrink-0 text-dimmed',
  },
  variants: {
    ...fieldGroupVariantWithRoot,
    size: {
      xs: {
        base: 'px-2 py-1 text-xs gap-1',
        leading: 'ps-2',
        trailing: 'pe-2',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-4',
      },
      sm: {
        base: 'px-2.5 py-1.5 text-xs gap-1.5',
        leading: 'ps-2.5',
        trailing: 'pe-2.5',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-4',
      },
      md: {
        base: 'px-2.5 py-1.5 text-sm gap-1.5',
        leading: 'ps-2.5',
        trailing: 'pe-2.5',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-5',
      },
      lg: {
        base: 'px-3 py-2 text-sm gap-2',
        leading: 'ps-3',
        trailing: 'pe-3',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-5',
      },
      xl: {
        base: 'px-3 py-2 text-base gap-2',
        leading: 'ps-3',
        trailing: 'pe-3',
        leadingIcon: 'size-6',
        leadingAvatarSize: 'xs',
        trailingIcon: 'size-6',
      },
    },
    variant: {
      outline: { base: 'text-highlighted bg-default ring ring-inset ring-accented' },
      soft: { base: 'text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50' },
      subtle: { base: 'text-highlighted bg-elevated ring ring-inset ring-accented' },
      ghost: { base: 'text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent' },
      none: { base: 'text-highlighted bg-transparent' },
    },
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])) as Record<VariantsColor, ''>,
      neutral: '',
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
    highlight: {
      true: '',
    },
    type: {
      file: { base: 'file:me-1.5 file:font-medium file:text-muted file:outline-none' },
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
      leading: true,
      size: 'xs',
      class: { base: 'ps-7' },
    },
    {
      leading: true,
      size: 'sm',
      class: { base: 'ps-8' },
    },
    {
      leading: true,
      size: 'md',
      class: { base: 'ps-9' },
    },
    {
      leading: true,
      size: 'lg',
      class: { base: 'ps-10' },
    },
    {
      leading: true,
      size: 'xl',
      class: { base: 'ps-11' },
    },
    {
      trailing: true,
      size: 'xs',
      class: { base: 'pe-7' },
    },
    {
      trailing: true,
      size: 'sm',
      class: { base: 'pe-8' },
    },
    {
      trailing: true,
      size: 'md',
      class: { base: 'pe-9' },
    },
    {
      trailing: true,
      size: 'lg',
      class: { base: 'pe-10' },
    },
    {
      trailing: true,
      size: 'xl',
      class: { base: 'pe-11' },
    },
    {
      loading: true,
      leading: true,
      class: {
        leadingIcon: 'animate-spin',
      },
    },
    {
      loading: true,
      leading: false,
      trailing: true,
      class: {
        trailingIcon: 'animate-spin',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary',
    variant: 'outline',
  },
})
