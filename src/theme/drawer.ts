/* @unocss-include */
import { ct } from '@byyuurin/ui-kit'

export default ct({
  parts: {
    overlay: 'fixed inset-0 bg-elevated/75',
    content: 'fixed bg-default ring ring-default flex focus:outline-none',
    container: 'w-full flex flex-col gap-4 p-4 overflow-y-auto',
    header: '',
    body: 'flex-1',
    footer: 'flex flex-col gap-1.5',
    title: 'text-highlighted font-semibold',
    description: 'mt-1 text-muted text-sm',
    close: 'ms-auto',
  },
  variants: {
    direction: {
      top: {
        content: 'mb-24 flex-col-reverse',
        handle: 'mb-4',
      },
      bottom: {
        content: 'mt-24 flex-col',
        handle: 'mt-4',
      },
      left: {
        content: 'flex-row-reverse',
        handle: '!mr-4',
      },
      right: {
        content: 'flex-row',
        handle: '!ml-4',
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
        handle: '!w-12 !h-1.5 mx-auto',
      },
    },
    {
      direction: ['left', 'right'],
      class: {
        content: 'w-auto max-w-[calc(100%-2rem)]',
        handle: '!h-12 !w-1.5 mt-auto mb-auto',
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
