import { ct } from '@byyuurin/ui-kit'

export default ct({
  slots: {
    root: 'relative flex items-start',
    base: [
      'inline-flex items-center shrink-0 rounded-ui-base border-2 border-transparent transition-colors duration-200',
      'focus-visible:outline-2 focus-visible:outline-offset-2',
      'data-[state=unchecked]:bg-ui-cb/10 data-[state=checked]:bg-ui-fill/80 focus-visible:outline-ui-base',
      'w-2.7em',
    ],
    container: 'flex items-center h-1.5em',
    thumb: [
      'group pointer-events-none rounded-ui-base size-1.25em bg-ui-c1 shadow-lg ring-0 transition-transform duration-200 flex items-center justify-center',
      'data-[state=unchecked]:translate-x-0 data-[state=unchecked]:rtl:translate-x-0 data-[state=checked]:translate-x-1.25em data-[state=checked]:rtl:-translate-x-1.25em',
    ],
    icon: [
      'absolute shrink-0 opacity-0 size-10/12 transition-[color,opacity] duration-200',
      'group-data-[state=unchecked]:color-ui-cb/50 group-data-[state=checked]:color-ui-base',
    ],
    wrapper: 'ms-2',
    label: 'flex color-ui-cb/80',
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
    round: {
      true: {
        base: 'rounded-full',
        thumb: 'rounded-full',
      },
    },
    checked: {
      true: {
        icon: 'group-data-[state=checked]:opacity-100',
      },
    },
    unchecked: {
      true: {
        icon: 'group-data-[state=unchecked]:opacity-100',
      },
    },
    loading: {
      true: {
        root: 'opacity-50 after:content-empty after:absolute after:inset-0 after:cursor-not-allowed',
        icon: 'animate-spin',
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
  },
})
