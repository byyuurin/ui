import { computed } from 'vue'
import type { ButtonProps } from '../types'
import { injectButtonGroup } from './injections'

export function useButtonGroup(props: Pick<ButtonProps, 'size'> = {}) {
  const buttonGroup = injectButtonGroup()

  return {
    size: computed(() => props.size ?? buttonGroup?.value.size),
    orientation: computed(() => buttonGroup?.value.orientation),
  }
}
