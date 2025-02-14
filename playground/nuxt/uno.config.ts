import { defineConfig } from 'unocss'
import config from '../../uno.config'

export default defineConfig({
  ...config,
  configDeps: [
    '../../uno.config',
  ],
})
