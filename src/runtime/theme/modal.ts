import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  slots: {
    overlay: 'fixed inset-0 bg-black/40',
    content: 'fixed bg-ui-cx divide-y divide-ui-cb/10 flex flex-col focus:outline-none',
    header: 'flex flex-wrap items-center gap-1 px-4 py-5 sm:px-6',
    body: 'flex-1 overflow-y-auto p-4 sm:p-6 empty:hidden',
    footer: 'flex items-center gap-1.5 p-4 sm:px-6',
    title: 'flex-grow color-ui-cb text-xl font-semibold',
    description: 'w-full color-ui-cb/80',
    close: 'ms-auto',
  },
  variants: {
    transition: {
      true: {
        overlay: 'data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]',
        content: 'data-[state=open]:animate-[scale-in_200ms_ease-out] data-[state=closed]:animate-[scale-out_200ms_ease-in]',
      },
    },
    blur: {
      true: {
        overlay: 'backdrop-blur-sm',
      },
    },
    size: {
      fullscreen: {
        content: 'inset-0',
      },
      sm: {
        content: 'w-screen-sm',
      },
      md: {
        content: 'w-screen-md',
      },
      lg: {
        content: 'w-screen-lg',
      },
      xl: {
        content: 'w-screen-xl',
      },
    },
  },
  compoundVariants: [
    {
      size: ['sm', 'md', 'lg', 'xl'],
      class: {
        content: [
          'bottom-4 left-[50%] translate-x-[-50%] h-auto max-w-[calc(100%-2rem)] max-h-[calc(100%-2rem)] rounded-ui-box shadow-sm shadow-ui-cb/10 ring ring-ui-cb/10',
          'sm:bottom-auto sm:top-[50%] sm:translate-y-[-50%]',
        ],
      },
    },
  ],
  defaultVariants: {
    size: 'sm',
  },
})
