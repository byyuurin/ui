import { resolve } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@unocss/nuxt',
    '../../src/module',
  ],
  devtools: { enabled: true },
  css: [
    '@unocss/reset/tailwind.css',
  ],
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-01',
  vite: {
    resolve: {
      alias: {
        '@byyuurin/ui/unocss': resolve(__dirname, '../../src/unocss.ts'),
        '@byyuurin/ui': resolve(__dirname, '../../src/runtime/index.ts'),
      },
    },
  },
})
