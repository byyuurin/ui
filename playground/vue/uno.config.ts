import { defineConfig, presetWind4, transformerDirectives, transformerVariantGroup } from 'unocss'
import ui from './ui.config'

export default defineConfig({
  mergeSelectors: false,
  presets: [
    presetWind4(),
    ui.uno(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
