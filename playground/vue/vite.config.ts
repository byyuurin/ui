import UIResolver from '@byyuurin/ui/resolver'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueComponents from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS(),
    Vue(),
    VueComponents({
      dts: 'src/typed-components.d.ts',
      resolvers: [
        UIResolver({
          prefix: 'U',
        }),
      ],
    }),
    AutoImport({
      dts: 'src/typed-imports.d.ts',
      imports: ['vue'],
    }),
  ],
})
