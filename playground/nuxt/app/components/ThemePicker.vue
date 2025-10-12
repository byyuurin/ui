<script lang="ts" setup>
import { omit } from '@byyuurin/ui-kit'
import { colors } from '@unocss/preset-wind4/colors'
import { useLocalStorage } from '@vueuse/core'
import { computed, onMounted, watch } from 'vue'
import { useAppConfig, useColorMode } from '#imports'

type Color = keyof typeof colors

const appConfig = useAppConfig()
const colorMode = useColorMode()

const neutralColors: Color[] = ['slate', 'gray', 'zinc', 'neutral', 'stone']
const neutralLocal = useLocalStorage('--ui-neutral', 'stone')
const neutral = computed({
  get() {
    return appConfig.ui.colors.neutral
  },
  set(value) {
    appConfig.ui.colors.neutral = value
    neutralLocal.value = appConfig.ui.colors.neutral
  },
})

const colorsToOmit = ['inherit', 'current', 'transparent', 'black', 'white', 'dark', 'light', ...neutralColors]
const primaryColors = [...Object.keys(omit(colors, colorsToOmit as any))]
const primaryLocal = useLocalStorage('--ui-primary', 'light')
const primary = computed({
  get() {
    return appConfig.ui.colors.primary
  },
  set(value) {
    appConfig.ui.colors.primary = value
    primaryLocal.value = appConfig.ui.colors.primary
  },
})
const primaryAuto = computed(() => colorMode.value === 'light' ? 'dark' : 'light')

const radiusValues = [0, 0.125, 0.25, 0.375, 0.5]
const radiusLocal = useLocalStorage('--ui-radius', 0.25)
const radius = computed({
  get(): number {
    return radiusLocal.value
  },
  set(value) {
    radiusLocal.value = value
  },
})

onMounted(() => {
  const root = document.querySelector('html')!

  root.classList.toggle('text-default', true)
  root.classList.toggle('bg-default', true)
  root.classList.toggle('transition', true)

  appConfig.ui.colors.neutral = neutralLocal.value
  appConfig.ui.colors.primary = primaryLocal.value

  watch(() => colorMode.value, (value) => {
    if (['light', 'dark'].includes(primary.value) && primary.value === value)
      primary.value = value === 'dark' ? 'light' : 'dark'
  }, { immediate: true })

  watch(radiusLocal, () => {
    root.style.setProperty('--ui-radius', `${radiusLocal.value}rem`)
  }, { immediate: true })
})

const modes = [
  { label: 'light', icon: 'i-lucide-sun' },
  { label: 'dark', icon: 'i-lucide-moon' },
  { label: 'system', icon: 'i-lucide-monitor' },
]
const mode = computed({
  get() {
    return colorMode.value
  },
  set(option) {
    colorMode.preference = option
  },
})
</script>

<template>
  <UPopover :ui="{ content: 'w-72 px-6 py-4 flex flex-col gap-4' }">
    <template #default="{ open }">
      <UButton
        icon="i-lucide-swatch-book"
        color="neutral"
        :variant="open ? 'soft' : 'ghost'"
        square
        aria-label="Theme picker"
        :ui="{ leadingIcon: 'text-primary' }"
      />
    </template>

    <template #content>
      <fieldset>
        <legend class="text-3 leading-none font-semibold mb-2">
          Primary
        </legend>

        <div class="grid grid-cols-3 gap-1 -mx-2">
          <ThemePickerButton
            :label="primaryAuto"
            :chip="primaryAuto"
            :selected="primary === primaryAuto"
            @click="primary = primaryAuto"
          />

          <ThemePickerButton
            v-for="color in primaryColors"
            :key="color"
            :label="color"
            :chip="color"
            :selected="primary === color"
            @click="primary = color"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend class="text-3 leading-none font-semibold mb-2">
          Neutral
        </legend>

        <div class="grid grid-cols-3 gap-1 -mx-2">
          <ThemePickerButton
            v-for="color in neutralColors"
            :key="color"
            :label="color"
            :chip="color"
            :selected="neutral === color"
            @click="neutral = color"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend class="text-3 leading-none font-semibold mb-2">
          Radius
        </legend>

        <div class="grid grid-cols-3 gap-1 -mx-2">
          <ThemePickerButton
            v-for="r in radiusValues"
            :key="r"
            :label="String(r)"
            class="justify-center px-0"
            :selected="radius === r"
            @click="radius = r"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend class="text-3 leading-none font-semibold mb-2">
          Theme
        </legend>

        <div class="grid grid-cols-3 gap-1 -mx-2">
          <ThemePickerButton
            v-for="m in modes"
            :key="m.label"
            v-bind="m"
            :selected="colorMode.preference === m.label"
            @click="mode = m.label"
          />
        </div>
      </fieldset>
    </template>
  </UPopover>
</template>
