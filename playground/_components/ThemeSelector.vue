<script setup lang="ts">
import { Button } from '@byyuurin/ui'
import { parseCssColor } from '@unocss/preset-mini/utils'
import type { PresetOptions } from '../../src/unocss-preset'
import { cssVarsPrefix } from '../../src/unocss-preset'

const emit = defineEmits<{
  (event: 'color', color: string): void
}>()

interface ThemeConfig<T extends string = string> extends PresetOptions {
  name: T
  colorScheme: 'light' | 'dark'
  fontFamily?: string
}

function defineThemeOptions<T extends string>(options: ThemeConfig<T>[]) {
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
    radiusBox: '0.5rem',
    cb: cssVar('#161616'),
    c1: cssVar('#ffffff'),
    c2: cssVar('#eeeeee'),
    c3: cssVar('#dddddd'),
  },
])

const currentColor = ref('')
const currentTheme = ref<ThemeConfig>(themeOptions.find((i) => i.name === 'wireframe')!)

const sampleColors = ['', 'ui-rose', 'ui-pink', 'ui-fuchsia', 'ui-purple', 'ui-violet', 'ui-indigo', 'ui-blue', 'ui-sky', 'ui-cyan', 'ui-teal', 'ui-emerald', 'ui-green', 'ui-lime', 'ui-yellow', 'ui-amber', 'ui-orange', 'ui-red', 'ui-gray', 'ui-slate', 'ui-zinc', 'ui-neutral', 'ui-stone']

onMounted(() => {
  setTheme(currentTheme.value, true)
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

function setColor(color = '') {
  currentColor.value = color
  emit('color', color)
}

function setTheme(theme: ThemeConfig, force = false) {
  if (!force && currentTheme.value.name === theme.name)
    return

  const html = document.querySelector('html')!

  html.classList.toggle('bg-ui-c1', true)
  html.classList.toggle('transition', true)

  const attrs = resolveThemeAttrs(theme)
  attrs.forEach(([k, v]) => html.style.setProperty(k, v))
  currentTheme.value = theme
}
</script>

<template>
  <div class="flex gap-4 flex-wrap font-sans">
    <div class="w-full flex flex-wrap items-start gap-2">
      <div v-for="color in sampleColors" :key="color" class="flex aspect-square items-center justify-center rounded">
        <Button
          class="color-light font-bold"
          :class="[color, { 'ring-2 ring-ui-cb/80 ring-offset-2 ring-offset-ui-c1': color === currentColor }]"
          size="xl"
          label="A"
          @click="setColor(color)"
        />
      </div>
    </div>
    <div
      v-for="theme in themeOptions"
      :key="theme.name"
      class="self-end border-ui-cb/20 hover:border-ui-cb/40 overflow-hidden rounded border outline outline-2 outline-offset-2 outline-transparent select-none bg-ui-c1 transition"
      :class=" theme.name === currentTheme.name ? 'ring-3 ring-ui-cb/80 ring-offset-3 ring-offset-ui-c1' : 'cursor-pointer'"
      :style="Object.fromEntries(resolveThemeAttrs(theme))"
      @click="setTheme(theme)"
    >
      <div class="bg-ui-c1 text-ui-cb w-full" :class="{ 'pointer-events-none': theme.name !== currentTheme.name }">
        <div class="min-w-35 grid grid-cols-4 grid-rows-3">
          <div class="bg-ui-c2 col-start-1 row-span-2 row-start-1"></div>
          <div class="bg-ui-c3 col-start-1 row-start-3"></div>
          <div class="bg-ui-c1 col-span-3 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 p-2">
            <div class="text-xl font-bold">
              {{ theme.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
