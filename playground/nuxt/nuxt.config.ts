import { resolve } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@byyuurin/ui',
  ],

  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

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
  },
})
