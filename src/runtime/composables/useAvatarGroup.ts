import { computed } from 'vue'
import type { AvatarProps } from '../types'
import { injectAvatarGroup } from './injections'

export function useAvatarGroup(props: AvatarProps = {}) {
  const avatarGroup = injectAvatarGroup()

  return {
    size: computed(() => props.size ?? avatarGroup?.value.size),
  }
}
