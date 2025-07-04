import { defineConfig, presetIcons, presetWind3, transformerDirectives } from 'unocss'
import { preset as ui } from './src/unocss'

export default defineConfig({
  presets: [
    presetWind3(),
    presetIcons({
      cdn: 'https://esm.sh/',
    }),
    ui(),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
