import { ct } from '@byyuurin/ui-kit'

export default ct({
  slots: {
    root: 'relative group overflow-hidden bg-ui-base shadow-lg rounded-ui-box ring ring-ui-base p-4 flex gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ui-base',
    wrapper: 'w-0 flex-1 flex flex-col gap-1',
    title: 'text-sm font-medium color-ui-base',
    description: 'text-sm color-ui-base/75',
    icon: 'shrink-0 size-5 color-ui-base',
    avatar: 'shrink-0',
    avatarSize: '2xl',
    actions: 'flex flex-wrap gap-1.5 shrink-0',
    progress: 'absolute inset-x-0 bottom-0 h-1 z-[-1] color-ui-base/50 bg-current',
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
