import { ct } from '@byyuurin/ui-kit'

export default ct({
  base: 'focus-visible:outline-ui-base',
  variants: {
    active: {
      true: 'color-ui-fill/90',
      false: 'color-ui-cb hover:color-ui-cb/80 transition-colors',
    },
    disabled: {
      true: 'cursor-not-allowed color-ui-cb opacity-50 hover:color-ui-cb',
    },
  },
})
