import type { UnpluginOptions } from 'unplugin'
import type { ThemeExtension } from '../runtime/types'
import type { UIOptions } from '../unplugin'

interface AppConfigPluginOptions extends UIOptions {
  theme?: ThemeExtension
}

/**
 * This plugin injects UI configuration into the runtime build so UI components can
 * access it.
 */
export default function AppConfigPlugin(options: AppConfigPluginOptions, appConfig: Record<string, any>): UnpluginOptions {
  const name = 'byyuurin:ui:app-config'
  const resolveId = '#build/app.config'
  const loadIncludeID = 'virtual:byyuurin-ui-app-config'

  return {
    name,
    enforce: 'pre',
    resolveId(id) {
      if (id === resolveId)
        return loadIncludeID
    },
    loadInclude(id) {
      return id === loadIncludeID
    },
    load() {
      return `export default ${JSON.stringify(appConfig)}`
    },
  }
}
