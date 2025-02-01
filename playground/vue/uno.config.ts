import { defineConfig, presetIcons, presetUno, transformerDirectives } from 'unocss'
import ui from '../../src/unocss-preset'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      cdn: 'https://esm.sh/',
    }),
    ui({
      radius: '0.125rem',
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
