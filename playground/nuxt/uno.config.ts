import { defineConfig, presetWind4, transformerDirectives, transformerVariantGroup } from 'unocss'
import ui from './.nuxt/uno-preset'

export default defineConfig({
  presets: [
    presetWind4(),
    ui(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
