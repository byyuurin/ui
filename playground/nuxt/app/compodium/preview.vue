<script setup lang="ts">
import type { AppProps } from '@byyuurin/ui'
import * as locales from '@byyuurin/ui/locale'

const lang = shallowRef<keyof typeof locales>('en')
const locale = computed(() => lang.value ? (locales as any)[lang.value] : undefined)

const toasterAttrs = ref<Pick<Required<AppProps['toaster'] & object>, 'duration' | 'position' | 'expand'>>({
  duration: 10000,
  position: 'bottom-right',
  expand: true,
})
</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <UApp :locale="locale" :toaster="toasterAttrs">
      <div class="p-2 pt-12 size-screen flex flex-col justify-center gap-2">
        <div class="m-auto">
          <div class="self-center">
            <slot></slot>
          </div>
        </div>
        <USelect v-model="lang" class="mx-auto w-40" size="xs" :options="Object.entries(locales).map(([value, { code, name }]) => ({ label: name, value }))" />
      </div>
    </UApp>
  </div>
</template>

<style>
:root {
  font-family: Chalkboard, "comic sans ms", "sans-serif";
  --ui-radius: 0.2rem;
  --ui-cb: 22 22 22;
  --ui-cp: 66 185 131;
  --ui-cx: 255 255 255;
  color-scheme: light;
}

html.dark {
  --ui-cb: 255 255 255;
  --ui-cp: 66 185 131;
  --ui-cx: 22 22 22;
  color-scheme: dark;
}
</style>
