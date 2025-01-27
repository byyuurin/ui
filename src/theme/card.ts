import { ct } from '@byyuurin/ui-kit'

export default ct({
  slots: {
    root: 'color-ui-cb bg-ui-c1 ring ring-ui-cb/10 divide-y divide-ui-cb/10 rounded-ui-box shadow-sm shadow-ui-cb/10',
    header: 'flex flex-wrap items-center gap-1 px-4 py-5 sm:px-6',
    body: 'flex-1 overflow-y-auto p-4 sm:p-6 empty:hidden',
    footer: 'flex items-center gap-1.5 p-4 sm:px-6',
    title: 'flex-grow color-ui-cb font-size-xl font-600',
    description: 'w-full color-ui-cb/80 text-sm',
  },
})
