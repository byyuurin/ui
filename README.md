# @byyuurin/ui

A collection of Vue.js components for my projects.

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

## Preview

https://byyuurin-ui.netlify.app/

## Installation

<details>
<summary>Nuxt</summary>

### Install dependencies

```sh
pnpm i -D @unocss/nuxt
pnpm i @byyuurin/ui
```

### Nuxt setup

```ts
// nuxt.config.ts

export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@byyuurin/ui/nuxt',
  ],
  ui: {
    // prefix: 'U',
    // colorMode: true,
    // theme: {
    //   colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
    //   transitions: true,
    //   defaultVariants: {
    //     color: 'primary',
    //     size: 'md',
    //   },
    // },
  },
})
```

### UnoCSS setup

```ts
// uno.config.ts
import { createUnoPreset } from '@byyuurin/ui/unocss'
import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    createUnoPreset({
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
    }),
  ],
})
```

> [!IMPORTANT]
> The preset colors configuration must be the same as your nuxt configuration

</details>

<details>
  <summary>Vue</summary>

### Install dependencies

```sh
pnpm i -D unocss
pnpm i @byyuurin/ui
```

Create `ui.config.ts` file for unified management of UI settings:

```ts
// @unocss-include
import { setup } from '@byyuurin/ui/setup'

export default setup({
  // prefix: 'U',
  // autoImport: {
  //   dts: 'src/typed-imports.d.ts',
  //   imports: ['vue'],
  // },
  // components: {
  //   dts: 'src/typed-components.d.ts',
  // },
  // colorMode: true,
  // theme: {
  //   colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
  //   transitions: true,
  //   defaultVariants: {
  //     color: 'primary',
  //     size: 'md',
  //   },
  // },
  // ui: {
  //   colors: {
  //     primary: 'green',
  //     secondary: 'blue',
  //     success: 'green',
  //     info: 'blue',
  //     warning: 'yellow',
  //     error: 'red',
  //     neutral: 'slate',
  //   },
  //   icons: {
  //     close: 'i-lucide-x',
  //     loading: 'i-lucide-loader-circle',
  //     check: 'i-lucide-check',
  //     chevronUp: 'i-lucide-chevron-up',
  //     chevronDown: 'i-lucide-chevron-down',
  //     chevronLeft: 'i-lucide-chevron-left',
  //     chevronRight: 'i-lucide-chevron-right',
  //     chevronDoubleLeft: 'i-lucide-chevrons-left',
  //     chevronDoubleRight: 'i-lucide-chevrons-right',
  //     ellipsis: 'i-lucide-ellipsis',
  //     plus: 'i-lucide-plus',
  //     minus: 'i-lucide-minus',
  //     external: 'i-lucide-arrow-up-right',
  //   },
  // },
})
```

> [!IMPORTANT]
> Add `// @unocss-include` to add ui.config.ts to unocss scan files

> [!NOTE]
> Internally relies on custom alias to resolve the theme types. If you're using TypeScript, you should add an alias to your tsconfig to enable auto-completion in your ui.config.ts.

```jsonc
// tsconfig.node.json

{
  "compilerOptions": {
    "paths": {
      "#build/ui": [
        "./node_modules/@byyuurin/ui/.nuxt/ui"
      ]
    }
  }
}
```

### Vite setup

```ts
// vite.config.ts
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import ui from './ui.config'

export default defineConfig({
  plugins: [
    UnoCSS(),
    Vue(),
    ui.vite(),
  ],
})
```

### UnoCSS setup

```ts
// uno.config.ts
import { defineConfig, presetWind4 } from 'unocss'
import ui from './ui.config'

export default defineConfig({
  presets: [
    presetWind4(),
    ui.uno(),
  ],
})
```

### Install Vue plugin

```ts
// src/main.ts
import 'uno.css'

import ui from '@byyuurin/ui/vue-plugin'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const app = createApp(App)

const router = createRouter({
  routes: [],
  history: createWebHistory(),
})

app.use(ui)
app.use(router)

app.mount('#app')
```

</details>

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
