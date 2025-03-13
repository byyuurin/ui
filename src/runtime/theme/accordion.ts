import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  slots: {
    root: 'w-full color-ui-cb',
    item: 'border-b last:border-b-0',
    header: 'flex',
    trigger: 'group flex-1 flex items-center gap-2 font-medium text-sm py-4 outline-none focus-visible:outline-ui-cb/80 min-w-0',
    content: [
      'overflow-hidden focus:outline-none',
      'data-[state=open]:animate-[accordion-down_200ms_ease-out]',
      'data-[state=closed]:animate-[accordion-up_200ms_ease-out]',
    ],
    body: 'text-sm pb-4 color-ui-cb/80',
    leadingIcon: 'shrink-0 size-5',
    trailingIcon: 'shrink-0 size-5 ms-auto group-data-[state=open]:rotate-180 transition-all duration-200',
    label: 'text-start break-words',
  },
  variants: {
    disabled: {
      true: {
        trigger: 'cursor-not-allowed opacity-50',
      },
    },
  },
})
