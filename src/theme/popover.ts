/* @unocss-include */
import { ct } from '@byyuurin/ui-kit'

export default ct({
  parts: {
    content: [
      'z-1 bg-default shadow-lg rounded-md ring ring-default focus:outline-none pointer-events-auto',
      'data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-[--reka-popover-content-transform-origin]',
    ],
    arrow: 'fill-default',
  },
})
