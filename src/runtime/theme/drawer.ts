import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  slots: {
    overlay: 'fixed inset-0 bg-solid-ui-c3/75',
    content: 'fixed bg-solid-ui-c1 ring ring-ui-cb/5 flex focus:outline-none',
    handle: 'shrink-0 rounded-full bg-solid-ui-cb/17.5',
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
      right: {
        content: 'right-4 flex-row rounded-l-ui-box',
        handle: 'ml-4',
      },
      bottom: {
        content: 'bottom-0 mt-24 flex-col rounded-t-ui-box',
        handle: 'mt-4',
      },
      left: {
        content: 'left-4 flex-row-reverse rounded-r-ui-box',
        handle: 'mr-4',
      },
    },
    blur: {
      true: {
        overlay: 'backdrop-blur-sm',
      },
    },
    full: {
      true: '',
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
      direction: ['top', 'bottom'],
      full: false,
      class: {
        content: 'inset-x-4 my-4 rounded-ui-box after:hidden',
      },
    },
    {
      direction: ['right', 'left'],
      class: {
        content: 'inset-y-0 w-auto max-w-[calc(100%-2rem)]',
        handle: 'h-12 w-1.5 my-auto',
      },
    },
    {
      direction: ['right', 'left'],
      full: false,
      class: {
        content: 'inset-y-4 rounded-ui-box after:hidden',
      },
    },
  ],
})
