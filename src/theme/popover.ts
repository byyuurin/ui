import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  parts: {
    content: [
      'z-1 color-ui-base bg-ui-base shadow-lg rounded ring ring-ui-base/10',
      'data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] focus:outline-none pointer-events-auto',
    ],
    arrow: 'fill-ui-base stroke-ui-cb/10',
  },
})
