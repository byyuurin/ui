import { createSharedComposable } from '@vueuse/core'
import type { Component } from 'vue'
import { ref } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { injectModalState } from '../app/injections'
import type { ModalProps } from '../types'

export const useModal = createSharedComposable(() => {
  const modalState = injectModalState()
  const isOpen = ref(false)

  function open<T extends Component>(component: T, props?: ModalProps & ComponentProps<T>) {
    if (!modalState)
      throw new Error('useModal() is called without provider')

    modalState.value = {
      component,
      props: props ?? {},
    }

    isOpen.value = true
  }

  function close() {
    if (!modalState)
      return

    isOpen.value = false
  }

  function reset() {
    if (!modalState)
      return

    modalState.value = {
      component: 'div',
      props: {},
    }
  }

  /**
   * Allows updating the modal props
   */
  function patch<T extends Component = Record<string, never>>(props: Partial<ModalProps & ComponentProps<T>>) {
    if (!modalState)
      return

    modalState.value = {
      ...modalState.value,
      props: {
        ...modalState.value.props,
        ...props,
      },
    }
  }

  return {
    open,
    close,
    reset,
    patch,
    isOpen,
  }
})
