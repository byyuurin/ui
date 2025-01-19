import { ct } from '@byyuurin/ui-kit'

export default ct({
  base: 'focus-visible:outline-ui-fill',
  variants: {
    active: {
      true: 'color-ui-fill/90',
      false: 'color-ui-fill hover:color-ui-fill/80 transition-colors',
    },
    disabled: {
      true: 'cursor-not-allowed color-ui-fill opacity-50 hover:color-ui-fill',
    },
  },
})
