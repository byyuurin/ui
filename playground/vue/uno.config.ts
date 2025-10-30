import { createUnoPreset } from '@byyuurin/ui/unocss'
import { defineConfig, presetWebFonts, presetWind4, transformerDirectives, transformerVariantGroup } from 'unocss'
import uiConfig from './ui.config'

export default defineConfig({
  mergeSelectors: false,
  presets: [
    presetWind4(),
    createUnoPreset(uiConfig.uno),
    presetWebFonts({
      fonts: {
        sans: { provider: 'google', name: 'Public Sans', weights: [400, 500, 600, 700] },
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
