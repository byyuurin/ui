import { computed, type ComputedRef } from 'vue'
import type { AvatarGroupProps } from '../types'
import { defineInjection } from './defineInjection'

interface AvatarGroupInjectionData {
  size: AvatarGroupProps['size']
}

export const {
  InjectionKey: InjectionKeyAvatarGroup,
  inject: injectAvatarGroup,
  provide: provideAvatarGroup,
} = defineInjection<ComputedRef<AvatarGroupInjectionData>>('ui.avatarGroup')

type UseAvatarGroupProps = Pick<AvatarGroupProps, 'size'>

export function useAvatarGroup(props: UseAvatarGroupProps = {}) {
  const avatarGroup = injectAvatarGroup()

  return {
    size: computed(() => props.size ?? avatarGroup?.value.size),
  }
}
