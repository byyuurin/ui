import { resolve } from 'node:path'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import UI from '../../src/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    Inspect(),
    UnoCSS(),
    Vue(),
    UI({
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
