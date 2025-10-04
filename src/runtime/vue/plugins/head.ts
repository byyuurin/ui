import { createHead } from '@unhead/vue/client'
import type { Plugin } from 'vue'

// ref: https://github.com/nuxt/ui/blob/21083bf5c11e1ba7e3fd3a5b379aae5fb2f85f16/src/runtime/vue/plugins/head.ts
export default {
  install(app) {
    // check for existing head instance to avoid replacement
    // bit hacky but we can't use injectHead() here
    if (app._context.provides.usehead)
      return

    const head = createHead()
    app.use(head)
  },
} satisfies Plugin
