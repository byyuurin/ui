import { createSharedComposable } from '@vueuse/core'
import { nextTick, ref } from 'vue'
import { useState } from '#imports'
import type { ToastState } from '../types'

export const useToast = createSharedComposable(() => {
  const toasts = useState<ToastState[]>('toasts', () => [])
  const running = ref(false)
  const maxToasts = 5
  const queue: ToastState[] = []

  const generateId = () => `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

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

  function add(toast: Partial<ToastState>): ToastState {
    const body = {
      id: generateId(),
      open: true,
      ...toast,
    }

    queue.push(body)

    processQueue()

    return body
  }

  function update(id: string | number, toast: Partial<Omit<ToastState, 'id'>>) {
    const index = toasts.value.findIndex((toast: ToastState) => toast.id === id)

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
