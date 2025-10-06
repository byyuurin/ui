import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  base: 'relative',
  variants: {
    size: {
      xs: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
    orientation: {
      horizontal: 'inline-flex -space-x-px',
      vertical: 'flex flex-col -space-y-px',
    },
  },
})

export const fieldGroupVariant = {
  groupOrientation: {
    horizontal: {
      base: 'not-only-child:first:rounded-e-none not-only-child:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]',
    },
    vertical: {
      base: 'not-only-child:first:rounded-b-none not-only-child:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]',
    },
  },
}

export const fieldGroupVariantWithRoot = {
  groupOrientation: {
    horizontal: {
      root: 'group has-focus-visible:z-[1]',
      base: 'group-not-only-child:group-first:rounded-e-none group-not-only-child:group-last:rounded-s-none group-not-last:group-not-first:rounded-none',
    },
    vertical: {
      root: 'group has-focus-visible:z-[1]',
      base: 'group-not-only-child:group-first:rounded-b-none group-not-only-child:group-last:rounded-t-none group-not-last:group-not-first:rounded-none',
    },
  },
}
