import { defineBuildConfig } from 'unbuild'

// https://github.com/wobsoriano/vue-sfc-unbuild/blob/main/build.config.ts
export default defineBuildConfig({
  entries: [
    { builder: 'mkdist', input: './src', pattern: ['**/*.vue'], loaders: ['vue'] },
    { builder: 'mkdist', input: './src', pattern: ['index.ts', 'runtime/**/*.ts'], format: 'esm', loaders: ['js'], ext: 'mjs' },
    'src/unplugin',
    'src/vite',
    'src/nuxt',
    'src/unocss',
  ],
  clean: true,
  declaration: true,
  sourcemap: true,
  externals: [
    '@nuxt/schema',
    'vue',
    'vite',
  ],
})
