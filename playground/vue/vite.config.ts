import { resolve } from 'node:path'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import uiPlugin from '../../src/unplugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    Inspect(),
    UnoCSS(),
    Vue(),
    uiPlugin.vite({
      autoImport: {
        dts: 'src/typed-imports.d.ts',
        imports: ['vue'],
      },
      components: {
        dts: 'src/typed-components.d.ts',
        dirs: [
          'src/components',
          '../nuxt/app/components',
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@byyuurin/ui': resolve(__dirname, '../../src'),
      '@byyuurin/unocss-preset': resolve(__dirname, '../../src/unocss-preset.ts'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          unocss: ['@unocss/core', '@unocss/preset-mini', '@unocss/preset-uno'],
          libs: ['reka-ui', 'vaul-vue'],
          ui: ['@byyuurin/ui'],
        },
      },
    },
  },
})
