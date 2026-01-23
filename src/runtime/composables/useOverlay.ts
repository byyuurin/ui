// ref: https://github.com/nuxt/ui/blob/182af209fcf61043bd4a3bca264c1f6a65a06fa7/src/runtime/composables/useOverlay.ts

import { createSharedComposable } from '@vueuse/core'
import type { Component } from 'vue'
import { markRaw, reactive, shallowReactive } from 'vue'
import type { ComponentEmit, ComponentProps } from 'vue-component-type-helpers'

type CloseEventArgTypeSimple<T> = T extends (event: 'close', arg_0: infer Arg, ...args: any[]) => void ? Arg : never

/**
 * This is a workaround for a design limitation in TypeScript.
 *
 * Conditional types only match the last function overload, not a union of all possible
 * parameter types. This workaround forces TypeScript to properly extract the 'close'
 * event argument type from component emits with multiple event signatures.
 *
 * @see https://github.com/microsoft/TypeScript/issues/32164
 */
type CloseEventArgTypeComplex<T> = T extends {
  (event: 'close', arg_0: infer Arg, ...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
} ? Arg : never

type CloseEventArgType<T> = CloseEventArgTypeSimple<T> | CloseEventArgTypeComplex<T>

export interface OverlayOptions<ComponentProps = Record<string, any>> {
  defaultOpen?: boolean
  props?: ComponentProps
  unmountOnHide?: boolean
}

interface OverlayOptionsPrivate<T extends Component> {
  component?: T
  id: symbol
  isMounted: boolean
  isOpen: boolean
  originalProps?: ComponentProps<T>
  resolvePromise?: (value: unknown) => void
}

export type Overlay = OverlayOptions<Component> & OverlayOptionsPrivate<Component>

type OpenedOverlay<T extends Component> = Omit<OverlayInstance<T>, 'open' | 'close' | 'patch' | 'modelValue' | 'resolvePromise'> & {
  result: Promise<CloseEventArgType<ComponentEmit<T>>>
} & Promise<CloseEventArgType<ComponentEmit<T>>>

export interface OverlayInstance<T extends Component> {
  id: symbol
  open: (props?: ComponentProps<T>) => OpenedOverlay<T>
  close: (value?: any) => void
  patch: (props: Partial<ComponentProps<T>>) => void
}

function _useOverlay() {
  const overlays = shallowReactive<Overlay[]>([])

  function create<T extends Component>(component: T, options?: OverlayOptions<ComponentProps<T>>): OverlayInstance<T> {
    const { props = {}, defaultOpen = false, unmountOnHide = true } = options || {}

    const optionsPrivate = reactive<Overlay>({
      id: Symbol(import.meta.dev ? 'useOverlay' : ''),
      isOpen: defaultOpen,
      isMounted: defaultOpen,
      component: markRaw(component),
      originalProps: props,
      unmountOnHide,
      props: { ...props },
    })

    overlays.push(optionsPrivate)

    return {
      ...optionsPrivate,
      open: <T extends Component>(props?: ComponentProps<T>) => open(optionsPrivate.id, props),
      close: (value) => close(optionsPrivate.id, value),
      patch: <T extends Component>(props: Partial<ComponentProps<T>>) => patch(optionsPrivate.id, props),
    }
  }

  function open<T extends Component>(id: Overlay['id'], props?: ComponentProps<T>): OpenedOverlay<T> {
    const overlay = getOverlay(id)

    // If props are provided, merge them with the original props, otherwise use the original props
    overlay.props = props
      ? { ...overlay.originalProps, ...props }
      : { ...overlay.originalProps }

    overlay.isOpen = true
    overlay.isMounted = true

    const result = new Promise<any>((resolve) => {
      overlay.resolvePromise = resolve
    })

    return Object.assign(result, {
      id,
      isMounted: overlay.isMounted,
      isOpen: overlay.isOpen,
      result,
    })
  }

  function close(id: symbol, value?: any): void {
    const overlay = getOverlay(id)

    overlay.isOpen = false

    // Resolve the promise if it exists
    if (overlay.resolvePromise) {
      overlay.resolvePromise(value)
      overlay.resolvePromise = undefined
    }
  }

  function closeAll(): void {
    overlays.forEach((overlay) => close(overlay.id))
  }

  function unmount(id: symbol): void {
    const overlay = getOverlay(id)

    overlay.isMounted = false

    if (overlay.unmountOnHide) {
      const index = overlays.findIndex((item) => item.id === id)
      overlays.splice(index, 1)
    }
  }

  function patch<T extends Component>(id: symbol, props: Partial<ComponentProps<T>>): void {
    const overlay = getOverlay(id)

    overlay.props = { ...overlay.props, ...props }
  }

  function getOverlay(id: symbol): Overlay {
    const overlay = overlays.find((item) => item.id === id)

    if (!overlay)
      throw new Error('Overlay not found')

    return overlay
  }

  function isOpen(id: symbol) {
    const overlay = getOverlay(id)
    return overlay.isOpen
  }

  return {
    overlays,
    open,
    close,
    closeAll,
    create,
    patch,
    unmount,
    isOpen,
  }
}

export const useOverlay = /* @__PURE__ */ createSharedComposable(_useOverlay)
