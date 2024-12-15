import byyuurin from '@byyuurin/eslint-config'

export default byyuurin({
  unocss: false,
  typescript: true,
  vue: {
    overrides: {
      'import/first': 'off',
    },
  },
  formatters: {
    prettierOptions: {
      singleQuote: false,
    },
  },
})
