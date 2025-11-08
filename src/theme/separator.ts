/* @unocss-include */
import { ct } from '@byyuurin/ui-kit'
import type { VariantsColor } from '../defaults'
import type { ModuleOptions } from '../module'

export default (options: Required<ModuleOptions>) => ct({
  parts: {
    root: 'flex items-center align-middle text-center',
    border: '',
    container: 'font-medium text-default flex',
    icon: 'shrink-0 size-5',
    avatar: 'shrink-0',
    avatarSize: '2xs',
    label: 'text-sm',
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, { border: `border-${color}` }])) as Record<VariantsColor, { border: string }>,
      neutral: { border: 'border-default' },
    },
    orientation: {
      horizontal: {
        root: 'w-full flex-row',
        border: '',
        container: 'mx-3 whitespace-nowrap',
      },
      vertical: {
        root: 'h-full flex-col',
        border: '',
        container: 'my-2',
      },
    },
    start: {
      true: {
        border: 'flex-grow data-[orientation=horizontal]:w-auto data-[orientation=vertical]:h-auto',
      },
    },
    end: {
      true: {
        border: 'flex-grow data-[orientation=horizontal]:w-auto data-[orientation=vertical]:h-auto',
      },
    },
    size: {
      xs: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
    type: {
      solid: {
        border: 'border-solid',
      },
      dashed: {
        border: 'border-dashed',
      },
      dotted: {
        border: 'border-dotted',
      },
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      start: false,
      end: false,
      class: { border: 'w-full' },
    },
    {
      orientation: 'vertical',
      start: false,
      end: false,
      class: { border: 'h-full' },
    },
    {
      orientation: 'horizontal',
      size: 'xs',
      class: { border: 'border-t' },
    },
    {
      orientation: 'horizontal',
      size: 'sm',
      class: { border: 'border-t-[2px]' },
    },
    {
      orientation: 'horizontal',
      size: 'md',
      class: { border: 'border-t-[3px]' },
    },
    {
      orientation: 'horizontal',
      size: 'lg',
      class: { border: 'border-t-[4px]' },
    },
    {
      orientation: 'horizontal',
      size: 'xl',
      class: { border: 'border-t-[5px]' },
    },
    {
      orientation: 'vertical',
      size: 'xs',
      class: { border: 'border-s' },
    },
    {
      orientation: 'vertical',
      size: 'sm',
      class: { border: 'border-s-[2px]' },
    },
    {
      orientation: 'vertical',
      size: 'md',
      class: { border: 'border-s-[3px]' },
    },
    {
      orientation: 'vertical',
      size: 'lg',
      class: { border: 'border-s-[4px]' },
    },
    {
      orientation: 'vertical',
      size: 'xl',
      class: { border: 'border-s-[5px]' },
    },
  ],
  defaultVariants: {
    color: 'neutral',
    size: 'xs',
    type: 'solid',
  },
})
