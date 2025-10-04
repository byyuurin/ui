import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  parts: {
    root: 'flex items-center justify-center text-center',
    line: 'border-solid border-ui-fill/20',
    container: 'color-ui-base/80 flex',
    icon: 'shrink-0 size-5',
    label: '',
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'w-full flex-row',
        line: 'min-w-3 w-full border-t',
        container: 'px-3 whitespace-nowrap',
      },
      vertical: {
        root: 'h-full flex-col',
        line: 'min-h-3 h-full border-s',
        container: 'py-2',
      },
    },
    start: {
      true: {
        line: 'w-auto flex-grow',
      },
    },
    end: {
      true: {
        line: 'w-auto flex-grow',
      },
    },
  },
  compoundVariants: [
    {
      orientation: 'vertical',
      start: true,
      class: {
        line: 'h-auto',
      },
    },
    {
      orientation: 'vertical',
      end: true,
      class: {
        line: 'h-auto',
      },
    },
  ],
})
