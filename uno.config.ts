import { defineConfig, presetIcons, presetUno, transformerDirectives } from 'unocss'
import { preset as ui } from './src/unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      cdn: 'https://esm.sh/',
    }),
    ui(),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
