import { defineConfig, presetIcons, presetUno, transformerDirectives } from 'unocss'
import ui from './src/unocss-preset'

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
