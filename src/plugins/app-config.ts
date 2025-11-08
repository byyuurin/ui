import type { UnpluginOptions } from 'unplugin'
import type { UIOptions } from '../unplugin'

/**
 * This plugin injects UI configuration into the runtime build so UI components can
 * access it.
 */
// ref: https://github.com/nuxt/ui/blob/0f99a4cdbcbca3090ef0a58f475be46de4eeb9ff/src/plugins/app-config.ts
export default function AppConfigPlugin(options: UIOptions, appConfig: Record<string, any>): UnpluginOptions {
  const name = 'byyuurin:ui:app-config'

  const resolve = {
    id: '#build/app.config',
    filename: 'virtual:byyuurin-ui-app-config',
  }

  return {
    name,
    enforce: 'pre',
    resolveId(id) {
      if (id === resolve.id)
        return resolve.filename
    },
    loadInclude(id) {
      return id === resolve.filename
    },
    load() {
      return `// @unocss-include\nexport default ${JSON.stringify(appConfig, null, 2)}`
    },
  }
}
