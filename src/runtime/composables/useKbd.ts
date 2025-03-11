// source: https://github.com/nuxt/ui/blob/v3/src/runtime/composables/useKbd.ts

import { createSharedComposable } from '@vueuse/core'
import { computed, onMounted, reactive } from 'vue'

interface KbdKeysSpecificMap {
  meta: string
  alt: string
  ctrl: string
}

export const kbdKeysMap = {
  meta: '',
  ctrl: '',
  alt: '',
  win: '⊞',
  command: '⌘',
  shift: '⇧',
  option: '⌥',
  enter: '↵',
  delete: '⌦',
  backspace: '⌫',
  escape: '⎋',
  tab: '⇥',
  capslock: '⇪',
  arrowup: '↑',
  arrowright: '→',
  arrowdown: '↓',
  arrowleft: '←',
  pageup: '⇞',
  pagedown: '⇟',
  home: '↖',
  end: '↘',
}

export type KbdKey = keyof typeof kbdKeysMap
export type KbdKeySpecific = keyof KbdKeysSpecificMap

export const useKbd = createSharedComposable(() => {
  const macOS = computed(() => import.meta.client && navigator && navigator.userAgent && navigator.userAgent.match(/Macintosh;/))
  const kbdKeysSpecificMap = reactive<KbdKeysSpecificMap>({
    meta: ' ',
    alt: ' ',
    ctrl: ' ',
  })

  onMounted(() => {
    kbdKeysSpecificMap.meta = macOS.value ? kbdKeysMap.command : kbdKeysMap.win
    kbdKeysSpecificMap.alt = macOS.value ? kbdKeysMap.option : 'alt'
    kbdKeysSpecificMap.ctrl = macOS.value ? '⌃' : 'ctrl'
  })

  function getKbdKey(value?: KbdKey | (string & {})) {
    if (!value)
      return

    if (['meta', 'alt', 'ctrl'].includes(value))
      return kbdKeysSpecificMap[value as KbdKeySpecific]

    return kbdKeysMap[value as KbdKey] || value.toUpperCase()
  }

  return {
    macOS,
    getKbdKey,
  }
})
