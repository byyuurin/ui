import { defu } from 'defu'
import { join } from 'pathe'
import { globSync } from 'tinyglobby'
import type { UnpluginContextMeta, UnpluginOptions } from 'unplugin'
import AutoImportComponents from 'unplugin-vue-components'
import type { Options as ComponentsOptions } from 'unplugin-vue-components/types'
import { runtimeDir } from '../internal/shared'
import type { UIOptions } from '../unplugin'

/** This plugin adds all the Nuxt UI components as auto-imports. */
export default function ComponentImportPlugin(options: UIOptions, meta: UnpluginContextMeta) {
  const { prefix = 'U' } = options
  const components = globSync('**/*.vue', { cwd: join(runtimeDir, 'components') })
  const componentNames = new Set(components.map((c) => `${prefix}${c.replace(/\.vue$/, '')}`))

  const pluginOptions = defu(options.components, <ComponentsOptions>{
    dts: options.dts ?? true,
    exclude: [
      /[\\/]node_modules[\\/](?!\.pnpm|@byyuurin\/ui)/,
      /[\\/]\.git[\\/]/,
      /[\\/]\.nuxt[\\/]/,
    ],
    resolvers: [
      (componentName) => {
        if (componentNames.has(componentName))
          return { name: 'default', from: join(runtimeDir, 'components', `${componentName.slice(prefix.length)}.vue`) }
      },
    ],
  })

  return AutoImportComponents.raw(pluginOptions, meta) as UnpluginOptions
}
