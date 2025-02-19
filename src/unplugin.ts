import type { UnpluginOptions } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { Options as AutoImportOptions } from 'unplugin-auto-import/types'
import type { Options as ComponentsOptions } from 'unplugin-vue-components/types'
import AutoImportPlugin from './_unplugin/auto-import'
import ComponentImportPlugin from './_unplugin/components'
import { packageName } from './internal/shared'

export interface UIOptions {
  /**
   * prefix for components used in templates
   *
   * @default "U"
   */
  prefix?: string
  /** Whether to generate declaration files for auto-imported components. */
  dts?: boolean
  /**
   * Override options for `unplugin-auto-import`
   */
  autoImport?: Partial<AutoImportOptions>
  /**
   * Override options for `unplugin-vue-components`
   */
  components?: Partial<ComponentsOptions>
}

export const unplugin = createUnplugin<UIOptions | undefined>((options: UIOptions = {}, meta) => {
  return [
    ComponentImportPlugin(options, meta),
    AutoImportPlugin(options, meta),
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
  ]
})
