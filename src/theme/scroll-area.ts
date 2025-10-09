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
    root: 'relative overflow-hidden',
    viewport: 'size-full rounded outline-none',
    scrollbar: [
      'flex select-none touch-none p-0.5 duration-160 ease-out',
      'data-[orientation=vertical]:w-3 data-[orientation=vertical]:my-2',
      'data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-3 data-[orientation=horizontal]:mx-2',
    ],
    thumb: [
      'relative flex-1 bg-accented opacity-80 rounded cursor-pointer transition',
      'hover:bg-[--ui-text-dimmed]',
      'before:content-empty before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-10 before:min-h-10 ',
    ],
    corner: '',
  },
})
