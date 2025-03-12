import { computed } from 'vue'
import { injectButtonGroup } from '../app/injections'
import type { ButtonProps } from '../types'

export function useButtonGroup(props: Pick<ButtonProps, 'size'> = {}) {
  const buttonGroup = injectButtonGroup()

  return {
    size: computed(() => props.size ?? buttonGroup?.value.size),
    orientation: computed(() => buttonGroup?.value.orientation),
  }
}
