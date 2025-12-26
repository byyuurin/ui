/* @unocss-include */
import { ct } from '@byyuurin/ui-kit'

export default ct({
  parts: {
    root: '',
    wrapper: '',
    labelWrapper: 'flex content-center items-center justify-between gap-1',
    label: 'block font-medium text-default',
    container: 'relative',
    description: 'text-muted',
    error: 'mt-2 text-error',
    hint: 'text-muted',
    help: 'mt-2 text-muted',
  },
  variants: {
    orientation: {
      vertical: {
        root: '',
        container: 'mt-1',
      },
      horizontal: {
        root: 'flex justify-between place-items-baseline gap-2',
        container: 'flex-grow',
      },
    },
    size: {
      xs: { root: 'text-xs' },
      sm: { root: 'text-xs' },
      md: { root: 'text-sm' },
      lg: { root: 'text-sm' },
      xl: { root: 'text-base' },
    },
    required: {
      true: {
        label: `after:content-['*'] after:ms-0.5 after:text-error`,
      },
    },
  },
  defaultVariants: {
    size: 'md',
    orientation: 'vertical',
  },
})
