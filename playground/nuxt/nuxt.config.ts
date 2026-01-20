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
  },
})
