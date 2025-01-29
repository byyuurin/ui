import { ct } from '@byyuurin/ui-kit'

export default ct({
  slots: {
    overlay: 'fixed inset-0 bg-ui-c3/75',
    content: 'fixed w-full h-dvh bg-ui-c1 divide-y divide-ui-cb/10 flex flex-col focus:outline-none',
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
        content: 'sm:max-w-screen-sm',
      },
      md: {
        content: 'md:max-w-screen-md',
      },
      lg: {
        content: 'lg:max-w-screen-lg',
      },
      xl: {
        content: 'xl:max-w-screen-xl',
      },
    },
  },
  compoundVariants: [
    {
      size: ['sm', 'md', 'lg', 'xl'],
      class: {
        content: 'top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] sm:h-auto sm:max-h-[calc(100vh-4rem)] sm:rounded-ui-box sm:shadow-lg sm:ring ring-ui-c2',
      },
    },
  ],
})
