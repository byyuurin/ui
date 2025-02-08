import { resolve } from 'node:path'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueComponents from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import UIResolver from '../../src/resolver'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS(),
    Vue(),
    VueComponents({
      dts: 'src/typed-components.d.ts',
      dirs: [
        'src/components',
        '../nuxt/app/components',
      ],
      resolvers: [
        UIResolver({
          prefix: 'U',
        }),
      ],
    }),
    AutoImport({
      dts: 'src/typed-imports.d.ts',
      imports: ['vue'],
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
