import { computed } from 'vue'
import { injectAvatarGroup } from '../app/injections'
import type { AvatarProps } from '../types'

export function useAvatarGroup(props: AvatarProps = {}) {
  const avatarGroup = injectAvatarGroup()

  return {
    size: computed(() => props.size ?? avatarGroup?.value.size),
  }
}
