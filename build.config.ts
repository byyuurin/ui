import { defineBuildConfig } from 'unbuild'

// https://github.com/wobsoriano/vue-sfc-unbuild/blob/main/build.config.ts
export default defineBuildConfig({
  entries: [
    { builder: 'mkdist', input: './src', pattern: ['**/*.vue'], loaders: ['vue'] },
    { builder: 'mkdist', input: './src', pattern: ['index.ts', 'runtime/**/*.ts'], format: 'esm', loaders: ['js'], ext: 'mjs' },
    'src/nuxt.ts',
    'src/resolver.ts',
    'src/unocss-preset.ts',
  ],
  declaration: true,
  externals: [
    '@nuxt/kit',
    '@nuxt/schema',
    '@unocss/core',
    '@unocss/preset-mini',
    'unocss',
    '@vueuse/core',
    'vue',
    'unplugin-vue-components',
  ],
})
