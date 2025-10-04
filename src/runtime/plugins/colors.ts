import type { UseHeadInput } from '@unhead/vue/types'
import { colors } from '@unocss/preset-wind4/colors'
import { computed } from 'vue'
import { defineNuxtPlugin, useAppConfig, useHead, useNuxtApp } from '#imports'

const themeShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

function getColor(color: keyof typeof colors, shade: typeof themeShades[number]) {
  if (color in colors && typeof colors[color] === 'object' && shade in colors[color])
    return colors[color][shade]

  return ''
}

function generateShades(key: string, value: string) {
  return themeShades.map((shade) => `--ui-color-${key}-${shade}: var(--colors-${value === 'neutral' ? 'tw-neutral' : value}-${shade}, ${getColor(value as keyof typeof colors, shade)});`).join('\n  ')
}

function generateColor(key: string, shade: number) {
  return `--ui-${key}: var(--ui-color-${key}-${shade});`
}

export default defineNuxtPlugin(() => {
  const appConfig = useAppConfig()
  const nuxtApp = useNuxtApp()

  const root = computed(() => {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { neutral, ...colors } = appConfig.ui.colors

    return `:root {
  ${Object.entries(appConfig.ui.colors).map(([key, value]) => generateShades(key, value)).join('\n  ')}
}
:root,
.light {
  ${Object.keys(colors).map((key) => generateColor(key, 500)).join('\n  ')}
}
.dark {
  ${Object.keys(colors).map((key) => generateColor(key, 400)).join('\n  ')}
}
`
  })

  // Head
  const headData: UseHeadInput = {
    style: [{
      innerHTML: () => root.value,
      tagPriority: -2,
      id: 'ui-colors',
    }],
  }

  // SPA mode
  if (import.meta.client && nuxtApp.isHydrating && !nuxtApp.payload.serverRendered) {
    const style = document.createElement('style')

    style.innerHTML = root.value
    style.dataset.uiColors = ''

    document.head.append(style)

    headData.script = [{
      innerHTML: 'document.head.removeChild(document.querySelector(\'[data-ui-colors]\'))',
    }]
  }

  useHead(headData)
})
