import { createSharedComposable } from '@vueuse/core'
import type { Component } from 'vue'
import { markRaw, reactive, shallowReactive } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'

export interface OverlayOptions<ComponentProps = Record<string, any>> {
  defaultOpen?: boolean
  props?: ComponentProps
  unmountOnHide?: boolean
}

interface _ComponentState<T extends Component> {
  component?: T
  id: string | number
  isMounted: boolean
  modelValue: boolean
  resolve?: (value: unknown) => void
}

export type OverlayComponentState = OverlayOptions<Component> & _ComponentState<Component>

export interface OverlayComponentInstance<T> {
  open: (props?: ComponentProps<T>) => Promise<any>
  close: (value?: any) => void
  patch: (props: Partial<ComponentProps<T>>) => void
}

export const useOverlay = createSharedComposable(() => {
  const overlays = shallowReactive<OverlayComponentState[]>([])

  const generateId = () => `overlay-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

  function create<T extends Component>(component: T, options: OverlayOptions<ComponentProps<T>> = {}): OverlayComponentInstance<T> {
    const { props = {}, defaultOpen = false, unmountOnHide = true } = options

    const state = reactive<OverlayComponentState>({
      id: generateId(),
      modelValue: defaultOpen,
      component: markRaw(component),
      isMounted: defaultOpen,
      unmountOnHide,
      props,
    })

    overlays.push(state)

    return {
      open: (props) => open(state.id, props),
      close: (value) => close(state.id, value),
      patch: (props) => patch(state.id, props),
    }
  }

  function open<T extends Component>(id: OverlayComponentState['id'], props?: ComponentProps<T>): Promise<any> {
    const overlay = getOverlay(id)

    if (props)
      patch(id, props)

    overlay.modelValue = true
    overlay.isMounted = true

    return new Promise((resolve) => {
      overlay.resolve = resolve
    })
  }

  function close(id: OverlayComponentState['id'], value?: any): void {
    const overlay = getOverlay(id)

    overlay.modelValue = false

    if (overlay.resolve) {
      overlay.resolve(value)
      overlay.resolve = undefined
    }
  }

  function unmount(id: OverlayComponentState['id']): void {
    const overlay = getOverlay(id)

    overlay.isMounted = false

    if (overlay.unmountOnHide) {
      const index = overlays.findIndex((item) => item.id === id)
      overlays.splice(index, 1)
    }
  }

  function patch<T extends Component>(id: OverlayComponentState['id'], props: Partial<ComponentProps<T>>): void {
    const overlay = getOverlay(id)

    Object.entries(props).forEach(([key, value]) => {
      (overlay.props as any)[key] = value
    })
  }

  function getOverlay(id: OverlayComponentState['id']) {
    const item = overlays.find((item) => item.id === id)

    if (!item)
      throw new Error('Overlay not found')

    return item
  }

  return {
    overlays,
    open,
    close,
    create,
    patch,
    unmount,
  }
})
