import type { Ref } from 'vue'
import { ref } from 'vue'

export { useRoute, useRouter } from 'vue-router'

const state: Record<string, any> = {}

export function useState<T>(key: string, init: () => T): Ref<T> {
  if (state[key])
    return state[key] as Ref<T>

  const value = ref(init())
  state[key] = value
  return value as Ref<T>
}

export function useNuxtApp() {
  return {
    isHydrating: true,
    payload: { serverRendered: false },
  }
}
