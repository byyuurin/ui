import { createSharedComposable } from '@vueuse/core'
import { nextTick, ref } from 'vue'
import type { ToastProps } from '../types'

export interface Toast extends Omit<ToastProps, 'defaultOpen'> {
  id: string | number
  onClick?: (toast: Toast) => void
}

export const useToast = createSharedComposable(() => {
  const toasts = ref<Toast[]>([])

  const running = ref(false)
  const maxToasts = 5
  const queue: Toast[] = []

  const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

  async function processQueue() {
    if (running.value || queue.length === 0)
      return

    running.value = true

    while (queue.length > 0) {
      const toast = queue.shift()!

      await nextTick()

      toasts.value = [...toasts.value, toast].slice(-maxToasts)
    }

    running.value = false
  }

  function add(toast: Partial<Toast>): Toast {
    const body = {
      id: generateId(),
      open: true,
      ...toast,
    }

    queue.push(body)

    processQueue()

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
