import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  parts: {
    root: 'group relative overflow-hidden bg-ui-base shadow-lg rounded ring ring-ui-base/5 p-4 flex gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ui-base/5',
    wrapper: 'w-0 flex-1 flex flex-col gap-1',
    title: 'text-base font-medium color-ui-base',
    description: 'text-sm color-ui-base/80',
    icon: 'shrink-0 size-1.25em color-ui-base',
    avatar: 'shrink-0',
    avatarSize: '2xl',
    actions: 'flex flex-wrap gap-1.5 shrink-0',
    progress: 'absolute inset-x-[var(--ui-radius-box)] bottom-0 h-1 z-[-1] color-ui-fill/80 bg-current rounded',
    close: 'p-0.5',
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'items-center',
        actions: 'items-center',
      },
      vertical: {
        root: 'items-start',
        actions: 'items-start',
      },
    },
    title: {
      true: {
        description: 'mt-1',
      },
    },
  },
})
