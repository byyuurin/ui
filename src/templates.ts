import { createRequire } from 'node:module'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import type { Resolver } from '@nuxt/kit'
import { addTemplate, addTypeTemplate, findPath } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'
import { loadConfig } from '@unocss/config'
import type { UserShortcuts } from '@unocss/core'
import { genExport } from 'knitwork'
import type { NuxtTemplate, NuxtTypeTemplate } from 'nuxt/schema'
import { normalize } from 'pathe'
import { kebabCase } from 'scule'
import { neutralColors } from './defaults'
import type { ModuleOptions } from './module'
import type { AppConfigUI } from './setup'
import * as theme from './theme'

export function buildTemplates(options: ModuleOptions) {
  return Object.entries(theme).reduce((acc, [key, component]) => {
    acc[key] = typeof component === 'function' ? (component as any)(options as Required<ModuleOptions>) : component
    return acc
  }, {} as Record<string, any>)
}

export function getTemplates(options: ModuleOptions, uiConfig: AppConfigUI, nuxt?: Nuxt) {
  const _require = createRequire(import.meta.url)

  const templates: NuxtTemplate[] = []
  const isDev = process.argv.includes('--uiDev')

  const imports = {
    unoCore: resolveImport('unoCore', '@unocss/core'),
    unoPresetWind4: resolveImport('unoPreset', '@unocss/preset-wind4'),
    unoMerge: resolveImport('unoMerge', '@byyuurin/uno-merge'),
    uiKit: resolveImport('uiKit', '@byyuurin/ui-kit'),
  }

  function resolveImport(name: string, packageName: string) {
    try {
      const realPath = _require.resolve(packageName)
      return normalize(realPath)
    }
    catch {
      // eslint-disable-next-line no-console
      console.warn(`[@byyuurin/ui] Cloud not resolve dependency: ${packageName}`)
      return packageName
    }
  }

  function writeThemeTemplate(theme: Record<string, any>, path?: string) {
    for (const component in theme) {
      templates.push({
        filename: `ui/${path ? `${path}/` : ''}${kebabCase(component)}.ts`,
        write: true,
        getContents: () => {
          const template = theme[component]
          const result = typeof template === 'function' ? template(options) : template
          const json = JSON.stringify(result, null, 2)

          // For local development, import directly from theme
          if (isDev) {
            const templatePath = fileURLToPath(new URL(`theme/${path ? `${path}/` : ''}${kebabCase(component)}`, import.meta.url))

            return [
              [
                `// @unocss-include`,
                `import type { ModuleOptions } from '@byyuurin/ui'`,
                `import { ct } from '${imports.uiKit}'`,
                `import template from ${JSON.stringify(templatePath)}`,
              ].join('\n'),
              `const options: ModuleOptions = ${JSON.stringify(options, null, 2)}`,
              `const result = typeof template === 'function' ? (template as Function)(options) : template`,
              `if (result?.defaultVariants?.color && options.theme?.defaultVariants?.color)\n  result.defaultVariants.color = options.theme.defaultVariants.color`,
              `if (result?.defaultVariants?.size && options.theme?.defaultVariants?.size)\n  result.defaultVariants.size = options.theme.defaultVariants.size`,
              `const theme = ct(${json})`,
              `export default result as typeof theme`,
            ].join('\n\n')
          }

          // For production build
          return [
            `// @unocss-include\nimport { ct } from '${imports.uiKit}'`,
            `export default ct(${json})`,
          ].join('\n\n')
        },
      })
    }
  }

  function writeUnoTemplate() {
    templates.push({
      filename: 'uno-merge.ts',
      write: true,
      async getContents() {
        const { config } = await loadConfig()
        const configPath = await findPath(['uno.config', 'unocss.config'], { extensions: ['.ts', '.mjs'] })

        const userConfigSource: string[] = []

        if (configPath) {
          // only works with Nuxt now
          if (nuxt && isDev) {
            userConfigSource.push(
              `import config from ${JSON.stringify(configPath.replace(/\.ts$/, ''))}`,
              ``,
              `const userConfig: UserConfig = { theme: config.theme, shortcuts: config.shortcuts }`,
            )
          }
          else {
            let shortcuts: UserShortcuts | undefined

            if (config.shortcuts) {
              shortcuts = Array.isArray(config.shortcuts)
                ? config.shortcuts
                : [config.shortcuts]

              shortcuts = shortcuts.filter((s) => {
                if (Array.isArray(s))
                  return !(s[0] instanceof RegExp)

                return true
              })
            }

            userConfigSource.push(
              ``,
              `const userConfig: UserConfig = ${JSON.stringify({ theme: config.theme, shortcuts }, null, 2)}`,
            )
          }
        }
        else {
          userConfigSource.push(
            ``,
            `const userConfig: UserConfig = {}`,
          )
        }

        return `import { createUnoMerge } from '${imports.unoMerge}'
import { createUnoPreset } from '@byyuurin/ui/unocss'
import type { UserConfig } from '${imports.unoCore}'
import { mergeConfigs } from '${imports.unoCore}'
import { presetWind4 } from '${imports.unoPresetWind4}'
${userConfigSource.join('\n')}

export const { merge: unoMerge } = await createUnoMerge(mergeConfigs([
  {
    presets: [
      presetWind4(),
      createUnoPreset(${JSON.stringify({ colors: options.theme?.colors })})
    ]
  },
  userConfig,
]))`
      },
    })
  }

  writeThemeTemplate(theme)
  writeUnoTemplate()

  templates.push({
    filename: 'ui/index.ts',
    write: true,
    getContents() {
      const contents = Object.keys(theme).map((component) => `export { default as ${component} } from './${kebabCase(component)}'`).join('\n')

      return contents
    },
  })

  templates.push({
    filename: 'types/ui.d.ts',
    getContents() {
      const appIcon = Object.keys(uiConfig.icons ?? {}).map((s) => `'${s}'`).join(' | ')
      const appNeutralColor = neutralColors.map((s) => `'${s}'`).join(' | ')

      return `import * as ui from '#build/ui'
import type { UIConfig } from '@byyuurin/ui'
import type { colors } from '@unocss/preset-wind4/colors'

type NeutralColor = ${appNeutralColor}
type Color = keyof Omit<typeof colors, NeutralColor | 'black' | 'white'> | (string & {})

type AppConfigIcons = Record<${appIcon} | (string & {}), string>

export type AppConfigUI = {
  colors?: {
    ${options.theme?.colors?.map((color) => `'${color}'?: Color`).join('\n    ')}
    neutral?: NeutralColor | (string & {})
  }
  icons?: Partial<AppConfigIcons>
} & UIConfig<typeof ui>

declare module '@nuxt/schema' {
  interface AppConfigInput {
    /** UI theme configuration */
    ui?: AppConfigUI
  }
}

export {}
`
    },
  })

  templates.push({
    filename: 'ui-image-component.ts',
    write: true,
    getContents: ({ app }) => {
      const image = app?.components?.find((c) => c.pascalName === 'NuxtImg' && !/nuxt(?:-nightly)?\/dist\/app/.test(c.filePath))

      return image ? genExport(image.filePath, [{ name: image.export, as: 'default' }]) : 'export default "img"'
    },
  })

  return templates
}

export function addTemplates(options: ModuleOptions, nuxt: Nuxt, resolve: Resolver['resolve']) {
  const templates = getTemplates(options, nuxt.options.appConfig.ui, nuxt)

  for (const template of templates) {
    if (template.filename!.endsWith('.d.ts'))
      addTypeTemplate(template as NuxtTypeTemplate)
    else
      addTemplate(template)
  }

  nuxt.hook('prepare:types', ({ references }) => {
    references.push({ path: resolve('./runtime/types/app.config.d.ts') })
    references.push({ path: resolve('./runtime/types/unocss.d.ts') })
  })
}
