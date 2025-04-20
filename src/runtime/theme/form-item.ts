import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  parts: {
    root: '',
    wrapper: '',
    labelWrapper: 'flex content-center items-center justify-between',
    label: 'block font-medium color-ui-base/80',
    container: 'mt-0.25em relative',
    description: 'color-ui-base/60',
    error: 'mt-0.25em color-ui-fill',
    hint: 'color-ui-base/60',
    help: 'mt-0.25em color-ui-base/60',
  },
  variants: {
    size: {
      xs: { root: 'text-xs' },
      sm: { root: 'text-sm' },
      md: { root: 'text-base' },
      lg: { root: 'text-lg' },
      xl: { root: 'text-xl' },
    },
    required: {
      true: {
        label: `after:content-['*'] after:ms-0.5 after:color-ui-fill`,
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
