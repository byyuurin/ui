import { addComponentsDir, addImportsDir, addPlugin, createResolver, defineNuxtModule, hasNuxtModule, installModule } from '@nuxt/kit'
import { defu } from 'defu'
import { name, version } from '../package.json'
import type { VariantsColor, VariantsSize } from './defaults'
import { defaultOptions, getDefaultUIConfig, resolveColors } from './defaults'
import { addTemplates } from './templates'

export type * from './runtime/types'

type Color = VariantsColor | (string & {})
type Size = VariantsSize | (string & {})

export interface ModuleOptions {
  /**
   * Prefix for components
   *
   * @default "U"
   */
  prefix?: string

  /**
   * Enable or disable `@nuxtjs/color-mode` module
   *
   * @default true
   */
  colorMode?: boolean

  /**
   * Customize how the theme is generated
   */
  theme?: {
    /**
     * Define the color aliases available for components
     * @default ["primary", "secondary", "success", "info", "warning", "error"]
     */
    colors?: Color[]

    /**
     * Enable or disable transitions on components
     * @default true
     */
    transitions?: boolean

    defaultVariants?: {
      /**
       * The default color variant to use for components
       * @default "primary"
       */
      color?: Color

      /**
       * The default size variant to use for components
       * @default "md"
       */
      size?: Size
    }
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'ui',
    compatibility: {
      nuxt: '>=3.16.2',
    },
  },
  defaults: defaultOptions,
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    options.theme ||= {}
    options.theme.colors = resolveColors(options.theme.colors)

    nuxt.options.ui = options
    nuxt.options.alias['#ui'] = resolve('./runtime')
    nuxt.options.appConfig.ui = defu(nuxt.options.appConfig.ui || {}, getDefaultUIConfig(options.theme.colors))

    async function registerModule(name: string, key: string, options: Record<string, any>) {
      if (hasNuxtModule(name))
        (nuxt.options as any)[key] = defu((nuxt.options as any)[key], options)
      else
        await installModule(name, defu((nuxt.options as any)[key], options))
    }

    await registerModule('@nuxt/icon', 'icon', {
      cssLayer: 'components',
    })

    if (options.colorMode) {
      await registerModule('@nuxtjs/color-mode', 'colorMode', {
        classSuffix: '',
        disableTransition: true,
      })
    }

    addPlugin({ src: resolve('./runtime/plugins/colors') })

    addComponentsDir({
      path: resolve('./runtime/components'),
      pathPrefix: false,
      prefix: options.prefix,
    })

    addImportsDir(resolve('./runtime/composables'))

    addTemplates(options, nuxt, resolve)
  },
})
