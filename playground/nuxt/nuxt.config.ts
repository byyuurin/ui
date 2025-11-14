import { resolve } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '../../src/module',
  ],

  devtools: { enabled: true },

  compatibilityDate: '2024-11-01',

  vite: {
    resolve: {
      alias: {
        '@byyuurin/ui/unocss': resolve(__dirname, '../../src/unocss.ts'),
      },
    },
    optimizeDeps: {
      // prevents reloading page when navigating between components
      include: [
        '@vue/shared',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@vueuse/core',
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
        'unocss',
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
      ],
    },
  },
})
