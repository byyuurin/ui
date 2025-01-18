import { addComponent, defineNuxtModule, logger, useLogger } from '@nuxt/kit'
import type {} from '@nuxt/schema' // Mandatory to avoid a bug when building
import { componentNames, packageName } from './internal'

export interface ModuleOptions {
  /**
   * prefix for components used in templates
   *
   * @default ""
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
    prefix: '',
  },
  setup(options, nuxt) {
    const logger = useLogger(packageName)

    // Make sure the UnoCSS Nuxt module is installed
    if (!nuxt.options.modules.includes('@unocss/nuxt')) {
      logger.error(`\`${packageName}\` requires the \`@unocss/nuxt\` module to be installed.`)
      return
    }

    for (const component of componentNames) {
      addComponent({
        name: `${options.prefix}${component}`,
        export: component,
        filePath: packageName,
      })
    }
  },
})
