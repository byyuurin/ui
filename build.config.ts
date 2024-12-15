import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      builder: 'copy',
      input: './src/components/',
      outDir: './dist/components/',
    },
    './src/',
  ],
  declaration: true,
  clean: true,
  externals: [
    '@byyuurin/ui-kit',
    '@nuxt/kit',
    'vue',
  ],
})
