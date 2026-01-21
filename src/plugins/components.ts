import { defu } from 'defu'
import { join, normalize } from 'pathe'
import { globSync } from 'tinyglobby'
import type { UnpluginContextMeta, UnpluginOptions } from 'unplugin'
import AutoImportComponents from 'unplugin-vue-components'
import type { Options as ComponentsOptions } from 'unplugin-vue-components/types'
import type { RouterMode, UIOptions } from '../unplugin'
import { resolveRouterMode, runtimeDir } from '../unplugin'

interface ComponentSource {
  has: (name: string) => boolean
  resolve: (name: string) => { name: string, from: string } | undefined
  resolveFile: (filename: string) => string | undefined
}

function createComponentSource(base: string, prefix: string, ignore: string[] = []): ComponentSource {
  const cwd = join(runtimeDir, base)
  const files = globSync('**/*.vue', { cwd, ignore: ignore.filter(Boolean) as string[] })
  const names = new Set(files.map((c) => `${prefix}${c.split('/').pop()?.replace(/\.vue$/, '')}`))
  const paths = new Map(files.map((c) => {
    const componentName = `${prefix}${c.split('/').pop()?.replace(/\.vue$/, '')}`
    return [componentName, c] as const
  }))

  return {
    has: (name) => names.has(name),
    resolve: (componentName) => {
      const relativePath = paths.get(componentName)

      if (!relativePath)
        return

      return { name: 'default', from: join(cwd, relativePath) }
    },
    resolveFile: (filename) => {
      const componentName = `${prefix}${filename}`
      const relativePath = paths.get(componentName)

      if (!relativePath)
        return

      return join(cwd, relativePath)
    },
  }
}

const RELATIVE_IMPORT_RE = /^\.{1,2}\//

/** This plugin adds all the Nuxt UI components as auto-imports. */
// ref: https://github.com/nuxt/ui/blob/b34cf8a13491fec5b27a15a8ae5bd143e19aeb9d/src/plugins/components.ts
export default function ComponentImportPlugin(options: UIOptions, meta: UnpluginContextMeta) {
  const { prefix = 'U' } = options
  const routerMode = resolveRouterMode(options)

  // Component sources in priority order (first match wins)
  const routerOverrides: Record<RouterMode, ComponentSource> = {
    'vue-router': createComponentSource('vue/overrides/vue-router', prefix),
    'none': createComponentSource('vue/overrides/none', prefix),
  }

  const unpluginComponents = createComponentSource('vue/components', prefix)
  const defaultComponents = createComponentSource('components', prefix)

  const sources = [routerOverrides[routerMode], unpluginComponents, defaultComponents].filter((s): s is ComponentSource => !!s)
  const packagesToScan = [
    '@byyuurin/ui',
  ]
  const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const packagesRegex = packagesToScan.map(escapeRegex).join('|')
  const excludeRegex = new RegExp(`[\\\\/]node_modules[\\\\/](?!\\.pnpm|${packagesRegex})`)

  const pluginOptions = defu(options.components, <ComponentsOptions>{
    dts: options.dts ?? true,
    exclude: [
      excludeRegex,
      /[\\/]\.git[\\/]/,
      /[\\/]\.nuxt[\\/]/,
    ],
    resolvers: [
      (componentName) => {
        for (const source of sources) {
          const resolved = source.resolve(componentName)

          if (resolved)
            return resolved
        }
      },
    ],
  })

  return [
    {
      name: 'byyuurin:ui:components',
      enforce: 'pre',
      resolveId(id, importer) {
        // only apply to runtime components
        if (!importer || !normalize(importer).includes(runtimeDir))
          return

        // only apply to relative imports
        if (!RELATIVE_IMPORT_RE.test(id))
          return

        const filename = id.match(/([^/]+)\.vue$/)?.[1]

        if (!filename)
          return

        for (const source of sources) {
          const resolved = source.resolveFile(filename)

          if (resolved)
            return resolved
        }
      },
    },
    AutoImportComponents.raw(pluginOptions, meta) as UnpluginOptions,
  ] satisfies UnpluginOptions[]
}
