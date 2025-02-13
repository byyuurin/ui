import { defineBuildConfig } from 'unbuild'

// https://github.com/wobsoriano/vue-sfc-unbuild/blob/main/build.config.ts
export default defineBuildConfig({
  entries: [
    { builder: 'mkdist', input: './src', pattern: ['**/*.vue'], loaders: ['vue'] },
    { builder: 'mkdist', input: './src', pattern: ['index.ts', 'runtime/**/*.ts'], format: 'esm', loaders: ['js'], ext: 'mjs' },
    'src/unplugin',
    'src/vite',
    'src/nuxt',
    'src/unocss-preset',
  ],
  clean: true,
  declaration: true,
  sourcemap: true,
  externals: [
    '@nuxt/kit',
    '@nuxt/schema',
    '@unocss/core',
    '@unocss/preset-mini',
    '@unocss/preset-uno',
    'unocss',
    '@vueuse/core',
    'vue',
    'vite',
  ],
})
