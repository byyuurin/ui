import { ct } from '@byyuurin/ui-kit'

export default ct({
  slots: {
    content: 'flex items-center gap-1 bg-ui-c1 color-ui-base shadow-sm rounded-ui-base ring ring-ui-base/10 h-6 px-2 py-1 text-xs select-none data-[state=delayed-open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]',
    arrow: 'fill-ui-c1 stroke-ui-base/10',
    text: 'truncate',
  },
})
