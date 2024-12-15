import type { ComponentResolver } from 'unplugin-vue-components'
import { componentNames, packageName } from './constants'

export interface ResolverOptions {
  /**
   * prefix for components used in templates
   *
   * @default ""
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

        if (componentNames.includes(componentName)) {
          return {
            name: componentName,
            from: packageName,
          }
        }
      }
    },
  }
}
