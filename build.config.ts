import { defineBuildConfig } from 'unbuild'

// https://github.com/wobsoriano/vue-sfc-unbuild/blob/main/build.config.ts
export default defineBuildConfig({
  entries: [
    'src/unplugin',
    'src/vite',
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
