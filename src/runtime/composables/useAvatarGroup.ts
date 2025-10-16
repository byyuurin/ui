import { computed } from 'vue'
import type { AvatarGroupProps } from '../types'
import { injectAvatarGroup, provideAvatarGroup } from './injections'

export function useAvatarGroup(props: { size: AvatarGroupProps['size'] }) {
  const avatarGroup = injectAvatarGroup()
  const size = computed(() => props.size ?? avatarGroup?.value.size)

  provideAvatarGroup(computed(() => ({ size: size.value })))

  return {
    size,
  }
}
