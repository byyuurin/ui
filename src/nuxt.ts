import { addComponent, defineNuxtModule } from '@nuxt/kit'
import type {} from '@nuxt/schema' // Mandatory to avoid a bug when building
import { componentNames, packageName } from './constants'

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
    name: '@byyuurin/ui',
    configKey: 'ui',
    compatibility: {
      nuxt: '>=3.13.1',
    },
  },
  defaults: {
    prefix: '',
  },
  setup(options) {
    for (const component of componentNames) {
      addComponent({
        name: `${options.prefix}${component}`,
        export: component,
        filePath: packageName,
      })
    }
  },
})
