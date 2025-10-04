import { defineConfig, presetWind4 } from 'unocss'
import ui from './.nuxt/uno-preset'

export default defineConfig({
  presets: [
    presetWind4(),
    ui(),
  ],
})
