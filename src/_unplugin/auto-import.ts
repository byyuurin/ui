import { defu } from 'defu'
import { join } from 'pathe'
import type { UnpluginContextMeta, UnpluginOptions } from 'unplugin'
import AutoImport from 'unplugin-auto-import'
import type { Options as AutoImportOptions } from 'unplugin-auto-import/types'
import { runtimeDir } from '../shared'
import type { UIOptions } from '../unplugin'

/** This plugin adds all the UI composables as auto-imports. */
// ref: https://github.com/nuxt/ui/blob/6c20f8a9ea03273a795c5f88c071830decd54c1e/src/plugins/auto-import.ts
export default function AutoImportPlugin(options: UIOptions, meta: UnpluginContextMeta): UnpluginOptions {
  const pluginOptions = defu(options.autoImport, <AutoImportOptions>{
    dts: options.dts ?? true,
    dirs: [join(runtimeDir, 'composables')],
  })

  return AutoImport.raw(pluginOptions, meta) as UnpluginOptions
}
