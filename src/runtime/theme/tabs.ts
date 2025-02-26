import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  slots: {
    root: 'flex items-center gap-2',
    list: 'relative flex p-1 group',
    indicator: 'absolute transition-all duration-200',
    trigger: [
      'group relative inline-flex items-center gap-0.25em shrink-0 min-w-0 font-medium rounded-ui-tabs transition-colors',
      'outline-none',
      'disabled:cursor-not-allowed disabled:opacity-50',
    ],
    content: 'w-full focus:outline-none',
    prefixIcon: 'shrink-0 size-1.5em',
    label: 'truncate',
  },
  variants: {
    variant: {
      'solid': {
        list: 'bg-solid-ui-cb/5 rounded-ui-tabs',
        trigger: [
          'data-[state=active]:color-ui-cx focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-cb/80',
          'data-[state=inactive]:color-ui-cb/80 hover:data-[state=inactive]:not-disabled:color-ui-cb',
        ],
        indicator: 'bg-solid-ui-fill/90 rounded-ui-tabs shadow-xs',
      },
      'outline': {
        list: 'bg-solid-ui-cb/5 rounded-ui-tabs',
        trigger: [
          'data-[state=active]:color-ui-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-content/80',
          'data-[state=inactive]:color-ui-cb/80 hover:data-[state=inactive]:not-disabled:color-ui-cb',
        ],
        indicator: 'rounded-ui-tabs ring ring-inset ring-ui-content',
      },
      'soft': {
        list: 'bg-solid-ui-cb/5 rounded-ui-tabs',
        trigger: [
          'data-[state=active]:color-ui-fill focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-fill',
          'data-[state=inactive]:color-ui-cb/80 hover:data-[state=inactive]:not-disabled:color-ui-cb',
        ],
        indicator: 'bg-solid-ui-fill/10 rounded-ui-tabs shadow-xs',
      },
      'soft-outline': {
        list: 'bg-solid-ui-cb/5 rounded-ui-tabs',
        trigger: [
          'data-[state=active]:color-ui-fill focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-fill',
          'data-[state=inactive]:color-ui-cb/80 hover:data-[state=inactive]:not-disabled:color-ui-cb',
        ],
        indicator: 'bg-solid-ui-fill/10 rounded-ui-tabs shadow-xs ring ring-inset ring-ui-content/40',
      },
      'link': {
        list: 'bg-solid-ui-cb/5 border-ui-cb/10',
        indicator: 'bg-solid-ui-fill rounded-full',
        trigger: [
          'data-[state=active]:color-ui-base focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ui-base',
          'data-[state=inactive]:color-ui-cb/80 hover:data-[state=inactive]:not-disabled:color-ui-cb',
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
        root: 'text-sm',
      },
      sm: {
        root: 'tex-tsm',
      },
      md: {
        root: 'text-base',
      },
      lg: {
        root: 'text-lg',
      },
      xl: {
        root: 'text-xl',
      },
    },
    evenly: {
      true: {
        trigger: 'w-full flex-1',
      },
    },
  },
  compoundVariants: [
    {
      size: ['xs', 'sm', 'md'],
      class: {
        trigger: 'p-1.5 px-2.5',
      },
    },
    {
      size: ['lg', 'xl'],
      class: {
        trigger: 'p-2.5 px-4.5',
      },
    },
    {
      orientation: 'horizontal',
      variant: ['solid', 'soft', 'outline', 'soft-outline'],
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
      variant: ['solid', 'soft', 'outline', 'soft-outline'],
      class: {
        indicator: 'inset-x-1',
        list: 'items-center rounded-[calc(var(--ui-radius-tabs)*0.66)]',
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
  defaultVariants: {
    size: 'md',
  },
})
