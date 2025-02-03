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
        '../_components',
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
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          '@byyuurin/ui': ['@byyuurin/ui'],
        },
      },
    },
  },
})
