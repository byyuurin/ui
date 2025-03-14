import { defu } from 'defu'
import { join } from 'pathe'
import { globSync } from 'tinyglobby'
import type { UnpluginContextMeta, UnpluginOptions } from 'unplugin'
import AutoImportComponents from 'unplugin-vue-components'
import type { Options as ComponentsOptions } from 'unplugin-vue-components/types'
import type { UIOptions } from '../unplugin'
import { runtimeDir } from '../unplugin'

/** This plugin adds all the Nuxt UI components as auto-imports. */
// ref: https://github.com/nuxt/ui/tree/6c20f8a9ea03273a795c5f88c071830decd54c1e/src/plugins/components.ts
export default function ComponentImportPlugin(options: UIOptions, meta: UnpluginContextMeta) {
  const { prefix = 'U' } = options
  const components = globSync('**/*.vue', { cwd: join(runtimeDir, 'components') })
  const componentNames = new Set(components.map((c) => `${prefix}${c.replace(/\.vue$/, '')}`))

  const pluginOptions = defu(options.components, <ComponentsOptions>{
    dts: options.dts ?? true,
    resolvers: [
      (componentName) => {
        if (componentNames.has(componentName))
          return { name: 'default', from: join(runtimeDir, 'components', `${componentName.slice(prefix.length)}.vue`) }
      },
    ],
  })

  return AutoImportComponents.raw(pluginOptions, meta) as UnpluginOptions
}
