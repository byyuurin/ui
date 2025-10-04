// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '../../src/module',
    'compodium',
  ],
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-01',
  compodium: {
    dir: 'app/compodium',
    exclude: [
      'Example*.vue',
      'Placeholder.vue',
      'ThemeSelector.vue',
      '*App.vue',
      '*Toast.vue',
      '*Provider.vue',
      '*Content.vue',
    ],
  },
})
