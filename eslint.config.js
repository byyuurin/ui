import byyuurin from '@byyuurin/eslint-config'
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

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
  createConfigForNuxt({
    features: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
    dirs: {
      src: ['./playground/nuxt'],
    },
  }),
  {
    files: ['src/runtime/components/Popover.vue'],
    rules: {
      'vue/component-name-in-template-casing': 'off',
    },
  },
)
