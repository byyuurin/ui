/* @unocss-include */
import { ct } from '@byyuurin/ui-kit'

export default ct({
  parts: {
    overlay: 'fixed inset-0 bg-elevated/75',
    content: 'fixed bg-default divide-y divide-default flex flex-col focus:outline-none',
    header: 'flex flex-wrap items-center gap-1 p-4',
    body: 'flex-1 overflow-y-auto p-4',
    footer: 'flex items-center gap-1 p-4',
    title: 'flex-grow text-xl text-highlighted font-semibold',
    description: 'w-full text-muted text-sm',
    close: 'ms-auto',
  },
  variants: {
    transition: {
      true: {
        overlay: 'data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]',
        content: 'data-[state=open]:animate-[scale-in_200ms_ease-out] data-[state=closed]:animate-[scale-out_200ms_ease-in]',
      },
    },
    fullscreen: {
      true: {
        content: 'inset-0',
      },
      false: {
        content: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] max-w-lg max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] rounded-lg shadow-lg ring ring-default overflow-hidden',
      },
    },
  },
})
