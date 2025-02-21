import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { ButtonGroupProps } from '../components/ButtonGroup.vue'
import { defineInjection } from './defineInjection'

interface ButtonGroupInjectData {
  size: ButtonGroupProps['size']
  orientation: ButtonGroupProps['orientation']
}

export const {
  InjectionKey: InjectionKeyButtonGroup,
  inject: injectButtonGroup,
  provide: provideButtonGroup,
} = defineInjection<ComputedRef<ButtonGroupInjectData>>('ui.buttonGroup')

type UseButtonGroupProps = Pick<ButtonGroupProps, 'size'>

export function useButtonGroup(props: UseButtonGroupProps = {}) {
  const buttonGroup = injectButtonGroup()

  return {
    size: computed(() => props.size ?? buttonGroup?.value.size),
    orientation: computed(() => buttonGroup?.value.orientation),
  }
}
