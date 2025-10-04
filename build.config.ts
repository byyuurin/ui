import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/unplugin',
    './src/vite',
    './src/unocss',
    './src/config',
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
    '@unocss/core',
    '@unocss/config',
    'vite',
  ],
})
