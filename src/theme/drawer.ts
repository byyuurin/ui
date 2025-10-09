/* @unocss-include */
import { ct } from '@byyuurin/ui-kit'

export default ct({
  parts: {
    overlay: 'fixed inset-0 bg-elevated/75',
    content: 'fixed bg-default divide-y divide-default flex flex-col focus:outline-none',
    header: 'flex flex-wrap items-center gap-1 p-4 sm:px-6',
    body: 'flex-1 overflow-y-auto p-4 sm:p-6',
    footer: 'flex items-center gap-1 p-4 sm:p-6',
    title: 'flex-grow text-xl text-highlighted font-semibold',
    description: 'w-full text-muted text-sm',
    close: 'ms-auto',
  },
  variants: {
    direction: {
      top: {
        content: 'inset-x-0 top-0 max-h-full',
      },
      right: {
        content: 'right-0 inset-y-0 w-full max-w-md',
      },
      bottom: {
        content: 'inset-x-0 bottom-0 max-h-full',
      },
      left: {
        content: 'left-0 inset-y-0 w-full max-w-md',
      },
    },
    transition: {
      true: {
        overlay: 'data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]',
      },
    },
    inset: {
      true: {
        content: 'rounded-lg after:hidden overflow-hidden [--initial-transform:calc(100%+1.5rem)]',
      },
    },
  },
  compoundVariants: [
    {
      direction: ['top', 'bottom'],
      class: {
        content: 'h-auto max-h-[96%]',
      },
    },
    {
      direction: ['left', 'right'],
      class: {
        content: 'w-auto max-w-[calc(100%-2rem)]',
      },
    },
    {
      direction: 'top',
      inset: true,
      class: {
        content: 'inset-x-4 top-4',
      },
    },
    {
      direction: 'top',
      inset: false,
      class: {
        content: 'inset-x-0 top-0 rounded-b-lg',
      },
    },
    {
      direction: ['top'],
      transition: true,
      class: {
        content: 'data-[state=open]:animate-[slide-in-from-top_500ms_cubic-bezier(0.32,0.72,0,1)] data-[state=closed]:animate-[slide-out-to-top_500ms_cubic-bezier(0.32,0.72,0,1)]',
      },
    },
    {
      direction: 'bottom',
      inset: true,
      class: {
        content: 'inset-x-4 bottom-4',
      },
    },
    {
      direction: 'bottom',
      inset: false,
      class: {
        content: 'inset-x-0 bottom-0 rounded-t-lg',
      },
    },
    {
      direction: ['bottom'],
      transition: true,
      class: {
        content: 'data-[state=open]:animate-[slide-in-from-bottom_500ms_cubic-bezier(0.32,0.72,0,1)] data-[state=closed]:animate-[slide-out-to-bottom_500ms_cubic-bezier(0.32,0.72,0,1)]',
      },
    },
    {
      direction: 'left',
      inset: true,
      class: {
        content: 'inset-y-4 left-4',
      },
    },
    {
      direction: 'left',
      inset: false,
      class: {
        content: 'inset-y-0 left-0 rounded-r-lg',
      },
    },
    {
      direction: ['left'],
      transition: true,
      class: {
        content: 'data-[state=open]:animate-[slide-in-from-left_500ms_cubic-bezier(0.32,0.72,0,1)] data-[state=closed]:animate-[slide-out-to-left_500ms_cubic-bezier(0.32,0.72,0,1)]',
      },
    },
    {
      direction: 'right',
      inset: true,
      class: {
        content: 'inset-y-4 right-4',
      },
    },
    {
      direction: 'right',
      inset: false,
      class: {
        content: 'inset-y-0 right-0 rounded-l-lg',
      },
    },
    {
      direction: ['right'],
      transition: true,
      class: {
        content: 'data-[state=open]:animate-[slide-in-from-right_500ms_cubic-bezier(0.32,0.72,0,1)] data-[state=closed]:animate-[slide-out-to-right_500ms_cubic-bezier(0.32,0.72,0,1)]',
      },
    },
  ],
})
