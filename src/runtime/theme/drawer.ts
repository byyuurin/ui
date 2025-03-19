import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  slots: {
    overlay: 'fixed z-1 inset-0 bg-black/40',
    content: 'fixed z-1 bg-ui-base ring ring-ui-base/5 flex focus:outline-none',
    container: 'w-full divide-y divide-ui-base/10 flex flex-col overflow-hidden overflow-y-auto',
    header: 'flex flex-wrap items-center gap-1 px-4 py-5 sm:px-6',
    body: 'p-4 sm:p-6 flex-1 sibling:pt-0',
    footer: 'p-4 sm:px-6 flex flex-col gap-1.5',
    title: 'flex-grow color-ui-base text-xl font-semibold',
    description: 'w-full color-ui-base/80',
    close: 'ms-auto',
  },
  variants: {
    direction: {
      top: {
        content: 'top-0 mb-24 flex-col-reverse rounded-b-ui-box',
      },
      bottom: {
        content: 'bottom-0 mt-24 flex-col rounded-t-ui-box',
      },
      left: {
        content: 'left-0 flex-row-reverse rounded-r-ui-box',
      },
      right: {
        content: 'right-0 flex-row rounded-l-ui-box',
      },
    },
    transition: {
      true: {
        overlay: 'data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]',
      },
    },
    inset: {
      true: {
        content: 'rounded-ui-box after:hidden',
      },
    },
  },
  compoundVariants: [
    {
      direction: ['top', 'bottom'],
      class: {
        content: 'inset-x-0 h-auto max-h-[96%]',
      },
    },
    {
      direction: ['left', 'right'],
      class: {
        content: 'inset-y-0 w-auto max-w-[calc(100%-2rem)]',
      },
    },
    {
      direction: ['top'],
      inset: true,
      class: {
        content: 'inset-x-4 top-4',
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
      direction: ['bottom'],
      inset: true,
      class: {
        content: 'inset-x-4 bottom-4',
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
      direction: ['left'],
      inset: true,
      class: {
        content: 'inset-y-4 left-4',
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
      direction: ['right'],
      inset: true,
      class: {
        content: 'inset-y-4 right-4',
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
