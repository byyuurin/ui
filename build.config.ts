import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/unplugin',
    './src/vite',
    './src/unocss',
    './src/setup',
  ],
  rollup: {
    replace: {
      values: {
        // Used in development to import directly from theme
        'process.argv.includes(\'--uiDev\')': 'false',
      },
    },
  },
  hooks: {
    'mkdist:entry:options': function (ctx, entry, options) {
      options.addRelativeDeclarationExtensions = false
    },
  },
  externals: [
    '#build/ui',
    'unconfig',
    'vite',
    '@unocss/config',
    '@unocss/core',
    '@unocss/preset-wind4',
    '@unocss/preset-wind4/colors',
    '@unocss/preset-wind4/utils',
    '@unocss/rule-utils',
  ],
})
