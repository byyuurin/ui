import { resolve } from 'node:path'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import UI from './src/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS(),
    Vue(),
    UI({
      dts: false,
      autoImport: {
        imports: ['vue'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@byyuurin/ui': resolve(__dirname, './src'),
      '@byyuurin/unocss-preset': resolve(__dirname, './src/unocss-preset.ts'),
    },
  },
})
