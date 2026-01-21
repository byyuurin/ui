import { ref } from 'vue'

export * from './base'

export function useRoute() {
  return {
    fullPath: '/',
    path: '/',
    name: null,
    params: {},
    query: {},
    hash: '',
    meta: {},
    matched: [],
    redirectedFrom: undefined,
  }
}

export function useRouter() {
  return {
    push: () => Promise.resolve(),
    replace: () => Promise.resolve(),
    go: () => {},
    back: () => {},
    forward: () => {},
    beforeEach: () => () => {},
    beforeResolve: () => () => {},
    afterEach: () => () => {},
    onError: () => () => {},
    isReady: () => Promise.resolve(true),
    currentRoute: ref({
      fullPath: '/',
      path: '/',
      name: null,
      params: {},
      query: {},
      hash: '',
      meta: {},
      matched: [],
      redirectedFrom: undefined,
    }),
    options: {},
  }
}
