import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  slots: {
    content: [
      'color-ui-base bg-solid-ui-base shadow-lg rounded-ui-box ring ring-ui-base/10',
      'data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] focus:outline-none pointer-events-auto',
    ],
    arrow: 'fill-ui-base stroke-ui-cb/10',
  },
})
