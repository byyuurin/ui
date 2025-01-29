import { ct } from '@byyuurin/ui-kit'

export default ct({
  slots: {
    root: 'relative flex items-start',
    base: [
      'size-1.25em shrink-0 flex items-center justify-center rounded-ui-base color-ui-c1 ring ring-inset ring-ui-cb',
      'focus-visible:outline-ui-cb focus-visible:outline-2 focus-visible:outline-offset-2',
    ],
    container: 'flex items-center h-1.25em',
    wrapper: 'text-inherit ms-2',
    icon: 'shrink-0 size-1em data-[state=checked]:animate-[scale-in_200ms_ease-out]',
    label: 'flex color-ui-cb after:content-empty',
    description: 'color-ui-cb/60',
  },
  variants: {
    size: {
      xs: {
        root: 'text-xs',
      },
      sm: {
        root: 'text-sm',
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
    required: {
      true: {
        label: `after:content-['*'] after:ms-0.5`,
      },
    },
    disabled: {
      true: {
        root: 'opacity-50 after:content-empty after:absolute after:inset-0 after:cursor-not-allowed',
      },
      false: {
        label: 'cursor-pointer',
      },
    },
    checked: {
      true: {
        base: 'ring-2 ring-ui-content bg-ui-content',
        icon: 'color-ui-c1',
      },
    },
  },
})
