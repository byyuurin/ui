import { setup } from '@byyuurin/ui/setup'

export default setup({
  autoImport: {
    dts: 'src/typed-imports.d.ts',
    imports: ['vue', 'vue-router'],
  },
  components: {
    dts: 'src/typed-components.d.ts',
    dirs: [
      'src/components',
      '../nuxt/app/components',
    ],
  },
})
