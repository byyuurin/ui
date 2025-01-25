import { ct } from '@byyuurin/ui-kit'

export default ct({
  slots: {
    overlay: 'fixed inset-0 bg-ui-c3/75',
    content: 'fixed bg-ui-c1 ring ring-ui-base/5 flex focus:outline-none',
    handle: 'shrink-0 rounded-full bg-ui-cb/17.5',
    container: 'w-full flex flex-col gap-4 p-4 overflow-y-auto',
    header: '',
    title: 'color-ui-base font-semibold',
    description: 'mt-1 color-ui-base/80 text-sm',
    body: 'flex-1',
    footer: 'flex flex-col gap-1.5',
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
