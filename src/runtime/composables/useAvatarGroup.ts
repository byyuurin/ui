import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { AvatarGroupProps } from '../types'
import { defineInjection } from '../utils'

export type AvatarGroupProvideValue = Pick<AvatarGroupProps, 'size'>
export const {
  InjectionKey: InjectionKeyAvatarGroup,
  inject: injectAvatarGroup,
  provide: provideAvatarGroup,
} = defineInjection<ComputedRef<AvatarGroupProvideValue>>('ui.avatar-group')

export function useAvatarGroup(props: { size: AvatarGroupProps['size'] }) {
  const avatarGroup = injectAvatarGroup()
  const size = computed(() => props.size ?? avatarGroup?.value.size)

  provideAvatarGroup(computed(() => ({ size: size.value })))

  return {
    size,
  }
}
