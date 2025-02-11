import { ct } from '@byyuurin/ui-kit'

export default ct({
  base: 'border-y border-t-transparent outline-none focus-visible:outline-ui-cb/80',
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
        'color-ui-cb hover:color-ui-cb/80 transition-colors',
        'disabled:hover:color-ui-cb aria-disabled:hover:color-ui-cb',
      ],
    },
    disabled: {
      true: 'cursor-not-allowed opacity-50',
    },
  },
})
