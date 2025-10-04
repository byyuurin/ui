import { defineConfig, presetWind4 } from 'unocss'
import { createUnoPreset } from './src/unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    createUnoPreset(),
  ],
})
