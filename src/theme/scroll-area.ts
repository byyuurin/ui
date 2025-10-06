/* @unocss-include */
import { ct } from '@byyuurin/ui-kit'
import type { TransitionGroupProps } from 'vue'

export const transitionProps: TransitionGroupProps = {
  enterFromClass: 'opacity-0',
  enterActiveClass: 'transition',
  leaveToClass: 'opacity-0',
  leaveActiveClass: 'transition',
  moveClass: 'transition',
}

export default ct({
  parts: {
    /** Contains all the parts of a scroll area. */
    root: 'relative overflow-hidden',
    /** The viewport area of the scroll area. */
    viewport: 'size-full rounded outline-none',
    /** The vertical and horizontal scrollbar. */
    scrollbar: [
      'flex select-none touch-none p-0.5 duration-160 ease-out',
      'data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:my-2',
      'data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:mx-2',
    ],
    /** The thumb to be used in `ScrollAreaScrollbar`. */
    thumb: [
      'relative flex-1 bg-[--ui-border-accented] rounded cursor-pointer transition-colors',
      'hover:bg-primary/30 active:bg-primary/50',
      'before:content-empty before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-10 before:min-h-10 ',
    ],
    /** The corner where both vertical and horizontal scrollbars meet. */
    corner: '',
  },
})
