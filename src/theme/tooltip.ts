import { ct } from '@byyuurin/ui-kit'

export default ct({
  slots: {
    content: 'flex items-center gap-1 bg-ui-base color-ui-base shadow-sm rounded-ui-base ring ring-ui-c2 h-6 px-2 py-1 text-xs select-none data-[state=delayed-open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]',
    arrow: 'fill-ui-base stroke-ui-base stroke-2',
    text: 'truncate',
  },
})
