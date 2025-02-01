import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/',
  ],
  declaration: true,
  externals: [
    '@byyuurin/ui-kit',
    '@nuxt/kit',
    'vue',
    'unocss',
  ],
})
