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
pnpm i @byyuurin/ui
```

## UnoCSS

```ts
// uno.config.ts
import ui from '@byyuurin/ui/unocss-preset'
import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    ui(),
  ],
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        /\/(?:theme).*\.(ts|m?js)($|\?)/,
      ],
    },
  },
})
```

## Credits

- [UnoCSS](https://github.com/unocss/unocss)
- [daisyui](https://github.com/saadeghi/daisyui)
- [@nuxt/ui](https://github.com/nuxt/ui)

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
