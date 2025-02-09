import { defu } from 'defu'
import { join } from 'pathe'
import type { UnpluginContextMeta, UnpluginOptions } from 'unplugin'
import AutoImport from 'unplugin-auto-import'
import type { Options as AutoImportOptions } from 'unplugin-auto-import/types'
import { runtimeDir } from '../internal/shared'
import type { UIOptions } from '../unplugin'

/** This plugin adds all the UI composables as auto-imports. */
export default function AutoImportPlugin(options: UIOptions, meta: UnpluginContextMeta): UnpluginOptions {
  const pluginOptions = defu(options.autoImport, <AutoImportOptions>{
    dts: options.dts ?? true,
    dirs: [join(runtimeDir, 'composables')],
  })

  return AutoImport.raw(pluginOptions, meta) as UnpluginOptions
}
