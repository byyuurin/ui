import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  base: 'border-y border-t-transparent outline-none focus-visible:outline-ui-base/80',
  variants: {
    underline: {
      true: 'border-current',
      false: 'border-transparent',
    },
    active: {
      true: [
        'color-ui-fill',
        'disabled:color-ui-fill aria-disabled:color-ui-fill',
      ],
      false: [
        'color-ui-base/80 hover:color-ui-base/60 transition-colors',
        'disabled:hover:color-ui-base aria-disabled:hover:color-ui-base',
      ],
    },
    disabled: {
      true: 'cursor-not-allowed opacity-50',
    },
  },
})
