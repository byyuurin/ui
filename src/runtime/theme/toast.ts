import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  slots: {
    root: 'relative group overflow-hidden bg-solid-ui-c1 shadow-lg rounded-ui-box ring ring-ui-c2 p-4 flex gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ui-c2',
    wrapper: 'w-0 flex-1 flex flex-col gap-1',
    title: 'text-base font-medium color-ui-cb',
    description: 'text-sm color-ui-cb/80',
    icon: 'shrink-0 size-6 color-ui-cb',
    avatar: 'shrink-0',
    avatarSize: '2xl',
    actions: 'flex flex-wrap gap-1.5 shrink-0',
    progress: 'absolute inset-x-[var(--ui-radius-box)] bottom-0 h-1 z-[-1] color-ui-base/80 bg-solid-current rounded-ui-base',
    close: 'p-0.5',
  },
  variants: {
    multiline: {
      true: {
        root: 'items-start',
        actions: 'items-start mt-1',
      },
      false: {
        root: 'items-center',
        actions: 'items-center',
      },
    },
  },
})
