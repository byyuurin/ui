import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  slots: {
    root: 'relative overflow-auto',
    base: 'min-w-full overflow-clip',
    caption: 'sr-only',
    thead: 'relative [&>tr]:after:absolute [&>tr]:after:inset-x-0 [&>tr]:after:bottom-0 [&>tr]:after:h-px [&>tr]:after:bg-ui-cb/20',
    tbody: 'divide-y divide-ui-base/10',
    tr: 'data-[selected=true]:bg-soft-ui-cb/50',
    th: 'px-4 py-3.5 text-sm color-ui-base text-left rtl:text-right font-semibold [&:has([role=checkbox])]:pe-0',
    td: 'p-4 text-sm color-ui-base/80 whitespace-nowrap [&:has([role=checkbox])]:pe-0',
    empty: 'py-6 text-center text-sm color-ui-base/80',
    loading: '',
  },
  variants: {
    sticky: {
      true: {
        thead: 'sticky z-1 top-0 inset-x-0 bg-ui-base/90 backdrop-blur',
      },
    },
    pinned: {
      true: {
        th: 'sticky bg-ui-base/90 data-[pinned=left]:left-0 data-[pinned=right]:right-0',
        td: 'sticky bg-ui-base/90 data-[pinned=left]:left-0 data-[pinned=right]:right-0',
      },
    },
    expanded: {
      true: {
        tr: 'animate-[fade-in_200ms_ease-out]',
      },
    },
  },
})
