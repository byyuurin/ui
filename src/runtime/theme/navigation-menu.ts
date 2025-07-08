import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  parts: {
    root: 'relative flex gap-1.5 [&>div]:min-w-0',
    list: 'isolate min-w-0',
    label: 'w-full flex items-center gap-1.5 font-semibold text-xs/5 color-ui-base px-2.5 py-1.5',
    item: 'min-w-0',
    link: 'group relative w-full flex items-center gap-1.5 font-medium text-sm before:content-empty before:absolute before:z-[-1] before:rounded-ui-base focus:outline-none focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:before:ring-ui-cb/90',
    linkLeadingIcon: 'shrink-0 size-5',
    linkTrailing: 'group ms-auto inline-flex gap-1.5 items-center',
    linkTrailingChip: 'shrink-0',
    linkTrailingIcon: 'size-5 transform shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200',
    linkLabel: 'truncate',
    linkLabelExternalIcon: 'inline-block size-3 align-top color-ui-base/50',
    childList: 'isolate',
    childLabel: 'text-xs color-ui-base',
    childItem: '',
    childLink: 'group relative size-full flex items-start text-start text-sm before:content-empty before:absolute before:z-[-1] before:rounded-ui-base focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:outline-ui-cb/90',
    childLinkWrapper: 'min-w-0',
    childLinkIcon: 'size-5 shrink-0',
    childLinkLabel: 'truncate',
    childLinkLabelExternalIcon: 'inline-block size-3 align-top color-ui-base/50',
    childLinkDescription: 'color-ui-base/60',
    separator: 'px-2 h-px bg-ui-cb/20',
    viewportWrapper: 'absolute top-full left-0 flex w-full',
    viewport: 'relative overflow-hidden bg-ui-cx shadow-lg rounded-ui-base ring ring-ui-cb/20 h-[--reka-navigation-menu-viewport-height] w-full transition-[width,height,left] duration-200 origin-[top_center] data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] z-[1]',
    content: '',
    indicator: 'absolute data-[state=visible]:animate-[fade-in_100ms_ease-out] data-[state=hidden]:animate-[fade-out_100ms_ease-in] data-[state=hidden]:opacity-0 bottom-0 z-[2] w-[--reka-navigation-menu-indicator-size] translate-x-[--reka-navigation-menu-indicator-position] flex h-2.5 items-end justify-center overflow-hidden transition-all duration-200',
    arrow: 'relative top-[50%] size-2.5 rotate-45 border border-ui-cb/20 bg-ui-cx z-[1] rounded-ui-base',
  },
  variants: {
    variant: {
      ghost: '',
      link: '',
    },
    orientation: {
      horizontal: {
        root: 'items-center justify-between',
        list: 'flex items-center',
        item: 'py-2',
        link: 'px-2.5 py-1.5 before:inset-x-px before:inset-y-0',
        childList: 'grid p-2',
        childLink: 'px-3 py-2 gap-2 before:inset-x-px before:inset-y-0',
        childLinkLabel: 'font-medium',
        content: 'absolute top-0 left-0 w-full max-h-[70vh] overflow-y-auto',
      },
      vertical: {
        root: 'flex-col',
        link: 'flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0',
        childLabel: 'px-1.5 py-0.5',
        childLink: 'p-1.5 gap-1.5 before:inset-y-px before:inset-x-0',
      },
    },
    contentOrientation: {
      horizontal: {
        viewportWrapper: 'justify-center',
        content: 'data-[motion=from-start]:animate-[enter-from-left_200ms_ease] data-[motion=from-end]:animate-[enter-from-right_200ms_ease] data-[motion=to-start]:animate-[exit-to-left_200ms_ease] data-[motion=to-end]:animate-[exit-to-right_200ms_ease]',
      },
      vertical: {
        viewport: 'sm:w-[--reka-navigation-menu-viewport-width] left-[--reka-navigation-menu-viewport-left]',
      },
    },
    active: {
      true: {
        childLink: 'before:bg-soft-ui-fill/5 color-ui-base',
        childLinkIcon: 'color-ui-base/80',
      },
      false: {
        link: 'color-ui-base/60',
        linkLeadingIcon: 'color-ui-base/50',
        childLink: 'color-ui-base/80 transition-colors hover:bg-soft-ui-fill/5 hover:color-ui-base',
        childLinkIcon: 'color-ui-base/50 transition-colors group-hover:color-ui-base/80',
      },
    },
    disabled: {
      true: {
        link: 'cursor-not-allowed opacity-50',
      },
    },
    highlight: {
      true: '',
    },
    level: {
      true: '',
    },
    collapsed: {
      true: '',
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      contentOrientation: 'horizontal',
      class: {
        childList: 'grid-cols-2 gap-2',
      },
    },
    {
      orientation: 'horizontal',
      contentOrientation: 'vertical',
      class: {
        childList: 'gap-1',
        content: 'w-60',
      },
    },
    {
      orientation: 'vertical',
      collapsed: false,
      class: {
        childList: 'ms-5 border-s border-ui-cb/20',
        childItem: 'ps-1.5 -ms-px',
        content: 'data-[state=open]:animate-[collapsible-down_200ms_ease-out] data-[state=closed]:animate-[collapsible-up_200ms_ease-out] overflow-hidden',
      },
    },
    {
      orientation: 'vertical',
      collapsed: true,
      class: {
        link: 'px-1.5',
        content: 'shadow-sm rounded-ui-base min-h-6 p-1',
      },
    },
    {
      orientation: 'horizontal',
      highlight: true,
      class: {
        link: 'after:absolute after:-bottom-2 after:inset-x-2.5 after:block after:h-px after:rounded-full after:transition-colors',
      },
    },
    {
      orientation: 'vertical',
      highlight: true,
      level: true,
      class: {
        link: 'after:absolute after:-start-1.5 after:inset-y-0.5 after:block after:w-px after:rounded-full after:transition-colors',
      },
    },
    {
      disabled: false,
      active: false,
      variant: 'ghost',
      class: {
        link: 'hover:color-ui-base hover:before:bg-ui-fill/5 transition-colors before:transition-colors',
        linkLeadingIcon: 'group-hover:color-ui-base/80 transition-colors',
      },
    },
    {
      disabled: false,
      active: false,
      variant: 'ghost',
      orientation: 'horizontal',
      class: {
        link: 'data-[state=open]:color-ui-base',
        linkLeadingIcon: 'group-data-[state=open]:color-ui-base/80',
      },
    },
    {
      disabled: false,
      variant: 'ghost',
      highlight: true,
      orientation: 'horizontal',
      class: {
        link: 'data-[state=open]:before:bg-ui-fill/5',
      },
    },
    {
      disabled: false,
      variant: 'ghost',
      highlight: false,
      active: false,
      orientation: 'horizontal',
      class: {
        link: 'data-[state=open]:before:bg-ui-fill/5',
      },
    },
    {
      variant: 'ghost',
      active: true,
      highlight: false,
      class: {
        link: 'before:bg-ui-fill/10',
      },
    },
    {
      variant: 'ghost',
      active: true,
      highlight: true,
      disabled: false,
      class: {
        link: 'hover:before:bg-ui-fill/10 before:transition-colors',
      },
    },
    {
      disabled: false,
      active: false,
      variant: 'link',
      class: {
        link: 'hover:color-ui-base transition-colors',
        linkLeadingIcon: 'group-hover:color-ui-base/80 transition-colors',
      },
    },
    {
      disabled: false,
      active: false,
      variant: 'link',
      orientation: 'horizontal',
      class: {
        link: 'data-[state=open]:color-ui-base',
        linkLeadingIcon: 'group-data-[state=open]:color-ui-base/80',
      },
    },
    {
      highlight: true,
      level: true,
      active: true,
      class: {
        link: 'after:content-empty after:bg-soft-ui-fill/95',
      },
    },
  ],
  defaultVariants: {
    variant: 'ghost',
  },
})
