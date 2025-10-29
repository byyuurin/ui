import { createUnoPreset } from '@byyuurin/ui/unocss'
import { defineConfig, presetWind4, transformerDirectives, transformerVariantGroup } from 'unocss'
import uiConfig from './ui.config'

export default defineConfig({
  mergeSelectors: false,
  presets: [
    presetWind4(),
    createUnoPreset(uiConfig.uno),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
