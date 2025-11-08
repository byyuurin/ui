import MagicString from 'magic-string'
import { resolvePathSync } from 'mlly'
import { normalize } from 'pathe'
import type { UnpluginOptions } from 'unplugin'
import { runtimeDir } from '../unplugin'

/**
 * This plugin normalises Nuxt environment (#imports) and `import.meta.client` within the UI components.
 */
// ref: https://github.com/nuxt/ui/blob/0f99a4cdbcbca3090ef0a58f475be46de4eeb9ff/src/plugins/nuxt-environment.ts
export default function NuxtEnvironmentPlugin(): UnpluginOptions {
  const name = 'byyuurin:ui'

  const resolve = {
    id: '#imports',
    filename: resolvePathSync('../runtime/vue/stubs', { extensions: ['.ts', '.mjs', '.js'], url: import.meta.url }),
  }

  return {
    name,
    enforce: 'pre',
    resolveId(id) {
      // this is implemented here rather than in a vite `config` hook for cross-builder support
      if (id === resolve.id)
        return resolve.filename
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
