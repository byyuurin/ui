import { genSafeVariableName } from 'knitwork'
import MagicString from 'magic-string'
import { resolvePathSync } from 'mlly'
import { join } from 'pathe'
import { globSync } from 'tinyglobby'
import type { UnpluginOptions } from 'unplugin'
import type { UIOptions } from '../unplugin'
import { runtimeDir } from '../unplugin'

export default function PluginsPlugin(options: UIOptions) {
  const name = 'byyuurin:ui:plugins'

  const resolve = {
    id: '@byyuurin/ui/vue-plugin',
    filename: 'virtual:byyuurin-ui-plugins',
  }

  const plugins = globSync(['**/*', '!*.d.ts'], { cwd: join(runtimeDir, 'plugins'), absolute: true })

  plugins.unshift(resolvePathSync('../runtime/vue/plugins/head', { extensions: ['.ts', '.mjs', '.js'], url: import.meta.url }))

  if (options.colorMode)
    plugins.push(resolvePathSync('../runtime/vue/plugins/color-mode', { extensions: ['.ts', '.mjs', '.js'], url: import.meta.url }))

  return {
    name,
    enforce: 'pre',
    resolveId(id) {
      if (id === resolve.id)
        return resolve.filename
    },
    transform(code, id) {
      const targetCode = 'import.meta.client'

      if (plugins.some((p) => id.startsWith(p)) && code.includes(targetCode)) {
        const s = new MagicString(code)

        s.replaceAll(targetCode, 'true')

        if (s.hasChanged()) {
          return {
            code: s.toString(),
            map: s.generateMap({ hires: true }),
          }
        }
      }
    },
    loadInclude(id) {
      return id === resolve.filename
    },
    load() {
      return `${plugins.map((p) => `import ${genSafeVariableName(p)} from "${p}"`).join('\n')}

export default {
  install(app) {
${plugins.map((p) => `    app.use(${genSafeVariableName(p)})`).join('\n')}
  }
}
`
    },
    // Argument Vite specific configuration
    vite: {
      config() {
        return {
          // Opt-out Nuxt UI from Vite's pre-bundling,
          // as we need Vite's pipeline to resolve imports like `#imports`
          optimizeDeps: {
            exclude: ['@byyuurin/ui'],
          },
        }
      },
    },
  } satisfies UnpluginOptions
}
