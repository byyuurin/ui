import { ct } from '@byyuurin/ui-kit'

export default ct({
  base: 'transition',
  variants: {
    variant: {
      solid: 'color-white',
      outline: 'bg-transparent border',
      soft: '',
      ghost: 'bg-transparent',
      link: 'bg-transparent',
    },
    size: {
      none: 'font-size-[calc(var(--ui-units)*0)]',
      xs: 'font-size-[calc(var(--ui-units)*0.75)]',
      sm: 'font-size-[calc(var(--ui-units)*0.875)]',
      md: 'font-size-[calc(var(--ui-units)*1)]',
      lg: 'font-size-[calc(var(--ui-units)*1.25)]',
      xl: 'font-size-[calc(var(--ui-units)*1.5)]',
    },
    round: {
      true: 'rounded-full',
      false: 'rounded-[--ui-radius]',
    },
    disabled: {
      true: 'cursor-not-allowed',
      false: 'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    },
  },
  compoundVariants: [
    {
      variant: 'solid',
      disabled: true,
      class: 'bg-[rgb(var(--ui-bg))]/50',
    },
    {
      variant: 'solid',
      disabled: false,
      class: 'bg-[rgb(var(--ui-bg))]/90 hover:bg-[rgb(var(--ui-bg))]/75 active:bg-[rgb(var(--ui-bg))]',
    },

    {
      variant: 'outline',
      disabled: true,
      class: ' border-[rgb(var(--ui-border))]/50 color-[rgb(var(--ui-text))]/50',
    },
    {
      variant: 'outline',
      disabled: false,
      class: 'border-[rgb(var(--ui-border))] color-[rgb(var(--ui-text))] hover:bg-[rgb(var(--ui-bg))]/10 active:bg-[rgb(var(--ui-bg))]/25',
    },

    {
      variant: 'soft',
      disabled: true,
      class: 'bg-[rgb(var(--ui-bg))]/5 color-[rgb(var(--ui-text))]/25',
    },
    {
      variant: 'soft',
      disabled: false,
      class: 'bg-[rgb(var(--ui-bg))]/10 color-[rgb(var(--ui-text))]/75 hover:bg-[rgb(var(--ui-bg))]/15 hover:color-[rgb(var(--ui-text))]/80 active:bg-[rgb(var(--ui-bg))]/20 active:color-[rgb(var(--ui-text))]/85',
    },

    {
      variant: 'ghost',
      disabled: true,
      class: 'color-[rgb(var(--ui-text))]/50',
    },
    {
      variant: 'ghost',
      disabled: false,
      class: 'color-[rgb(var(--ui-text))]/75 hover:bg-[rgb(var(--ui-bg))]/10 hover:color-[rgb(var(--ui-text))]/80 active:bg-[rgb(var(--ui-bg))]/20 active:color-[rgb(var(--ui-text))]/85',
    },

    {
      variant: 'link',
      disabled: true,
      class: 'color-[rgb(var(--ui-text))]/50',
    },
    {
      variant: 'link',
      disabled: false,
      class: 'color-[rgb(var(--ui-text))] hover:color-[rgb(var(--ui-text))]/80 active:color-[rgb(var(--ui-text))]/90',
    },

    {
      size: ['xs', 'sm', 'md', 'lg', 'xl'],
      class: 'p-[calc(var(--ui-units)*0.125)] px-[calc(var(--ui-units)*0.5)]',
    },
  ],
})
