import { defineConfig, presetWind4, transformerDirectives } from 'unocss'
import { createUnoPreset } from '../../src/unocss'

export default defineConfig({
  outputToCssLayers: true,
  presets: [
    presetWind4(),
    createUnoPreset(),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
