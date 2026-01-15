import byyuurin from '@byyuurin/eslint-config'
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default byyuurin(
  {
    unocss: false,
    javascript: {
      overrides: {
        'no-console': ['error', { allow: ['trace'] }],
      },
    },
    vue: {
      overrides: {
        'vue/block-tag-newline': ['warn', { blocks: { script: { maxEmptyLines: 1 } } }],

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
      'playground/vue/tsconfig.json',
      'playground/vue/tsconfig.*.json',
    ],
    rules: {
      'jsonc/sort-keys': 'off',
    },
  },
  {
    files: [
      'src/runtime/components/Calendar.vue',
      'src/runtime/components/ContextMenuContent.vue',
      'src/runtime/components/DropdownMenuContent.vue',
      'src/runtime/components/Popover.vue',
    ],
    rules: {
      'vue/component-name-in-template-casing': 'off',
    },
  },
  {
    files: [
      'src/runtime/components/Checkbox.vue',
      'src/runtime/components/CheckboxGroup.vue',
      'src/runtime/components/Drawer.vue',
      'src/runtime/components/Modal.vue',
      'src/runtime/components/Select.vue',
      'src/runtime/components/Tree.vue',
      'src/runtime/vue/components/Link.vue',
    ],
    rules: {
      'vue/no-template-shadow': 'off',
    },
  },
  {
    files: [
      'src/runtime/components/Form.vue',
    ],
    rules: {
      'unicorn/no-object-as-default-parameter': 'off',
      'style/padding-line-between-statements': 'off',
    },
  },
  {
    files: ['**/*.md/*.html'],
    rules: {
      'format/prettier': 'off',
    },
  },
)
