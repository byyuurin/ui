<script setup lang="ts">
import { parseCssColor } from '@unocss/preset-mini/utils'
import type { PresetOptions } from '../../src/unocss-preset'
import { cssVarsPrefix } from '../../src/unocss-preset'

interface ThemeConfig extends PresetOptions {
  name: string
  colorScheme: 'light' | 'dark'
  fontFamily?: string
}

function defineThemeOptions(options: ThemeConfig[]) {
  return options.map((option) => ({
    fontFamily: undefined,
    radius: option.radius ?? '0rem',
    radiusButton: option.radius ?? '0rem',
    radiusBox: option.radius ?? '0rem',
    cb: '#1f2937',
    c1: '#ffffff',
    c2: '#f2f2f2',
    c3: '#e5e6e6',
    ...option,
  }))
}

const themeOptions = defineThemeOptions([
  {
    name: 'light',
    colorScheme: 'light',
    cb: cssVar('#1f2937'),
    c1: cssVar('#ffffff'),
    c2: cssVar('#f2f2f2'),
    c3: cssVar('#e5e6e6'),
  },
  {
    name: 'dark',
    colorScheme: 'dark',
    cb: cssVar('#a6adbb'),
    c1: cssVar('#1d232a'),
    c2: cssVar('#191e24'),
    c3: cssVar('#15191e'),
  },
  {
    name: 'coffee',
    colorScheme: 'dark',
    radius: '0.125rem',
    cb: cssVar('#c59f60'),
    c1: cssVar('#20161f'),
    c2: cssVar('#1c131b'),
    c3: cssVar('#181017'),
  },
  {
    name: 'cyberpunk',
    colorScheme: 'light',
    fontFamily: 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
    cb: cssVar('#161402'),
    c1: cssVar('#fff248'),
    c2: cssVar('#e9dc41'),
    c3: cssVar('#d2c639'),
  },
  {
    name: 'wireframe',
    colorScheme: 'light',
    fontFamily: 'Chalkboard,comic sans ms,"sans-serif"',
    radius: '0.2rem',
    cb: cssVar('#161616'),
    c1: cssVar('#ffffff'),
    c2: cssVar('#eeeeee'),
    c3: cssVar('#dddddd'),
  },
])

const currentTheme = ref<ThemeConfig>(themeOptions[0])

onMounted(() => {
  setTheme(currentTheme.value)
})

function cssVar(color: string) {
  const data = parseCssColor(color)
  return data?.components.join(' ')
}

function resolveThemeAttrs(theme: ThemeConfig) {
  const kebabCase = (input: string) => input.replace(/([A-Z][^A-Z]*)/g, '-$1').replace(/^-/, '').toLowerCase()
  const excludes = new Set<keyof ThemeConfig | (string & {})>(['colorScheme', 'fontFamily'])

  return Object.entries(theme)
    .filter(([k]) => k !== 'name')
    .map(([k, v]) => [
      excludes.has(k) ? kebabCase(k) : `--${cssVarsPrefix}-${kebabCase(k)}`,
      v || '',
    ])
}

function setTheme(theme: ThemeConfig) {
  const html = document.querySelector('html')!

  html.classList.toggle('bg-ui-c1', true)
  html.classList.toggle('transition', true)

  const attrs = resolveThemeAttrs(theme)
  attrs.forEach(([k, v]) => html.style.setProperty(k, v))
  currentTheme.value = theme
}
</script>

<template>
  <DemoBlock title="Theme">
    <div class="flex gap-4 flex-wrap font-sans">
      <div
        v-for="theme in themeOptions"
        :key="theme.name"
        class="self-start border-ui-cb/20 hover:border-ui-cb/40 overflow-hidden rounded border outline outline-2 outline-offset-2 outline-transparent select-none bg-ui-c1 transition"
        :class="{ 'cursor-pointer': theme.name !== currentTheme.name }"
        :style="Object.fromEntries(resolveThemeAttrs(theme))"
        @click="setTheme(theme)"
      >
        <div class="bg-ui-c1 text-ui-cb w-full">
          <div class="grid grid-cols-5 grid-rows-3">
            <div class="bg-ui-c2 col-start-1 row-span-2 row-start-1"></div>
            <div class="bg-ui-c3 col-start-1 row-start-3"></div>
            <div class="bg-ui-c1 col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 p-2">
              <div class="font-bold">
                {{ theme.name }}
              </div>
              <div class="flex flex-wrap gap-1">
                <div class="ui-content-light bg-ui-fill/80 flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                  <div class="color-ui-content text-sm font-bold">
                    A
                  </div>
                </div>
                <div class="ui-red-600 ui-content-light bg-ui-fill/80 flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                  <div class="color-ui-content text-sm font-bold">
                    A
                  </div>
                </div>
                <div class="ui-green-600 ui-content-light bg-ui-fill/80 flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                  <div class="color-ui-content text-sm font-bold">
                    A
                  </div>
                </div>
                <div class="ui-blue-600 ui-content-light bg-ui-fill/80 flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                  <div class="color-ui-content text-sm font-bold">
                    A
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DemoBlock>
</template>
