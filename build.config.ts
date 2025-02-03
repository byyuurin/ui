import { defineBuildConfig } from 'unbuild'

// https://github.com/wobsoriano/vue-sfc-unbuild/blob/main/build.config.ts
export default defineBuildConfig({
  entries: [
    { builder: 'mkdist', input: './src', pattern: ['**/*.vue'], loaders: ['vue'] },
    { builder: 'mkdist', input: './src', pattern: ['**/*.ts'], format: 'cjs', loaders: ['js'], ext: 'cjs' },
    { builder: 'mkdist', input: './src', pattern: ['**/*.ts'], format: 'esm', loaders: ['js'], ext: 'js' },
    'src/utils.ts',
    'src/nuxt.ts',
    'src/resolver.ts',
    'src/unocss-merge.ts',
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
