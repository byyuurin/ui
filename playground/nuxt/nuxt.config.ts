import { resolve } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@unocss/nuxt',
    '../../src/nuxt',
  ],
  css: [
    '@unocss/reset/tailwind.css',
  ],
  vite: {
    resolve: {
      alias: {
        '@byyuurin/ui': resolve(__dirname, '../../src'),
      },
    },
  },
})
