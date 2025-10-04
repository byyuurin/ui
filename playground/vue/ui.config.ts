import { createUIConfig } from '@byyuurin/ui/config'

export default createUIConfig({
  ui: {
    button: {
      base: 'btn',
      variants: {
        variant: {
          solid: 'btn-solid',
          outline: 'btn-outline',
        },
        size: {
          xs: 'btn--xs',
          sm: 'btn--sm',
          md: 'btn--base',
          lg: 'btn--lg',
          xl: 'btn--xl',
        },
      },
      compoundVariants: [
        { variant: 'solid', size: 'sm', class: 'btn--solid-sm' },
      ],
    },
  },
})
