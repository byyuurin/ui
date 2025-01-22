import { ct } from '@byyuurin/ui-kit'

export default ct({
  slots: {
    content: [
      'color-ui-base bg-ui-base shadow-lg rounded-ui-box ring ring-ui-base',
      'data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] focus:outline-none pointer-events-auto',
    ],
    arrow: 'fill-ui-base stroke-ui-base',
  },
})
