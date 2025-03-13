import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  slots: {
    overlay: 'fixed z-1 inset-0 bg-black/40',
    content: 'fixed z-1 bg-ui-cx ring ring-ui-cb/5 flex focus:outline-none',
    handle: 'shrink-0 rounded-full bg-soft-ui-cb/17.5',
    container: 'w-full flex flex-col overflow-hidden overflow-y-auto',
    header: 'p-4 sm:px-6 sibling:pt-0',
    title: 'color-ui-cb text-xl font-semibold',
    description: 'mt-1 color-ui-cb/80',
    body: 'p-4 sm:px-6 flex-1 sibling:pt-0',
    footer: 'p-4 sm:px-6 flex flex-col gap-1.5',
  },
  variants: {
    direction: {
      top: {
        content: 'top-0 mb-24 flex-col-reverse rounded-b-ui-box',
        handle: 'mb-4',
      },
      bottom: {
        content: 'bottom-0 mt-24 flex-col rounded-t-ui-box',
        handle: 'mt-4',
      },
      left: {
        content: 'left-0 flex-row-reverse rounded-r-ui-box',
        handle: 'mr-4',
      },
      right: {
        content: 'right-0 flex-row rounded-l-ui-box',
        handle: 'ml-4',
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
        handle: 'w-12 h-1.5 mx-auto',
      },
    },
    {
      direction: ['left', 'right'],
      class: {
        content: 'inset-y-0 w-auto max-w-[calc(100%-2rem)]',
        handle: 'h-12 w-1.5 my-auto',
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
      direction: ['bottom'],
      inset: true,
      class: {
        content: 'inset-x-4 bottom-4',
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
      direction: ['right'],
      inset: true,
      class: {
        content: 'inset-y-4 right-4',
      },
    },
  ],
})
