import { fileURLToPath } from 'node:url'
import { defu } from 'defu'
import { normalize } from 'pathe'
import type { UnpluginOptions } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { Options as AutoImportOptions } from 'unplugin-auto-import/types'
import type { Options as ComponentsOptions } from 'unplugin-vue-components/types'
import { name as packageName } from '../package.json'
import { defaultOptions, getDefaultUIConfig, resolveColors } from './defaults'
import type { ModuleOptions } from './module'
import AppConfigPlugin from './plugins/app-config'
import AutoImportPlugin from './plugins/auto-import'
import ComponentImportPlugin from './plugins/components'
import NuxtEnvironmentPlugin from './plugins/nuxt-environment'
import PluginsPlugin from './plugins/plugins'
import TemplatesPlugin from './plugins/templates'
import type { AppConfigUI } from './setup'

export const runtimeDir = normalize(fileURLToPath(new URL('runtime', import.meta.url)))

export interface UIOptions extends ModuleOptions {
  /** Whether to generate declaration files for auto-imported components. */
  dts?: boolean
  ui?: AppConfigUI
  /**
   * Override options for `unplugin-auto-import`
   */
  autoImport?: Partial<AutoImportOptions>
  /**
   * Override options for `unplugin-vue-components`
   */
  components?: Partial<ComponentsOptions>
}

export const unplugin = createUnplugin<UIOptions | undefined>((userOptions: UIOptions = {}, meta) => {
  const options = defu(userOptions, defaultOptions)

  options.theme ||= {} as any
  options.theme.colors = resolveColors(options.theme.colors)

  const appConfig = defu(
    { ui: {
      colors: options.ui?.colors,
      icons: options.ui?.colors,
      ...options.ui?.components,
    } },
    { ui: getDefaultUIConfig(options.theme.colors) },
  )

  return [
    NuxtEnvironmentPlugin(),
    ComponentImportPlugin(options, meta),
    AutoImportPlugin(options, meta),
    PluginsPlugin(options),
    TemplatesPlugin(options, appConfig),
    AppConfigPlugin(options, appConfig),
    <UnpluginOptions>{
      name: 'byyuurin:ui:plugins-duplication-detection',
      vite: {
        configResolved(config) {
          const checkPluginNames = [
            'unplugin-auto-import',
            'unplugin-vue-components',
          ]
          const plugins = config.plugins || []

          const makeMessage = (pluginName: string) => `[${packageName}] Multiple instances of \`${pluginName}\` detected. ${packageName} includes \`${pluginName}\` already, and you can configure it using \`${pluginName}\` option in ${packageName} module options.`

          for (const pluginName of checkPluginNames) {
            if (plugins.filter((i) => i.name === pluginName).length > 1)
              throw new Error(makeMessage(pluginName))
          }
        },
      },
    },
  ].flat(1)
})
