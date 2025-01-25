import { ct } from '@byyuurin/ui-kit'

export default ct({
  slots: {
    root: 'flex items-center gap-2',
    list: 'relative flex p-1 group',
    indicator: 'absolute transition-all duration-200',
    trigger: [
      'group relative inline-flex items-center shrink-0 min-w-0 font-medium rounded-ui-button transition-colors',
      'focus:outline-hidden',
      'disabled:cursor-not-allowed disabled:opacity-50',
    ],
    content: 'w-full focus:outline-none',
    leadingIcon: 'shrink-0',
    label: 'truncate',
  },
  variants: {
    variant: {
      solid: {
        list: 'bg-ui-cb/5 rounded-ui-button',
        trigger: [
          'data-[state=active]:color-ui-c1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-fill/80',
          'data-[state=inactive]:color-ui-content/70 hover:data-[state=inactive]:not-disabled:color-ui-content/80',
        ],
        indicator: 'bg-ui-fill/90 rounded-ui-button shadow-xs',
      },
      soft: {
        list: 'bg-ui-c1 rounded-ui-button',
        trigger: [
          'data-[state=active]:color-ui-fill focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-fill',
          'data-[state=inactive]:color-ui-content/80 hover:data-[state=inactive]:not-disabled:color-ui-content/80',
        ],
        indicator: 'bg-ui-fill/10 rounded-ui-button shadow-xs',
      },
      link: {
        list: 'border-ui-cb/10',
        indicator: 'bg-ui-fill rounded-full',
        trigger: [
          'data-[state=active]:color-ui-base focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ui-base',
          'data-[state=inactive]:color-ui-cb/70 hover:data-[state=inactive]:not-disabled:color-ui-cb/80',
        ],
      },
    },
    orientation: {
      horizontal: {
        root: 'flex-col',
        list: 'w-full',
        indicator: 'left-0 w-[var(--reka-tabs-indicator-size)] translate-x-[var(--reka-tabs-indicator-position)]',
        trigger: 'justify-center',
      },
      vertical: {
        list: 'flex-col',
        indicator: 'top-0 h-[var(--reka-tabs-indicator-size)] translate-y-[var(--reka-tabs-indicator-position)]',
        trigger: 'flex-1 w-full',
      },
    },
    size: {
      xs: {
        trigger: 'px-2 py-1 text-xs gap-1',
        leadingIcon: 'size-4',
      },
      sm: {
        trigger: 'px-2.5 py-1.5 text-xs gap-1.5',
        leadingIcon: 'size-4',
      },
      md: {
        trigger: 'px-3 py-1.5 text-sm gap-1.5',
        leadingIcon: 'size-5',
      },
      lg: {
        trigger: 'px-3 py-2 text-sm gap-2',
        leadingIcon: 'size-5',
      },
      xl: {
        trigger: 'px-3 py-2 text-base gap-2',
        leadingIcon: 'size-6',
      },
    },
    full: {
      true: {
        trigger: 'w-full flex-1',
      },
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      variant: ['solid', 'soft'],
      class: {
        indicator: 'inset-y-1',
      },
    },
    {
      orientation: 'horizontal',
      variant: 'link',
      class: {
        list: 'border-b -mb-px',
        indicator: '-bottom-px h-px',
      },
    },
    {
      orientation: 'vertical',
      variant: ['solid', 'soft'],
      class: {
        indicator: 'inset-x-1',
        list: 'items-center',
      },
    },
    {
      orientation: 'vertical',
      variant: 'link',
      class: {
        list: 'border-s -ms-px',
        indicator: '-start-px w-px',
      },
    },
  ],
})
