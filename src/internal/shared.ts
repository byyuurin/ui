import { fileURLToPath } from 'node:url'
import { normalize } from 'pathe'

export const packageName = '@byyuurin/ui'

export const runtimeDir = normalize(fileURLToPath(new URL('../runtime', import.meta.url)))
