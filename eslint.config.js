import byyuurin from '@byyuurin/eslint-config'
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default byyuurin(
  {
    unocss: false,
    vue: {
      overrides: {
        'ts/no-empty-object-type': 'off',
        'vue/no-extra-parens': 'off',
        'unicorn/explicit-length-check': 'off',
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
    files: [
      'src/runtime/components/Calendar.vue',
      'src/runtime/components/DropdownMenuContent.vue',
      'src/runtime/components/Popover.vue',
    ],
    rules: {
      'vue/component-name-in-template-casing': 'off',
    },
  },
)
