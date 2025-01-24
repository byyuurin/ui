import { ct } from '@byyuurin/ui-kit'

export default ct({
  slots: {
    root: 'relative inline-flex items-center',
    base: [
      'w-full rounded-ui-base border-0 placeholder:color-ui-base/40 transition-colors',
      'focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
    ],
    leading: 'absolute inset-y-0 start-0 flex items-center',
    trailing: 'absolute inset-y-0 end-0 flex items-center',
  },
  variants: {
    size: {
      xs: {
        base: 'px-2 py-1 text-xs gap-1',
        leading: 'ps-2',
        trailing: 'pe-2',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-4',
      },
      sm: {
        base: 'px-2.5 py-1.5 text-xs gap-1.5',
        leading: 'ps-2.5',
        trailing: 'pe-2.5',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-4',
      },
      md: {
        base: 'px-2.5 py-1.5 text-sm gap-1.5',
        leading: 'ps-2.5',
        trailing: 'pe-2.5',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-5',
      },
      lg: {
        base: 'px-3 py-2 text-sm gap-2',
        leading: 'ps-3',
        trailing: 'pe-3',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-5',
      },
      xl: {
        base: 'px-3 py-2 text-base gap-2',
        leading: 'ps-3',
        trailing: 'pe-3',
        leadingIcon: 'size-6',
        leadingAvatarSize: 'xs',
        trailingIcon: 'size-6',
      },
    },
    variant: {
      outline: {
        base: [
          'color-ui-fill bg-ui-c1 ring ring-inset ring-ui-fill',
        ],
      },
      soft: {
        base: [
          'color-ui-content/75 bg-ui-fill/10',
          'hover:bg-ui-fill/15 hover:color-ui-content/80 focus:bg-ui-fill/20 focus:color-ui-content/85',
          'disabled:color-ui-content/75 disabled:bg-ui-fill/10',
        ],
      },
      ghost: {
        base: [
          'color-ui-fill/75 bg-transparent',
          'hover:bg-ui-fill/10 hover:color-ui-fill/80 focus:bg-ui-fill/20 focus:color-ui-fill/85',
          'disabled:color-ui-fill/75 disabled:bg-transparent',
        ],
      },
      none: {
        base: 'color-ui-fill bg-transparent',
      },
    },
    loading: {
      true: '',
    },
  },
})
