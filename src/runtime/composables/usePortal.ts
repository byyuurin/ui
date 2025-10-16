import { computed, type Ref } from 'vue'
import { injectPortalTarget } from './injections'

export function usePortal(portal: Ref<boolean | string | HTMLElement | undefined>) {
  const globalPortal = injectPortalTarget()
  const value = computed(() => portal.value === true ? globalPortal?.value : portal.value)
  const disabled = computed(() => typeof value.value === 'boolean' ? !value.value : false)
  const to = computed(() => typeof value.value === 'boolean' ? 'body' : value.value)

  return computed(() => ({
    to: to.value,
    disabled: disabled.value,
  }))
}
