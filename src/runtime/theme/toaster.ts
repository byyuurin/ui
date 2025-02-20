import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  slots: {
    viewport: [
      'fixed flex flex-col w-[calc(100%-2rem)] sm:w-96 z-[100] focus:outline-none',
      'data-[expanded=true]:h-[var(--height)]',
    ],
    base: [
      'pointer-events-auto absolute inset-x-0 z-[var(--index)] [transform:var(--transform)] transition-all duration-200 ease-out',
      '[&[data-expanded=false][data-front=false]]:h-[var(--front-height)]',
      '[&[data-expanded=false][data-front=false]>*]:invisible',
      'data-[state=closed]:animate-[toast-closed_200ms_ease-in-out]',
      '[&[data-state=closed][data-expanded=false][data-front=false]]:animate-[toast-collapsed-closed_200ms_ease-in-out]',
      'data-[swipe=move]:transition-none',
    ],
  },
  variants: {
    clickable: {
      true: {
        base: 'cursor-pointer',
      },
    },
    position: {
      'top-left': {
        viewport: 'left-4',
      },
      'top-center': {
        viewport: 'left-1/2 -translate-x-1/2',
      },
      'top-right': {
        viewport: 'right-4',
      },
      'bottom-left': {
        viewport: 'left-4',
      },
      'bottom-center': {
        viewport: 'left-1/2 -translate-x-1/2',
      },
      'bottom-right': {
        viewport: 'right-4',
      },
    },
    swipeDirection: {
      up: {
        base: 'data-[swipe=end]:animate-[toast-slide-up_200ms_ease-out]',
      },
      right: {
        base: 'data-[swipe=end]:animate-[toast-slide-right_200ms_ease-out]',
      },
      down: {
        base: 'data-[swipe=end]:animate-[toast-slide-down_200ms_ease-out]',
      },
      left: {
        base: 'data-[swipe=end]:animate-[toast-slide-left_200ms_ease-out]',
      },
    },
  },
  compoundVariants: [
    {
      position: ['top-left', 'top-center', 'top-right'],
      class: {
        viewport: 'top-4',
        base: 'top-0 data-[state=open]:animate-[slide-in-from-top_200ms_ease-in-out]',
      },
    },
    {
      position: ['bottom-left', 'bottom-center', 'bottom-right'],
      class: {
        viewport: 'bottom-4',
        base: 'bottom-0 data-[state=open]:animate-[slide-in-from-bottom_200ms_ease-in-out]',
      },
    },
    {
      swipeDirection: ['left', 'right'],
      class: {
        base: [
          'data-[swipe=move]:translate-x-[var(--reka-toast-swipe-move-x)]',
          'data-[swipe=end]:translate-x-[var(--reka-toast-swipe-end-x)]',
          'data-[swipe=cancel]:translate-x-0',
        ],
      },
    },
    {
      swipeDirection: ['up', 'down'],
      class: {
        base: [
          'data-[swipe=move]:translate-y-[var(--reka-toast-swipe-move-y)]',
          'data-[swipe=end]:translate-y-[var(--reka-toast-swipe-end-y)]',
          'data-[swipe=cancel]:translate-y-0',
        ],
      },
    },
  ],
})
