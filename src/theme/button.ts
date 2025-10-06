/* @unocss-include */
import { ct } from '@byyuurin/ui-kit'
import type { VariantsColor } from '../defaults'
import type { ModuleOptions } from '../module'
import { fieldGroupVariant } from './field-group'

export default (options: Required<ModuleOptions>) => ct({
  parts: {
    base: [
      'rounded-md font-medium inline-flex items-center',
      options.theme.transitions && 'transition-colors',
      'disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75',
    ],
    label: 'truncate',
    leadingIcon: 'shrink-0',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    trailingIcon: 'shrink-0',
  },
  variants: {
    ...fieldGroupVariant,
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])) as Record<VariantsColor, ''>,
      neutral: '',
    },
    variant: {
      solid: '',
      outline: '',
      soft: '',
      subtle: '',
      ghost: '',
      link: '',
    },
    size: {
      xs: {
        base: 'px-2 py-1 text-xs gap-1',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-4',
      },
      sm: {
        base: 'px-2.5 py-1.5 text-xs gap-1.5',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-4',
      },
      md: {
        base: 'px-2.5 py-1.5 text-sm gap-1.5',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-5',
      },
      lg: {
        base: 'px-3 py-2 text-sm gap-2',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-5',
      },
      xl: {
        base: 'px-3 py-2 text-base gap-2',
        leadingIcon: 'size-6',
        leadingAvatarSize: 'xs',
        trailingIcon: 'size-6',
      },
    },
    block: {
      true: {
        base: 'w-full justify-center',
        trailingIcon: 'ms-auto',
      },
    },
    square: {
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
    active: {
      true: {
        base: '',
      },
      false: {
        base: '',
      },
    },
  },
  compoundVariants: [
    ...(options.theme.colors || []).map((color: string) => ({
      color: color as VariantsColor,
      variant: 'solid',
      class: {
        base: `text-inverted bg-${color} hover:bg-${color}/75 active:bg-${color}/75 disabled:bg-${color} aria-disabled:bg-${color} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${color}`,
      },
    } as const)),
    ...(options.theme.colors || []).map((color: string) => ({
      color: color as VariantsColor,
      variant: 'outline',
      class: {
        base: `ring ring-inset ring-${color}/50 text-${color} hover:bg-${color}/10 active:bg-${color}/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 } focus-visible:ring-${color}`,
      },
    } as const)),
    ...(options.theme.colors || []).map((color: string) => ({
      color: color as VariantsColor,
      variant: 'soft',
      class: {
        base: `text-${color} bg-${color}/10 hover:bg-${color}/15 active:bg-${color}/15 focus:outline-none focus-visible:bg-${color}/15 disabled:bg-${color}/10 aria-disabled:bg-${color}/10`,
      },
    } as const)),
    ...(options.theme.colors || []).map((color: string) => ({
      color: color as VariantsColor,
      variant: 'subtle',
      class: {
        base: `text-${color} ring ring-inset ring-${color}/25 bg-${color}/10 hover:bg-${color}/15 active:bg-${color}/15 disabled:bg-${color}/10 aria-disabled:bg-${color}/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-${color}`,
      },
    } as const)),
    ...(options.theme.colors || []).map((color: string) => ({
      color: color as VariantsColor,
      variant: 'ghost',
      class: {
        base: `text-${color} hover:bg-${color}/10 active:bg-${color}/10 focus:outline-none focus-visible:bg-${color}/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent`,
      },
    } as const)),
    ...(options.theme.colors || []).map((color: string) => ({
      color: color as VariantsColor,
      variant: 'link',
      class: {
        base: `text-${color} hover:text-${color}/75 active:text-${color}/75 disabled:text-${color} aria-disabled:text-${color} focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-${color}`,
      },
    } as const)),
    {
      color: 'neutral',
      variant: 'solid',
      class: {
        base: 'text-inverted bg-inverted hover:bg-inverted/90 active:bg-inverted/90 disabled:bg-inverted aria-disabled:bg-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted',
      },
    },
    {
      color: 'neutral',
      variant: 'outline',
      class: {
        base: 'ring ring-inset ring-accented text-default bg-default hover:bg-elevated active:bg-elevated disabled:bg-default aria-disabled:bg-default focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted',
      },
    },
    {
      color: 'neutral',
      variant: 'soft',
      class: {
        base: 'text-default bg-elevated hover:bg-accented/75 active:bg-accented/75 focus:outline-none focus-visible:bg-accented/75 disabled:bg-elevated aria-disabled:bg-elevated',
      },
    },
    {
      color: 'neutral',
      variant: 'subtle',
      class: {
        base: 'ring ring-inset ring-accented text-default bg-elevated hover:bg-accented/75 active:bg-accented/75 disabled:bg-elevated aria-disabled:bg-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted',
      },
    },
    {
      color: 'neutral',
      variant: 'ghost',
      class: {
        base: 'text-default hover:bg-elevated active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent',
      },
    },
    {
      color: 'neutral',
      variant: 'link',
      class: {
        base: 'text-muted hover:text-default active:text-default disabled:text-muted aria-disabled:text-muted focus:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-inverted',
      },
    },
    {
      size: 'xs',
      square: true,
      class: { base: 'p-1' },
    },
    {
      size: 'sm',
      square: true,
      class: { base: 'p-1.5' },
    },
    {
      size: 'md',
      square: true,
      class: { base: 'p-1.5' },
    },
    {
      size: 'lg',
      square: true,
      class: { base: 'p-2' },
    },
    {
      size: 'xl',
      square: true,
      class: { base: 'p-2' },
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
    color: 'primary',
    variant: 'solid',
    size: 'md',
  },
})
