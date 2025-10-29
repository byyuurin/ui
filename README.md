# @byyuurin/ui

A collection of Vue.js components for my projects.

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

## Preview

https://byyuurin-ui.netlify.app/

## Installation

```bash [pnpm]
pnpm add @byyuurin/ui
```

```bash [yarn]
yarn add @byyuurin/ui
```

```bash [npm]
npm install @byyuurin/ui
```

> [!WARNING]
> If you're using pnpm, ensure that you either set [`shamefully-hoist=true`](https://pnpm.io/settings#shamefully-hoist) in your `.npmrc` file or install `@byyuurin/ui-kit` in your project's root directory.

### Nuxt

1. Add the UI module in your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: [
    '@byyuurin/ui',
  ],

  ui: {
    prefix: 'U',
    colorMode: true,
    theme: {
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
      transitions: true,
      defaultVariants: {
        color: 'primary',
        size: 'md',
      },
    },
  },
})
```

2. Add UnoCSS preset in your `uno.config.ts`:

```ts
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

### Vue

1. Create `ui.config.ts` file for unified management of UI settings:

```ts
// @unocss-include
import { setup } from '@byyuurin/ui/setup'

export default setup({
  prefix: 'U',
  autoImport: {
    // ... unplugin-auto-import options
  },
  components: {
    // ... unplugin-vue-components options
  },
  colorMode: true,
  theme: {
    colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
    transitions: true,
    defaultVariants: {
      color: 'primary',
      size: 'md',
    },
  },
  ui: {
    colors: {
      primary: 'green',
      secondary: 'blue',
      success: 'green',
      info: 'blue',
      warning: 'yellow',
      error: 'red',
      neutral: 'slate',
    },
    icons: {
      close: 'i-lucide-x',
      loading: 'i-lucide-loader-circle',
      check: 'i-lucide-check',
      chevronUp: 'i-lucide-chevron-up',
      chevronDown: 'i-lucide-chevron-down',
      chevronLeft: 'i-lucide-chevron-left',
      chevronRight: 'i-lucide-chevron-right',
      chevronDoubleLeft: 'i-lucide-chevrons-left',
      chevronDoubleRight: 'i-lucide-chevrons-right',
      ellipsis: 'i-lucide-ellipsis',
      plus: 'i-lucide-plus',
      minus: 'i-lucide-minus',
      external: 'i-lucide-arrow-up-right',
    },
  },
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

2. Add the UI Vite plugin in your `vite.config.ts`:

```ts
import ui from '@byyuurin/ui/vite' // <---
import vue from '@vitejs/plugin-vue'
import unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import uiConfig from './ui.config' // <---

export default defineConfig({
  plugins: [
    unocss(),
    vue(),
    ui(uiConfig.vite), // <---
  ],
})
```

3. Add UnoCSS preset in your `uno.config.ts`:

```ts
import { createUnoPreset } from '@byyuurin/ui/unocss' // <---
import { defineConfig, presetWind4 } from 'unocss'
import uiConfig from './ui.config' // <---

export default defineConfig({
  presets: [
    presetWind4(),
    createUnoPreset(uiConfig.uno), // <---
  ],
})
```

4. Add the UI Vue plugin in your `src/main.ts`

```ts
import 'uno.css'

import ui from '@byyuurin/ui/vue-plugin' // <---
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const app = createApp(App)

const router = createRouter({
  routes: [],
  history: createWebHistory(),
})

app.use(ui) // <----
app.use(router)

app.mount('#app')
```

5. Add the `isolate` class to your root container

```html
<!doctype html>
<html lang="en">
  <head>
    ...
  </head>
  <body>
    <div id="app" class="isolate"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

## Credits

- [UnoCSS](https://github.com/unocss/unocss)
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
