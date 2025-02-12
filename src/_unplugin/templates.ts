import type { NuxtTemplate } from '@nuxt/schema'
import type { UnpluginOptions } from 'unplugin'
import type { UIOptions } from '../unplugin'

/**
 * This plugin is responsible for getting the generated virtual templates and
 * making them available to the Vue build.
 */
export default function TemplatePlugin(_options: UIOptions, _appConfig: Record<string, any>): UnpluginOptions {
  const resolveKeyPrefix = 'virtual:byyuurin-ui-templates/'
  const templateKeyPrefix = '#build/'

  const templates: NuxtTemplate[] = []
  const templateKeys = new Set(templates.map((t) => `${templateKeyPrefix}${t.filename}`))

  const name = 'byyuurin:ui:templates'
  return {
    name,
    enforce: 'pre',
    resolveId(id) {
      if (templateKeys.has(`${id}.ts`))
        return `${id.replace(templateKeyPrefix, resolveKeyPrefix)}.ts`
    },
    loadInclude(id) {
      return templateKeys.has(id.replace(resolveKeyPrefix, templateKeyPrefix))
    },
    load(id) {
      const templateID = id.replace(resolveKeyPrefix, templateKeyPrefix)
      return templates.find((t) => `${templateKeyPrefix}${t.filename}` === templateID)!.getContents!({} as any)
    },
  }
}
