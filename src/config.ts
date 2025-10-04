import type { PresetOptions } from './unocss'
import { createUnoPreset } from './unocss'
import type { UIOptions } from './vite'
import vite from './vite'

export function createUIConfig(defaults: UIOptions = {}) {
  return {
    uno: (options?: PresetOptions) => createUnoPreset(options ?? defaults.theme),
    vite: (options?: UIOptions) => vite(options ?? defaults),
  }
}
