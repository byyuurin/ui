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
  optimizeDeps: {
    // prevents reloading page when navigating between components
    include: [
      '@vue/shared',
      '@vueuse/core',
      '@unhead/vue',
      '@unhead/vue/client',
      '@tanstack/vue-table',
      '@tanstack/vue-virtual',
      'reka-ui',
      'reka-ui/namespaced',
      'embla-carousel-vue',
      'embla-carousel-autoplay',
      'embla-carousel-auto-scroll',
      'embla-carousel-auto-height',
      'embla-carousel-class-names',
      'embla-carousel-fade',
      'embla-carousel-wheel-gestures',
      '@byyuurin/ui-kit',
      '@byyuurin/uno-merge',
      '@unocss/core',
      '@unocss/preset-wind4',
      '@unocss/preset-wind4/colors',
      '@unocss/preset-wind4/utils',
      'ufo',
      'zod',
      'scule',
      'defu',
      'ohash/utils',
      'ohash',
      '@iconify/vue',
    ],
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
