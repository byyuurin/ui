import { defineConfig } from 'unocss'
import config from '../vue/uno.config'

export default defineConfig({
  ...config,
  configDeps: [
    '../vue/uno.config',
  ],
})
