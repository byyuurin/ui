import type { Ref } from 'vue'
import { nextTick, shallowRef } from 'vue'
import { useState } from '#imports'
import type { ToastEmits, ToastProps } from '../types'
import type { EmitsToProps } from '../types/utils'
import { defineInjection } from '../utils'

export const {
  InjectionKey: InjectionKeyToastMax,
  inject: injectToastMax,
  provide: provideToastMax,
} = defineInjection<Ref<number>>('ui.toast-max')

export interface Toast extends Omit<ToastProps, 'defaultOpen'>, EmitsToProps<ToastEmits> {
  id: string | number
  onClick?: (toast: Toast) => void
}

export function useToast() {
  const toasts = useState<Toast[]>('toasts', () => [])
  const max = injectToastMax()

  const queue: Toast[] = []
  const running = shallowRef(false)

  const generateId = () => `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

  async function processQueue() {
    if (running.value || queue.length === 0)
      return

    running.value = true

    while (queue.length > 0) {
      const toast = queue.shift()!

      await nextTick()

      toasts.value = [...toasts.value, toast].slice(-(max?.value ?? 5))
    }

    running.value = false
  }

  function add(toast: Partial<Toast>): Toast {
    const body = {
      id: generateId(),
      open: true,
      ...toast,
    } as Toast

    queue.push(body)

    processQueue()

    return body
  }

  function update(id: string | number, toast: Partial<Omit<Toast, 'id'>>) {
    const index = toasts.value.findIndex((toast: Toast) => toast.id === id)

    if (index === -1)
      return

    toasts.value[index] = {
      ...toasts.value[index]!,
      ...toast,
    }
  }

  function remove(id: string | number) {
    const index = toasts.value.findIndex((toast: Toast) => toast.id === id)

    if (index === -1)
      return

    toasts.value[index] = {
      ...toasts.value[index]!,
      open: false,
    }

    setTimeout(() => {
      toasts.value = toasts.value.filter((toast: Toast) => toast.id !== id)
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
}
