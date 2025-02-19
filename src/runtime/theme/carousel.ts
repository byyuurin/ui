import { ct } from '@byyuurin/ui-kit'

export default ct(/* @unocss-include */{
  slots: {
    root: 'relative focus:outline-none',
    viewport: 'overflow-hidden',
    container: 'flex items-start',
    item: 'min-w-0 shrink-0 basis-full',
    controls: '',
    arrows: '',
    prev: 'rounded-full',
    next: 'rounded-full',
    dots: 'flex flex-wrap items-center justify-center gap-3',
    dot: 'cursor-pointer size-3 bg-solid-ui-cb/10 rounded-full transition',
  },
  variants: {
    orientation: {
      vertical: {
        container: 'flex-col -mt-4',
        item: 'pt-4',
        controls: 'flex gap-4 justify-between py-2',
        arrows: 'flex gap-1 only-child:mx-auto',
        dots: 'only-child:mx-auto only-child:my-2',
        prev: 'rotate-90 rtl:-rotate-90',
        next: 'rotate-90 rtl:-rotate-90',
      },
      horizontal: {
        container: 'flex-row -ms-4',
        item: 'ps-4',
        prev: 'absolute -start-12 top-1/2 [translate:0_-50%]',
        next: 'absolute -end-12 top-1/2 [translate:0_-50%]',
        dots: 'absolute inset-x-0 -bottom-7',
      },
    },
    active: {
      true: {
        dot: 'bg-solid-ui-content',
      },
    },
  },
})
