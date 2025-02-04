import { ct } from '@byyuurin/ui-kit'

export default ct({
  slots: {
    /** Contains all the parts of a scroll area. */
    root: 'relative overflow-hidden shadow-sm shadow-ui-cb/10 bg-ui-c1 border border-ui-cb/10 rounded-ui-base',
    /** The viewport area of the scroll area. */
    viewport: 'size-full rounded-ui-base',
    /** The vertical and horizontal scrollbar. */
    scrollbar: [
      'flex select-none touch-none p-0.5 duration-160 ease-out',
      'data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:my-[calc(var(--ui-radius-box)+0.25rem)]',
      'data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:mx-[calc(var(--ui-radius-box)+0.25rem)]',
    ],
    /** The thumb to be used in `ScrollAreaScrollbar`. */
    thumb: [
      'relative flex-1 bg-ui-cb/20 rounded-ui-base cursor-pointer transition-colors',
      'hover:bg-ui-cb/30 active:bg-ui-cb/40',
      'before:content-empty before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-10 before:min-h-10 ',
    ],
    /** The corner where both vertical and horizontal scrollbars meet. */
    corner: '',
  },
})
