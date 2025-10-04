import type { NuxtTemplate } from '@nuxt/schema'
import type { UnpluginOptions } from 'unplugin'
import { getTemplates } from '../templates'
import type { UIOptions } from '../unplugin'

/**
 * This plugin is responsible for getting the generated virtual templates and
 * making them available to the Vue build.
 */
// ref: https://github.com/nuxt/ui/blob/0f99a4cdbcbca3090ef0a58f475be46de4eeb9ff/src/plugins/templates.ts
export default function TemplatePlugin(options: UIOptions, _appConfig: Record<string, any>): UnpluginOptions {
  const name = 'byyuurin:ui:templates'
  const templateKeyPrefix = '#build/'
  const templateFilenamePrefix = 'virtual:byyuurin-ui-templates/'

  const templates: NuxtTemplate[] = getTemplates(options, {})
  const templateKeys = new Set(templates.map((t) => `${templateKeyPrefix}${t.filename}`))

  return {
    name,
    enforce: 'pre',
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
