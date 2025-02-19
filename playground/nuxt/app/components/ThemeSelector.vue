<script lang="ts">
import { Input, Link, Select, Tabs } from '@byyuurin/ui'
import { cssVarsPrefix } from '@byyuurin/ui/unocss'
import { parseCssColor } from '@unocss/preset-mini/utils'
import { useCloned } from '@vueuse/core'

export interface ThemeConfig<T extends string = string> extends PresetOptions {
  name: T
  colorScheme: 'light' | 'dark'
  fontFamily?: string
}

export const themeOptions = defineThemeOptions([
  {
    name: 'light',
    colorScheme: 'light',
    radius: '3px',
    radiusBox: '1rem',
    radiusButton: '0.5rem',
    cb: cssVar('#1f2937'),
    c1: cssVar('#ffffff'),
    c2: cssVar('#f2f2f2'),
    c3: cssVar('#e5e6e6'),
  },
  {
    name: 'dark',
    colorScheme: 'dark',
    radius: '3px',
    radiusBox: '1rem',
    radiusButton: '0.5rem',
    cb: cssVar('#a6adbb'),
    c1: cssVar('#1d232a'),
    c2: cssVar('#191e24'),
    c3: cssVar('#15191e'),
  },
  {
    name: 'retro',
    colorScheme: 'light',
    radius: '0.4rem',
    cb: cssVar('#282425'),
    c1: cssVar('#ece3ca'),
    c2: cssVar('#e4d8b4'),
    c3: cssVar('#dbca9a'),
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
    name: 'valentine',
    colorScheme: 'light',
    radius: '1.9rem',
    radiusBox: '1rem',
    cb: cssVar('#632c3b'),
    c1: cssVar('#fae7f4'),
    c2: cssVar('#e3d2de'),
    c3: cssVar('#cdbdc8'),
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
  {
    name: 'coffee',
    colorScheme: 'dark',
    radius: '0.2rem',
    radiusBox: '1rem',
    radiusButton: '0.5rem',
    cb: cssVar('#c59f60'),
    c1: cssVar('#20161f'),
    c2: cssVar('#1c131b'),
    c3: cssVar('#181017'),
  },
  {
    name: 'Nuxt light',
    colorScheme: 'light',
    fontFamily: '"Public Sans",sans-serif',
    radius: '0.25rem',
    radiusButton: '0.375rem',
    radiusBox: '0.5rem',
    cb: cssVar('#314158'),
    c1: cssVar('#ffffff'),
    c2: cssVar('#fcf9fa'),
    c3: cssVar('#e2e8f0'),
  },
  {
    name: 'Nuxt dark',
    colorScheme: 'dark',
    fontFamily: '"Public Sans",sans-serif',
    radius: '0.25rem',
    radiusButton: '0.375rem',
    radiusBox: '0.5rem',
    cb: cssVar('#90a1b9'),
    c1: cssVar('#0f172b'),
    c2: cssVar('#1d293d'),
    c3: cssVar('#314158'),
  },
  {
    name: 'Antfu light',
    colorScheme: 'light',
    fontFamily: 'Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"',
    radius: '0.2rem',
    cb: cssVar('#374151'),
    c1: cssVar('#ffffff'),
    c2: cssVar('#eeeeee'),
    c3: cssVar('#bbbbbb'),
  },
  {
    name: 'Antfu dark',
    colorScheme: 'dark',
    fontFamily: 'Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"',
    radius: '0.2rem',
    cb: cssVar('#e5e7eb'),
    c1: cssVar('#050505'),
    c2: cssVar('#111111'),
    c3: cssVar('#222222'),
  },
])

function defineThemeOptions<T extends string>(options: ThemeConfig<T>[]) {
  return options.map((option) => ({
    fontFamily: undefined,
    radius: option.radius ?? '0rem',
    radiusBox: option.radius ?? '0rem',
    radiusButton: option.radius ?? '0rem',
    radiusCheckbox: option.radius ?? '0rem',
    radiusRadio: option.radius ?? '0rem',
    radiusSwitch: option.radius ?? '0rem',
    radiusTabs: option.radius ?? '0rem',
    cb: '#1f2937',
    c1: '#ffffff',
    c2: '#f2f2f2',
    c3: '#e5e6e6',
    ...option,
  }))
}

function cssVar(color: string) {
  const data = parseCssColor(color)
  return data?.components.join(' ')
}

export function setTheme(theme: ThemeConfig) {
  const html = document.querySelector('html')!

  html.classList.toggle('bg-ui-c1', true)
  html.classList.toggle('transition', true)

  const attrs = resolveThemeAttrs(theme)
  attrs.forEach(([k, v]) => html.style.setProperty(k, v))
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
</script>

<script setup lang="ts">
import type { PresetOptions } from '@byyuurin/ui/unocss'

const props = withDefaults(defineProps<{
  config: ThemeConfig | null
  color?: string
}>(), {
  color: '',
})

const emit = defineEmits<{
  (event: 'update:config', config: ThemeConfig): void
  (event: 'update:color', color: string): void
}>()

const { cloned: themeCustomize } = useCloned<ThemeConfig>(() => ({
  colorScheme: 'light',
  fontFamily: '',
  radius: '0rem',
  radiusBox: '',
  radiusButton: '',
  radiusCheckbox: '',
  radiusRadio: '',
  radiusSwitch: '',
  radiusTabs: '',
  cb: '#1f2937',
  c1: '#ffffff',
  c2: '#f2f2f2',
  c3: '#e5e6e6',
  ...props.config,
  name: 'customize',
}))

const currentTheme = defineModel<typeof themeOptions[number]['name'] | 'customize'>({
  default: 'wireframe',
})

const themeItems = computed(() => [
  ...themeOptions,
  {
    ...themeCustomize.value,
    cb: cssVar(themeCustomize.value.cb!),
    c1: cssVar(themeCustomize.value.c1!),
    c2: cssVar(themeCustomize.value.c2!),
    c3: cssVar(themeCustomize.value.c3!),
  },
])

const colorGroups = [
  [''],
  ['ui-rose-50', 'ui-rose-100', 'ui-rose-200', 'ui-rose-300', 'ui-rose-400', 'ui-rose-500', 'ui-rose-600', 'ui-rose-700', 'ui-rose-800', 'ui-rose-900', 'ui-rose-950'],
  ['ui-pink-50', 'ui-pink-100', 'ui-pink-200', 'ui-pink-300', 'ui-pink-400', 'ui-pink-500', 'ui-pink-600', 'ui-pink-700', 'ui-pink-800', 'ui-pink-900', 'ui-pink-950'],
  ['ui-fuchsia-50', 'ui-fuchsia-100', 'ui-fuchsia-200', 'ui-fuchsia-300', 'ui-fuchsia-400', 'ui-fuchsia-500', 'ui-fuchsia-600', 'ui-fuchsia-700', 'ui-fuchsia-800', 'ui-fuchsia-900', 'ui-fuchsia-950'],
  ['ui-purple-50', 'ui-purple-100', 'ui-purple-200', 'ui-purple-300', 'ui-purple-400', 'ui-purple-500', 'ui-purple-600', 'ui-purple-700', 'ui-purple-800', 'ui-purple-900', 'ui-purple-950'],
  ['ui-violet-50', 'ui-violet-100', 'ui-violet-200', 'ui-violet-300', 'ui-violet-400', 'ui-violet-500', 'ui-violet-600', 'ui-violet-700', 'ui-violet-800', 'ui-violet-900', 'ui-violet-950'],
  ['ui-indigo-50', 'ui-indigo-100', 'ui-indigo-200', 'ui-indigo-300', 'ui-indigo-400', 'ui-indigo-500', 'ui-indigo-600', 'ui-indigo-700', 'ui-indigo-800', 'ui-indigo-900', 'ui-indigo-950'],
  ['ui-blue-50', 'ui-blue-100', 'ui-blue-200', 'ui-blue-300', 'ui-blue-400', 'ui-blue-500', 'ui-blue-600', 'ui-blue-700', 'ui-blue-800', 'ui-blue-900', 'ui-blue-950'],
  ['ui-sky-50', 'ui-sky-100', 'ui-sky-200', 'ui-sky-300', 'ui-sky-400', 'ui-sky-500', 'ui-sky-600', 'ui-sky-700', 'ui-sky-800', 'ui-sky-900', 'ui-sky-950'],
  ['ui-cyan-50', 'ui-cyan-100', 'ui-cyan-200', 'ui-cyan-300', 'ui-cyan-400', 'ui-cyan-500', 'ui-cyan-600', 'ui-cyan-700', 'ui-cyan-800', 'ui-cyan-900', 'ui-cyan-950'],
  ['ui-teal-50', 'ui-teal-100', 'ui-teal-200', 'ui-teal-300', 'ui-teal-400', 'ui-teal-500', 'ui-teal-600', 'ui-teal-700', 'ui-teal-800', 'ui-teal-900', 'ui-teal-950'],
  ['ui-emerald-50', 'ui-emerald-100', 'ui-emerald-200', 'ui-emerald-300', 'ui-emerald-400', 'ui-emerald-500', 'ui-emerald-600', 'ui-emerald-700', 'ui-emerald-800', 'ui-emerald-900', 'ui-emerald-950'],
  ['ui-green-50', 'ui-green-100', 'ui-green-200', 'ui-green-300', 'ui-green-400', 'ui-green-500', 'ui-green-600', 'ui-green-700', 'ui-green-800', 'ui-green-900', 'ui-green-950'],
  ['ui-lime-50', 'ui-lime-100', 'ui-lime-200', 'ui-lime-300', 'ui-lime-400', 'ui-lime-500', 'ui-lime-600', 'ui-lime-700', 'ui-lime-800', 'ui-lime-900', 'ui-lime-950'],
  ['ui-yellow-50', 'ui-yellow-100', 'ui-yellow-200', 'ui-yellow-300', 'ui-yellow-400', 'ui-yellow-500', 'ui-yellow-600', 'ui-yellow-700', 'ui-yellow-800', 'ui-yellow-900', 'ui-yellow-950'],
  ['ui-amber-50', 'ui-amber-100', 'ui-amber-200', 'ui-amber-300', 'ui-amber-400', 'ui-amber-500', 'ui-amber-600', 'ui-amber-700', 'ui-amber-800', 'ui-amber-900', 'ui-amber-950'],
  ['ui-orange-50', 'ui-orange-100', 'ui-orange-200', 'ui-orange-300', 'ui-orange-400', 'ui-orange-500', 'ui-orange-600', 'ui-orange-700', 'ui-orange-800', 'ui-orange-900', 'ui-orange-950'],
  ['ui-red-50', 'ui-red-100', 'ui-red-200', 'ui-red-300', 'ui-red-400', 'ui-red-500', 'ui-red-600', 'ui-red-700', 'ui-red-800', 'ui-red-900', 'ui-red-950'],
  ['ui-gray-50', 'ui-gray-100', 'ui-gray-200', 'ui-gray-300', 'ui-gray-400', 'ui-gray-500', 'ui-gray-600', 'ui-gray-700', 'ui-gray-800', 'ui-gray-900', 'ui-gray-950'],
  ['ui-slate-50', 'ui-slate-100', 'ui-slate-200', 'ui-slate-300', 'ui-slate-400', 'ui-slate-500', 'ui-slate-600', 'ui-slate-700', 'ui-slate-800', 'ui-slate-900', 'ui-slate-950'],
  ['ui-zinc-50', 'ui-zinc-100', 'ui-zinc-200', 'ui-zinc-300', 'ui-zinc-400', 'ui-zinc-500', 'ui-zinc-600', 'ui-zinc-700', 'ui-zinc-800', 'ui-zinc-900', 'ui-zinc-950'],
  ['ui-neutral-50', 'ui-neutral-100', 'ui-neutral-200', 'ui-neutral-300', 'ui-neutral-400', 'ui-neutral-500', 'ui-neutral-600', 'ui-neutral-700', 'ui-neutral-800', 'ui-neutral-900', 'ui-neutral-950'],
  ['ui-stone-50', 'ui-stone-100', 'ui-stone-200', 'ui-stone-300', 'ui-stone-400', 'ui-stone-500', 'ui-stone-600', 'ui-stone-700', 'ui-stone-800', 'ui-stone-900', 'ui-stone-950'],
]

function setColor(value = '') {
  emit('update:color', value)
}

function onOptionClick(theme: ThemeConfig) {
  if (theme.name === 'customize')
    return

  if (currentTheme.value === theme.name)
    return

  setTheme(theme)
  currentTheme.value = theme.name as any

  const hex = (rgb = '') => rgb ? `#${rgb.split(' ').map((v) => Number(v).toString(16).padStart(2, '0')).join('')}` : ''

  themeCustomize.value = {
    ...theme,
    name: 'customize',
    cb: hex(theme.cb),
    c1: hex(theme.c1),
    c2: hex(theme.c2),
    c3: hex(theme.c3),
  }

  emit('update:config', themeCustomize.value)
}

function setCustomTheme() {
  const { cb, c1, c2, c3 } = themeCustomize.value

  setTheme({
    ...themeCustomize.value,
    cb: cb && cssVar(cb),
    c1: c1 && cssVar(c1),
    c2: c2 && cssVar(c2),
    c3: c3 && cssVar(c3),
  })

  currentTheme.value = 'customize'
  emit('update:config', themeCustomize.value)
}
</script>

<template>
  <Tabs
    variant="solid"
    :items="[
      { label: 'Samples', slot: 'samples' },
      { label: 'Customize', slot: 'customize' },
    ]"
    :unmount-on-hide="false"
    :ui="{ content: 'py-4' }"
  >
    <template #samples>
      <div class="flex flex-col gap-8 font-sans">
        <div class="w-full grid sm:grid-cols-3 items-start gap-4">
          <div
            v-for="theme in themeItems"
            :key="theme.name"
            class="self-end border-ui-cb/20 overflow-hidden rounded border outline outline-2 outline-offset-2 outline-transparent select-none bg-ui-c1 transition"
            :class="{
              'hover:border-ui-cb/40 ring-3 ring-ui-cb/80 ring-offset-3 ring-offset-ui-c1': theme.name === currentTheme,
              'cursor-pointer': theme.name !== currentTheme && theme.name !== 'customize',
            }"
            :style="Object.fromEntries(resolveThemeAttrs(theme))"
            @click="onOptionClick(theme)"
          >
            <div class="bg-ui-c1 text-ui-cb w-full" :class="{ 'pointer-events-none': theme.name !== currentTheme }">
              <div class="min-w-40 grid grid-cols-4 grid-rows-3">
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
        <div class="mx-auto flex flex-col gap-2">
          <div v-for="(colorOptions, y) in colorGroups" :key="y" class="w-full flex flex-wrap items-start gap-2">
            <div v-for="colorName in colorOptions" :key="colorName" class="flex aspect-square items-center justify-center rounded">
              <Link
                class="size-12 bg-ui-fill color-white font-bold border-ui-cb/20 hover:border-ui-cb/40 overflow-hidden rounded border outline outline-2 outline-offset-2 outline-transparent select-none transition"
                :class="[colorName, { 'ring-3 ring-ui-cb/80 ring-offset-3 ring-offset-ui-c1': colorName === props.color }]"
                size="xl"
                label="A"
                :title="colorName"
                raw
                @click="setColor(colorName)"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #customize>
      <div class="grid grid-cols-[auto_1fr] items-center gap-2 gap-x-4 rounded-ui-box">
        <label class="opacity-80">colorScheme</label>
        <Select v-model="themeCustomize.colorScheme" :options="['dark', 'light']" @update:model-value="setCustomTheme" />
        <label class="opacity-80">fontFamily</label>
        <Input v-model="themeCustomize.fontFamily" placeholder="inherit" @update:model-value="setCustomTheme" />
        <label class="opacity-80">radius</label>
        <Input v-model="themeCustomize.radius" :placeholder="themeCustomize.radius" @update:model-value="setCustomTheme" />
        <label class="opacity-80">radiusBox</label>
        <Input v-model="themeCustomize.radiusBox" :placeholder="themeCustomize.radius" @update:model-value="setCustomTheme" />
        <label class="opacity-80">radiusButton</label>
        <Input v-model="themeCustomize.radiusButton" :placeholder="themeCustomize.radius" @update:model-value="setCustomTheme" />
        <label class="opacity-80">radiusCheckbox</label>
        <Input v-model="themeCustomize.radiusCheckbox" :placeholder="themeCustomize.radius" @update:model-value="setCustomTheme" />
        <label class="opacity-80">radiusRadio</label>
        <Input v-model="themeCustomize.radiusRadio" :placeholder="themeCustomize.radius" @update:model-value="setCustomTheme" />
        <label class="opacity-80">radiusSwitch</label>
        <Input v-model="themeCustomize.radiusSwitch" :placeholder="themeCustomize.radius" @update:model-value="setCustomTheme" />
        <label class="opacity-80">radiusTabs</label>
        <Input v-model="themeCustomize.radiusTabs" :placeholder="themeCustomize.radius" @update:model-value="setCustomTheme" />
        <label class="opacity-80">cb</label>
        <Input v-model="themeCustomize.cb" type="color" @update:model-value="setCustomTheme" />
        <label class="opacity-80">c1</label>
        <Input v-model="themeCustomize.c1" type="color" @update:model-value="setCustomTheme" />
        <label class="opacity-80">c2</label>
        <Input v-model="themeCustomize.c2" type="color" @update:model-value="setCustomTheme" />
        <label class="opacity-80">c3</label>
        <Input v-model="themeCustomize.c3" type="color" @update:model-value="setCustomTheme" />
      </div>
    </template>
  </Tabs>
</template>
