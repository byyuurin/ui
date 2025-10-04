import { defu } from 'defu'
import { join, normalize } from 'pathe'
import { globSync } from 'tinyglobby'
import type { UnpluginContextMeta, UnpluginOptions } from 'unplugin'
import AutoImportComponents from 'unplugin-vue-components'
import type { Options as ComponentsOptions } from 'unplugin-vue-components/types'
import type { UIOptions } from '../unplugin'
import { runtimeDir } from '../unplugin'

const RELATIVE_IMPORT_RE = /^\.{1,2}\//

/** This plugin adds all the Nuxt UI components as auto-imports. */
// ref: https://github.com/nuxt/ui/blob/57a5037b137647ad3926570727ab524c67a6d416/src/plugins/components.ts
export default function ComponentImportPlugin(options: UIOptions, meta: UnpluginContextMeta) {
  const { prefix = 'U' } = options
  const components = globSync('**/*.vue', {
    cwd: join(runtimeDir, 'components'),
  })
  const componentNames = new Set(components.map((c) => `${prefix}${c.replace(/\.vue$/, '')}`))

  const overrides = globSync('**/*.vue', {
    cwd: join(runtimeDir, 'vue/components'),
  })
  const overrideNames = new Set(overrides.map((c) => `${prefix}${c.replace(/\.vue$/, '')}`))

  const pluginOptions = defu(options.components, <ComponentsOptions>{
    dts: options.dts ?? true,
    exclude: [
      /[\\/]\.git[\\/]/,
      /[\\/]\.nuxt[\\/]/,
    ],
    resolvers: [
      (componentName) => {
        if (overrideNames.has(componentName))
          return { name: 'default', from: join(runtimeDir, 'vue/components', `${componentName.slice(prefix.length)}.vue`) }

        if (componentNames.has(componentName))
          return { name: 'default', from: join(runtimeDir, 'components', `${componentName.slice(prefix.length)}.vue`) }
      },
    ],
  })

  return [
    {
      name: 'byyuurin:ui:components',
      enforce: 'pre',
      resolveId(id, importer) {
        if (!importer)
          return

        if (!normalize(importer).includes(runtimeDir))
          return

        if (!RELATIVE_IMPORT_RE.test(id) && !id.startsWith('@byyuurin/ui/components/'))
          return

        const filename = id.match(/([^/]+)\.vue$/)?.[1]

        if (filename && overrideNames.has(`${prefix}${filename}`))
          return join(runtimeDir, 'vue/components', `${filename}.vue`)
      },
    },
    AutoImportComponents.raw(pluginOptions, meta) as UnpluginOptions,
  ] satisfies UnpluginOptions[]
}
