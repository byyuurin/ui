import { computed } from 'vue'
import type { ButtonProps } from '../types'
import { injectFieldGroup } from './injections'

export function useFieldGroup(props: Pick<ButtonProps, 'size'> = {}) {
  const fieldGroup = injectFieldGroup()

  return {
    size: computed(() => props.size ?? fieldGroup?.value.size),
    orientation: computed(() => fieldGroup?.value.orientation),
  }
}
