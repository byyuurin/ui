import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  parts: {
    root: '',
    fieldset: 'flex flex-wrap gap-2 gap-x-4',
    legend: 'mb-2 color-ui-base',
    item: 'relative flex items-start',
    base: 'relative size-5 rounded-ui-radio ring ring-inset ring-ui-base outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-base/80 transition data-[state=checked]:ring-ui-base',
    indicator: 'absolute inset-0 scale-0 rounded-ui-radio bg-ui-fill transition data-[state=checked]:scale-66',
    container: 'h-6 flex items-center',
    wrapper: '',
    label: 'block ps-2 color-ui-base',
    description: 'ps-2 color-ui-base/60',
  },
  variants: {
    orientation: {
      horizontal: {
        fieldset: 'flex-row',
      },
      vertical: {
        fieldset: 'flex-col',
      },
    },
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
    disabled: {
      true: {
        item: 'opacity-50 after:content-empty after:absolute after:inset-0 after:cursor-not-allowed',
      },
      false: {
        label: 'cursor-pointer',
      },
    },
    required: {
      true: {
        legend: 'after:content-[\'*\'] after:ms-0.5',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
