# @byyuurin/ui

A collection of Vue.js components for my projects.

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

## Preview

https://byyuurin-ui.netlify.app/

## Installation

```ssh
pnpm i -D unocss @unocss/reset @byyuurin/ui
```

icons

```ssh
pnpm i -D @iconify-json/[the-collection-you-want]
```

## Setup

### UnoCSS

```ts
// uno.config.ts
import ui from '@byyuurin/ui/unocss-preset'
import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      cdn: 'https://esm.sh/', // OR install @iconify-json/[the-collection-you-want]
    }),
    ui({
      radius: '0rem', // optional
      radiusBox: '0rem', // optional
      radiusButton: '0rem', // optional
      radiusTabs: '0rem', // optional
      cb: '#1f2937', // optional
      c1: '#ffffff', // optional
      c2: '#f2f2f2', // optional
      c3: '#e5e6e6', // optional
    }),
  ],
})
```

### Vite

```ts
// vite.config.ts

import UI from '@byyuurin/ui/vite'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'

export default defineConfig({
  plugins: [
    UnoCSS(),
    Vue(),
    UI({
      prefix: 'U', // optional
      autoImport: {
        dts: 'src/typed-imports.d.ts',
        imports: ['vue'],
      },
      components: {
        dts: 'src/typed-components.d.ts',
      },
    }),
  ],
})
```

### Nuxt

```ts
// nuxt.config.ts

export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@byyuurin/ui/nuxt',
  ],
  css: [
    '@unocss/reset/tailwind.css',
  ],
  ui: {
    prefix: 'U', // optional
  },
})
```

## Credits

- [UnoCSS](https://github.com/unocss/unocss)
- [daisyui](https://github.com/saadeghi/daisyui)
- [@nuxt/ui](https://github.com/nuxt/ui)
- [Reka UI](https://github.com/unovue/radix-vue)
- [VueUse](https://github.com/vueuse/vueuse)

## License

[MIT](./LICENSE) License © 2024-PRESENT [Yuurin](https://github.com/byyurin)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@byyuurin/ui?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@byyuurin/ui
[npm-downloads-src]: https://img.shields.io/npm/dm/@byyuurin/ui?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/@byyuurin/ui
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@byyuurin/ui?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=@byyuurin/ui
[license-src]: https://img.shields.io/github/license/byyuurin/@byyuurin/ui.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/byyuurin/@byyuurin/ui/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/@byyuurin/ui
