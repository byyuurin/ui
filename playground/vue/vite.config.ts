import { resolve } from 'node:path'
import ui from '@byyuurin/ui/vite'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import uiConfig from './ui.config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    Inspect(),
    UnoCSS(),
    VueRouter({
      dts: 'src/typed-routes.d.ts',
    }),
    Vue(),
    ui(uiConfig.vite),
  ],
  resolve: {
    alias: {
      '@byyuurin/ui/unocss': resolve(__dirname, '../../src/unocss.ts'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          unocss: [
            '@unocss/core',
            '@unocss/preset-wind4',
          ],
          libs: [
            '@internationalized/date',
            '@tanstack/vue-table',
            'reka-ui',
            'reka-ui/namespaced',
            'embla-carousel-vue',
            'embla-carousel-autoplay',
            'embla-carousel-auto-scroll',
            'embla-carousel-auto-height',
            'embla-carousel-class-names',
            'embla-carousel-fade',
            'embla-carousel-wheel-gestures',
          ],
        },
      },
    },
  },
})
