import process from 'node:process'
import { fileURLToPath } from 'node:url'
import type { Resolver } from '@nuxt/kit'
import { addTemplate, addTypeTemplate, findPath } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'
import { loadConfig } from '@unocss/config'
import type { UserShortcuts } from '@unocss/core'
import type { NuxtTemplate, NuxtTypeTemplate } from 'nuxt/schema'
import { kebabCase } from 'scule'
import { neutralColors } from './defaults'
import type { ModuleOptions } from './module'
import type { AppConfigUI } from './setup'
import * as theme from './theme'
import { createUnoPreset, shortcutsCode } from './unocss'

export function buildTemplates(options: ModuleOptions) {
  return Object.entries(theme).reduce((acc, [key, component]) => {
    acc[key] = typeof component === 'function' ? (component as any)(options as Required<ModuleOptions>) : component
    return acc
  }, {} as Record<string, any>)
}

export function getTemplates(options: ModuleOptions, uiConfig: AppConfigUI, nuxt?: Nuxt) {
  const templates: NuxtTemplate[] = []

  const isDev = process.argv.includes('--uiDev')

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
                `import { ct } from '@byyuurin/ui-kit'`,
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
            `// @unocss-include\nimport { ct } from '@byyuurin/ui-kit'`,
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

        const { preflights, ...unoPreset } = createUnoPreset(options.theme)
        let content = JSON.stringify({ ...unoPreset, shortcuts: [] }, null, 2)

        content = content.replace('"shortcuts": []', `"shortcuts": ${shortcutsCode}`)

        content = `${content.slice(0, -2)},\n  "preflights": [
    ${preflights.map(({ getCSS }) => `{ getCSS: () => \`${getCSS()}\` }`).join(',\n    ')}
    ]\n}`

        const result = [
          `import { createUnoMerge } from '@byyuurin/uno-merge'`,
          `import type { Preset, UserConfig } from '@unocss/core'`,
          `import { mergeConfigs } from '@unocss/core'`,
          `import type { Theme } from '@unocss/preset-wind4'`,
          `import { presetWind4 } from '@unocss/preset-wind4'`,
          `import { parseColor } from '@unocss/preset-wind4/utils'`,
        ]

        if (configPath) {
          // only works with Nuxt now
          if (nuxt && isDev) {
            result.push(
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

            result.push(
              ``,
              `const userConfig: UserConfig = ${JSON.stringify({ theme: config.theme, shortcuts }, null, 2)}`,
            )
          }
        }
        else {
          result.push(
            ``,
            `const userConfig: UserConfig = {}`,
          )
        }

        result.push(
          ``,
          `const ui = ()=> (${content} satisfies Preset<Theme>)`,
          ``,
          `export const { merge: unoMerge } = await createUnoMerge(mergeConfigs([
  {
    presets: [
      presetWind4(),
      ui()
    ]
  },
  userConfig,
]))
`,
        )

        return result.join('\n')
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
