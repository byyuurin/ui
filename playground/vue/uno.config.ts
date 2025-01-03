import ui from '@byyuurin/ui/unocss-preset'
import { defineConfig, presetUno, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    ui({
      radius: '2px',
    }),
  ],
  transformers: [
    transformerDirectives(),
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
