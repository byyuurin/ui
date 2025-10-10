import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import ui from './ui.config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    Inspect(),
    UnoCSS(),
    VueRouter({
      dts: 'src/typed-routes.d.ts',
    }),
    Vue(),
    ui.vite({
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
  optimizeDeps: {
    // prevents reloading page when navigating between components
    include: [
      '@internationalized/date',
      '@vueuse/shared',
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
      '@unocss/preset-wind4/colors',
      '@byyuurin/ui-kit',
      'ufo',
      'zod',
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
