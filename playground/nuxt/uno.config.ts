import { defineConfig, presetWind4, transformerDirectives, transformerVariantGroup } from 'unocss'
import { createUnoPreset } from '../../src/unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    createUnoPreset(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
