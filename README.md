# @byyuurin/ui

A collection of Vue.js components for my projects.

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
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
import { preset as ui } from '@byyuurin/ui/unocss'
import { defineConfig, presetIcons, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
    presetIcons({
      cdn: 'https://esm.sh/', // OR install @iconify-json/[the-collection-you-want]
    }),
    ui({
      radius: '0rem', // optional
      radiusBox: '0rem', // optional
      radiusButton: '0rem', // optional
      radiusCheckbox: '0rem', // optional
      radiusRadio: '0rem', // optional
      radiusSwitch: '0rem', // optional
      radiusTabs: '0rem', // optional
      cb: '#1f2937', // optional
      cp: '#1f2937', // optional
      cx: '#ffffff', // optional
    }),
  ],
})
```

New Rules

- `ui-[color]`
- `bg-soft-[color]`
- `bg-soft-[color]/[mix-ratio]`

### Vite

```ts
// vite.config.ts

import UI from '@byyuurin/ui/vite'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

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

[MIT](./LICENSE) License © 2024-PRESENT [Yuurin](https://github.com/byyuurin)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@byyuurin/ui?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@byyuurin/ui
[npm-downloads-src]: https://img.shields.io/npm/dm/@byyuurin/ui?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/@byyuurin/ui
[license-src]: https://img.shields.io/github/license/byyuurin/ui.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/byyuurin/ui/blob/main/LICENSE
