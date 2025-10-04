import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  parts: {
    content: 'z-1 flex items-center gap-1 bg-ui-base color-ui-base shadow-sm rounded ring ring-ui-base/10 h-6 px-2 py-1 text-xs select-none data-[state=delayed-open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]',
    arrow: 'fill-ui-cx stroke-ui-cb/10',
    text: 'truncate',
  },
})
