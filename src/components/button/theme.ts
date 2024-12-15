import { ct } from '@byyuurin/ui-kit'

export default ct({
  base: 'border-2 px-2.5 py-1.5 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  variants: {
    type: {
      solid: 'border-transparent bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700',
      outline: 'border-blue-500 text-blue-500 hover:bg-blue-50 active:bg-blue-100',
    },
  },
})
