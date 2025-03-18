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
  <div class="w-screen h-screen flex justify-center items-center p-5">
    <UApp :locale="locale" :toaster="toasterAttrs">
      <div>
        <slot></slot>
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
