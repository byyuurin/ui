import { addComponentsDir, addImportsDir, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit'
import { packageName } from './shared'

export interface ModuleOptions {
  /**
   * prefix for components used in templates
   *
   * @default "U"
   */
  prefix?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: packageName,
    configKey: 'ui',
    compatibility: {
      nuxt: '>=3.13.1',
    },
  },
  defaults: {
    prefix: 'U',
  },
  setup(options, nuxt) {
    const logger = useLogger(packageName)
    const { resolve } = createResolver(import.meta.url)

    // Make sure the UnoCSS Nuxt module is installed
    if (!nuxt.options.modules.includes('@unocss/nuxt')) {
      logger.error(`\`${packageName}\` requires the \`@unocss/nuxt\` module to be installed.`)
      return
    }

    nuxt.options.vite.optimizeDeps ??= {}
    nuxt.options.vite.optimizeDeps.include ??= []
    nuxt.options.vite.optimizeDeps.include.push(`${packageName}/unocss`)

    nuxt.options.alias['#ui'] = resolve('./runtime')

    addComponentsDir({
      path: resolve('./runtime/components'),
      prefix: options.prefix,
      pathPrefix: false,
    })

    addImportsDir(resolve('./runtime/composables'))
  },
})
