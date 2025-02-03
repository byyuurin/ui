import vueComponents from 'unplugin-vue-components/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@unocss/nuxt',
    '@byyuurin/ui/nuxt',
  ],
  css: [
    '@unocss/reset/tailwind.css',
  ],
  ui: {
    prefix: 'U',
  },
  vite: {
    plugins: [
      vueComponents({
        dirs: ['../../_components'],
        dts: '../.nuxt/typed-components.d.ts',
      }),
    ],
  },
})
