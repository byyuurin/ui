import { resolve } from 'node:path'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import UI from '../../src/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    Inspect(),
    UnoCSS(),
    VueRouter({
      dts: 'src/typed-routes.d.ts',
    }),
    Vue(),
    UI({
      autoImport: {
        dts: 'src/typed-imports.d.ts',
        imports: ['vue', 'vue-router'],
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
      '@byyuurin/ui/unocss': resolve(__dirname, '../../src/unocss.ts'),
      '@byyuurin/ui/locale': resolve(__dirname, '../../src/runtime/locale/index.ts'),
      '@byyuurin/ui': resolve(__dirname, '../../src/runtime/index.ts'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          unocss: ['@unocss/core', '@unocss/preset-mini', '@unocss/preset-uno'],
          libs: ['reka-ui'],
          ui: ['@byyuurin/ui'],
        },
      },
    },
  },
})
