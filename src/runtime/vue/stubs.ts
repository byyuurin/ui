import { useColorMode as _useColorMode } from '@vueuse/core'
import type { Plugin as VuePlugin, Ref } from 'vue'
import { ref } from 'vue'
import type { useRoute as _useRoute, useRouter as _useRouter } from 'vue-router'
import type { NuxtApp } from '#app'
import appConfig from '#build/app.config'

export { useAppConfig } from './composables/useAppConfig'
export { useHead } from '@unhead/vue'

type UseRoute = typeof _useRoute
type UseRouter = typeof _useRouter

let _useRouteFn: UseRoute | undefined
let _useRouterFn: UseRouter | undefined

try {
  const module = await import('vue-router')
  _useRouteFn = module.useRoute
  _useRouterFn = module.useRouter
}
catch {
  // vue-router is not installed.
}

export const useRoute = () => _useRouteFn?.() ?? null
export const useRouter = () => _useRouterFn?.() ?? null

export function useColorMode() {
  if (!appConfig.colorMode) {
    return {
      forced: false,
    }
  }

  const { store, system } = _useColorMode()

  return {
    get preference() {
      return store.value === 'auto' ? 'system' : store.value
    },
    set preference(value) {
      store.value = value === 'system' ? 'auto' : value
    },
    get value() {
      return store.value === 'auto' ? system.value : store.value
    },
    forced: false,
  }
}

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
    payload: { serverRendered: import.meta.env.SSR || false },
  }
}

export function defineNuxtPlugin(plugin: (nuxtApp: NuxtApp) => void) {
  return {
    install(app) {
      app.runWithContext(() => plugin({ vueApp: app } as NuxtApp))
    },
  } satisfies VuePlugin
}
