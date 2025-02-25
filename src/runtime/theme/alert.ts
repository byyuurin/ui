import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  slots: {
    root: 'relative overflow-hidden w-full rounded-ui-box p-4 flex gap-2.5',
    wrapper: 'min-w-0 flex-1 flex flex-col',
    title: 'text-xl font-medium',
    description: 'opacity-80',
    icon: 'shrink-0 size-1.5em',
    actions: 'flex flex-wrap gap-1.5 shrink-0',
    close: 'p-0',
  },
  variants: {
    variant: {
      'solid': {
        root: 'color-ui-cx bg-solid-ui-fill',
        close: 'ui-base-inverted',
      },
      'outline': {
        root: 'color-ui-content bg-solid-ui-cx ring ring-inset ring-ui-fill',
      },
      'soft': {
        root: 'color-ui-content bg-solid-ui-fill/10',
      },
      'soft-outline': {
        root: 'color-ui-content bg-solid-ui-fill/10 ring ring-inset ring-ui-fill/40',
      },
    },
    orientation: {
      horizontal: {
        root: 'items-center',
        actions: 'items-center',
      },
      vertical: {
        root: 'items-start',
        actions: 'items-start mt-2.5',
      },
    },
    title: {
      true: {
        description: 'mt-1',
      },
    },
  },
})
