import { ct } from '@byyuurin/ui-kit'

export default ct({
  slots: {
    root: 'w-full color-ui-base',
    item: 'border-b border-ui-base last:border-b-0',
    header: 'flex',
    trigger: 'group flex-1 flex items-center gap-2 font-medium text-sm py-4 focus-visible:outline-ui-fill min-w-0',
    content: [
      'overflow-hidden focus:outline-none',
      'data-[state=open]:animate-[accordion-down_200ms_ease-out]',
      'data-[state=closed]:animate-[accordion-up_200ms_ease-out]',
    ],
    body: 'text-sm pb-4',
    icon: 'shrink-0 size-5',
    trailingIcon: 'shrink-0 size-5 ms-auto group-data-[state=open]:rotate-180 transition-transform duration-200',
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
