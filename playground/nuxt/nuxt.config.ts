import { resolve } from 'node:path'
import uiModule from '../../src/nuxt'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@unocss/nuxt',
    uiModule,
  ],
  css: [
    '@unocss/reset/tailwind.css',
  ],
  vite: {
    resolve: {
      alias: {
        '@byyuurin/ui': resolve(__dirname, '../../src'),
        '@byyuurin/unocss-preset': resolve(__dirname, '../../src/unocss-preset.ts'),
      },
    },
  },
})
