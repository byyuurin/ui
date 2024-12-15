import type { ComponentResolver } from 'unplugin-vue-components'
import { components } from './shared/constants'

export interface ResolverOptions {
  /**
   * prefix for components used in templates
   *
   * @defaultValue ""
   */
  prefix?: string
}

export default function (options: ResolverOptions = {}): ComponentResolver {
  const { prefix = '' } = options

  return {
    type: 'component',
    resolve(name) {
      if (name.toLowerCase().startsWith(prefix.toLowerCase())) {
        const componentName = name.slice(prefix.length)

        if (components.includes(componentName)) {
          return {
            name: componentName,
            from: '@byyuurin/ui',
          }
        }
      }
    },
  }
}
