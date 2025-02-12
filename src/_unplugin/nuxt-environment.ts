import MagicString from 'magic-string'
import { resolvePathSync } from 'mlly'
import { normalize } from 'pathe'
import type { UnpluginOptions } from 'unplugin'
import { runtimeDir } from '../internal/shared'

/**
 * This plugin normalises Nuxt environment (#imports) and `import.meta.client` within the UI components.
 */
export default function NuxtEnvironmentPlugin(): UnpluginOptions {
  const stubPath = resolvePathSync('../runtime/vue/stubs', { extensions: ['.ts', '.mjs', '.js'], url: import.meta.url })
  const name = 'byyuurin:ui'
  const resolveId = '#imports'

  return {
    name,
    enforce: 'pre',
    resolveId(id) {
      // this is implemented here rather than in a vite `config` hook for cross-builder support
      if (id === resolveId)
        return stubPath
    },
    transformInclude(id) {
      return normalize(id).includes(runtimeDir)
    },
    transform(code) {
      if (code.includes('import.meta.client')) {
        const s = new MagicString(code)
        s.replaceAll('import.meta.client', 'true')

        if (s.hasChanged()) {
          return {
            code: s.toString(),
            map: s.generateMap({ hires: true }),
          }
        }
      }
    },
  }
}
