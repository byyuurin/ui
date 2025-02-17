import { createSharedComposable } from '@vueuse/core'
import { ref } from 'vue'
import type { ToastProps } from '../types'

export interface Toast extends Omit<ToastProps, 'defaultOpen'> {
  id: string | number
  click?: (toast: Toast) => void
}

export const useToast = createSharedComposable(() => {
  const toasts = ref<Toast[]>([])

  function add(toast: Partial<Toast>): Toast {
    const body = {
      id: Date.now().toString(),
      open: true,
      ...toast,
    }

    const index = toasts.value.findIndex((t) => t.id === body.id)

    if (index === -1)
      toasts.value.push(body)

    toasts.value = toasts.value.slice(-5)

    return body
  }

  function update(id: string | number, toast: Partial<Omit<Toast, 'id'>>) {
    const index = toasts.value.findIndex((t) => t.id === id)

    if (index === -1)
      return

    toasts.value[index] = {
      ...toasts.value[index],
      ...toast,
    }
  }

  function remove(id: string | number) {
    const index = toasts.value.findIndex((t) => t.id === id)

    if (index === -1)
      return

    toasts.value[index] = {
      ...toasts.value[index],
      open: false,
    }

    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id)
    }, 200)
  }

  function clear() {
    toasts.value = []
  }

  return {
    toasts,
    add,
    update,
    remove,
    clear,
  }
})
