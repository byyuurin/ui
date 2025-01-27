<script lang="ts" setup>
import type { AppProps } from '@byyuurin/ui'
import ThemeSelector, { setTheme, themeOptions } from '../../_components/ThemeSelector.vue'

const uiColor = ref('')
const uiTheme = ref<typeof themeOptions[number]['name']>('wireframe')

const toasterAttrs = ref<Pick<Required<AppProps['toaster'] & object>, 'duration' | 'position' | 'expand'>>({
  duration: 10000,
  position: 'bottom-right',
  expand: true,
})

onMounted(() => {
  const theme = themeOptions.find((i) => i.name === uiTheme.value)

  if (theme)
    setTheme(theme)
})
</script>

<template>
  <UApp :toaster="toasterAttrs" :ui="{ toast: { slots: { icon: 'animate-head-shake animate-count-infinite' } } }">
    <div class="h-screen overflow-auto">
      <ExampleButton :class="uiColor" />
      <ExampleLink :class="uiColor" />
      <ExampleInput :class="uiColor" />
      <ExampleAccordion :class="uiColor" />
      <ExampleTabs :class="uiColor" />
      <ExampleCard :class="uiColor" />
      <ExampleModal :class="uiColor" />
      <ExampleDrawer :class="uiColor" />
      <ExampleToast
        v-model:duration="toasterAttrs.duration"
        v-model:position="toasterAttrs.position"
        v-model:expand="toasterAttrs.expand"
        :class="uiColor"
        :color="uiColor"
      />
      <ExamplePopover :class="uiColor" />
      <ExampleTooltip :class="uiColor" />
      <ExampleNative :class="uiColor" />

      <UDrawer title="Change Theme or Color" direction="right" blur>
        <div class="sticky bottom-0 p-2 text-center">
          <UButton label="Theme" variant="outline" size="xl" icon="i-carbon-color-palette" round />
        </div>
        <template #body>
          <ThemeSelector v-model="uiTheme" v-model:color="uiColor" class="max-w-screen-sm" />
        </template>
      </UDrawer>
    </div>
  </UApp>
</template>

<style>
html,
body,
#app {
  height: 100%;
  min-height: 100%;
  overflow: hidden;
}
</style>
