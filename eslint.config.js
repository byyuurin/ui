import byyuurin from '@byyuurin/eslint-config'

export default byyuurin({
  unocss: false,
  typescript: true,
  vue: true,
  formatters: {
    prettierOptions: {
      singleQuote: false,
    },
  },
})
