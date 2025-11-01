import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { ButtonProps, FieldGroupProps } from '../types'
import { defineInjection } from '../utils'

export type FieldGroupProvideValue = Pick<FieldGroupProps, 'size' | 'orientation'>
export const {
  InjectionKey: InjectionKeyFieldGroup,
  inject: injectFieldGroup,
  provide: provideFieldGroup,
} = defineInjection<ComputedRef<FieldGroupProvideValue>>('ui.field-group')

export function useFieldGroup(props: Pick<ButtonProps, 'size'> = {}) {
  const fieldGroup = injectFieldGroup()

  return {
    size: computed(() => props.size ?? fieldGroup?.value.size),
    orientation: computed(() => fieldGroup?.value.orientation),
  }
}
