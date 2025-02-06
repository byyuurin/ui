import { defineBuildConfig } from 'unbuild'

// https://github.com/wobsoriano/vue-sfc-unbuild/blob/main/build.config.ts
export default defineBuildConfig({
  entries: [
    { builder: 'copy', input: './src/runtime', outDir: './dist/runtime' },
    { builder: 'mkdist', input: './src', pattern: ['index.ts'], format: 'esm', loaders: ['js'], ext: 'mjs' },
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
