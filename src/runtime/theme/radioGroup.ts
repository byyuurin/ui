import { ct } from '@byyuurin/ui-kit'

export default ct({
  slots: {
    root: 'relative',
    fieldset: 'flex flex-wrap gap-2 gap-x-4',
    legend: 'mb-2 color-ui-cb',
    item: 'flex items-start',
    base: 'size-1.25em rounded-ui-base ring ring-inset ring-ui-cb focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-cb',
    indicator: 'flex items-center justify-center size-full rounded-ui-base bg-ui-fill',
    container: 'h-1.5em flex items-center',
    wrapper: '',
    label: 'block ps-2 color-ui-cb',
    description: 'ps-2 color-ui-cb/60',
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
    dot: {
      true: {
        indicator: 'after:content-empty after:size-0.75em after:bg-ui-c1 after:rounded-ui-base',
      },
    },
    round: {
      true: {
        base: 'rounded-full',
        indicator: 'rounded-full after:rounded-full',
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
    required: {
      true: {
        legend: 'after:content-[\'*\'] after:ms-0.5',
      },
    },
  },
})
