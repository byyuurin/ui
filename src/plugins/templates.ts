import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import type { UnpluginOptions } from 'unplugin'
import { getTemplates } from '../templates'
import type { UIOptions } from '../unplugin'

// ref: https://github.com/nuxt/ui/blob/411ebccb9ec00661abbb74f8ceedd03e113c0d2b/src/plugins/templates.ts
/**
 * This plugin is responsible for getting the generated virtual templates and
 * making them available to the Vue build.
 */
export default function TemplatePlugin(options: UIOptions, _appConfig: Record<string, any>): UnpluginOptions {
  const name = 'byyuurin:ui:templates'
  const templateKeyPrefix = '#build/'
  const templateFilenamePrefix = 'virtual:byyuurin-ui-templates/'

  const templates = getTemplates(options, {})
  const templateKeys = new Set(templates.map((t) => `${templateKeyPrefix}${t.filename}`))

  async function writeTemplates(root: string) {
    const map: Record<string, string> = {}
    const dir = path.join(root, 'node_modules', '.nuxt')

    for (const template of templates) {
      if (!template.write || !template.filename)
        continue

      const filePath = path.join(dir, template.filename)

      if (!fs.existsSync(path.dirname(filePath)))
        fs.mkdirSync(path.dirname(filePath), { recursive: true })

      fs.writeFileSync(filePath, await template.getContents!({} as any))

      map[`#build/${template.filename}`] = filePath
    }

    return map
  }

  return {
    name,
    enforce: 'pre',
    vite: {
      async config(config) {
        const alias = await writeTemplates(config.root || process.cwd())

        return {
          resolve: {
            alias,
          },
        }
      },
    },
    resolveId(id) {
      if (templateKeys.has(`${id}.ts`))
        return `${id.replace(templateKeyPrefix, templateFilenamePrefix)}.ts`
    },
    loadInclude(id) {
      return templateKeys.has(id.replace(templateFilenamePrefix, templateKeyPrefix))
    },
    load(id) {
      const templateID = id.replace(templateFilenamePrefix, templateKeyPrefix)
      return templates.find((t) => `${templateKeyPrefix}${t.filename}` === templateID)!.getContents!({} as any)
    },
  }
}
