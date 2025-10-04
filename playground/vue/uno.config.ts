import { defineConfig, presetWind4 } from 'unocss'
import ui from './ui.config'

export default defineConfig({
  presets: [
    presetWind4(),
    ui.uno(),
  ],
})
