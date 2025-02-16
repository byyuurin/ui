import byyuurin from '@byyuurin/eslint-config'

export default byyuurin(
  {
    unocss: false,
    typescript: true,
    vue: {
      overrides: {
        'import/first': 'off',
        'ts/no-empty-object-type': 'off',
        'ts/no-redeclare': 'off',
      },
    },
    formatters: {
      prettierOptions: {
        singleQuote: false,
      },
    },
  },
  {
    files: ['src/runtime/components/Popover.vue'],
    rules: {
      'vue/component-name-in-template-casing': 'off',
    },
  },
)
